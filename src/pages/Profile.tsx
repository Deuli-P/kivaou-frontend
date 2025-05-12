import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { UserProps } from '../utils/types';
import EventCard from '../components/EventCard/EventCard';
const API_URL = import.meta.env.VITE_BACKEND_URL;


const Profile = () => {

    const { user , getLogout, setUser } = useAuth();
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);

    const [ profileEditData, setProfileEditData ] = useState({
        id: user?.id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        photo_path: user?.photo_path
       })

    const [ events, setEvents ] = useState([])


    const handleChangeProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileEditData(prev => ({
            ...prev,
            [name]: value
        }))
        
    }
    
    const handleOpeningEditModal = () => {
        setOpenEditModal(prev => !prev)
    };

    const handleSubmitEditProfile =async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        try{
            const response = await fetch(`${API_URL}/api/user/edit`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(profileEditData)
            })
            if(!response.ok){
                toast.error("Erreur lors de la modification du profil")
                return
            }
            const data = await response.json()
            if(data.user){
                setUser((prev: UserProps) => ({
                    ...prev,
                    firstname: data.user.firstname,
                    lastname: data.user.lastname,
                    photo_path: data.user.photo_path
                }))
                toast.success('Profil modifié avec succès')
                handleOpeningEditModal()
            }

        }
        catch(e){
            toast.error("Erreur lors de la modification du profil")
        }
    }

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/api/user`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if(response.status === 200) {
                const data = await response.json();
                setUser(data.user_info);
                setEvents(data.events_submit);
            }
            else{
                const data = await response.json();
                toast.error(data.message)
            }
        }
        catch (error) {
            console.error('Error fetching profile:', error);
        }
    }
    useEffect(() => {
        fetchProfile();
    }, [])
                

  return (
    <main>
        <h1>Mon profile</h1>
        <div className='profile-container'>
            <img 
                className='profile-photo'
                src={user?.photo_path ? user.photo_path : "https://www.randomkittengenerator.com/cats/1957.jpg"} alt={user?.photo_path ? "Photo de profile" : "Photo de chaton"} 
                loading="lazy"
            />
            <div
                className='profile-infos'
            >
                <span className='profile-name'> 
                    {user?.firstname} {user?.lastname}
                </span>
                <div 
                    className='underline_label'
                >  
                    <p
                        className='underline'
                    >
                        Votre email : 
                    </p>
                    <span>
                        {user?.email}
                    </span>
                </div>
                { user?.organization?.id ? 
                    <div 
                        className='underline_label'
                    >  
                        <p
                            className='underline'
                        >
                            Votre organisation : 
                        </p>
                        <span
                            onClick={()=> navigate(`/orga/${user?.organization?.id}`)}
                        >
                            {user?.organization?.name}
                        </span>
                    </div>
                :
                <div onClick={()=> navigate(`/orga/create`)}>Créer une organisation ou demandez à l'administrateur d'une organisation de vous ajouter</div>
                }
            </div>
            <button
                className='btn primary'
                onClick={handleOpeningEditModal}
            >
                Modifier les informations
            </button>
        </div>
        { events.length > 0 ? (
            <div className="profile-events">
                <div className='events-list-container'>
                    <h3>Derniers événements inscris</h3>
                    <div className='events-list'>
                        {/* Liste des événements */}
                        {events.filter(evt=> evt.owner.id !== user.id).map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        ))}                    
                    </div>
                </div>
                <div className='events-list-container'>
                    <h3>Derniers événements créés</h3>
                    <div className='events-list'>
                        {/* Liste des événements */}
                        {events.filter(evt=> evt.owner.id === user.id).map((event) => (
                            <EventCard
                                key={event.id}
                                event={event}
                            />
                        ))}          
                    </div>
                </div>
            </div>
        ) : (
            <p >
                Pas d'événements à venir où vous êtes inscrit ou que vous avez créés
            </p>
                
        )}
        <div>
            <button onClick={getLogout} className='btn primary'>Se déconnecter</button>
        </div>
        {openEditModal && createPortal(
            <div className='modal-overlay'>
                <div className='modal-container'>
                    <h3>Modifier les informations</h3>
                    <form
                        className='auth-form'
                        onSubmit={(e) => {
                            handleSubmitEditProfile(e)
                        }}
                    >
                        <label 
                            className="input-label"
                            htmlFor="firstname"
                        >
                            Prenom
                            <input 
                                type="text" 
                                placeholder="John" 
                                name='firstname'
                                id="firstname"
                                required
                                className='input-input'
                                value={profileEditData.firstname}
                                onChange={(e)=>handleChangeProfile(e)}
                            />
                        </label>
                        <label 
                            className="input-label"
                            htmlFor="lastname"
                        >
                            Nom
                            <input 
                                type="text" 
                                placeholder="Smith" 
                                id="lastname"
                                name='lastname'
                                required
                                className='input-input'
                                value={profileEditData.lastname}
                                onChange={(e)=>handleChangeProfile(e)}
                            />
                        </label>
                        <label htmlFor="photo_path" className="input-label">
                            Url de la photo de profile 
                            <input 
                                type="text" 
                                id='photo_path'
                                placeholder="http://..." 
                                name='photo_path'
                                className='input-input'
                                value={profileEditData.photo_path}
                                onChange={(e)=>handleChangeProfile(e)}
                            />
                        </label>
                        <div className="modal-edit_button_container">
                        <button
                            onClick={handleOpeningEditModal}
                            className='btn secondary'
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className='btn primary'
                            >
                            Modifier
                        </button>
                        </div>
                    </form>
                </div>
            </div>,
            document.body
        )
            }
    </main>
  )
}

export default Profile