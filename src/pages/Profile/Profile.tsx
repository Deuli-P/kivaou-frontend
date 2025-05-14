import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { EventProps, UserProps } from '../../utils/types';
import EventCard from '../../components/Cards/EventCard/EventCard';
import EditProfileInfoModal from '../../components/Modals/EditProfileInfoModal.tsx/EditProfileInfoModal';
const API_URL = import.meta.env.VITE_BACKEND_URL;
import './profile.scss';
import Button from '../../components/Button/Button';

const Profile = () => {

    const { user , getLogout, setUser } = useAuth();
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);

    const [ profileEditData, setProfileEditData ] = useState({
        id: user?.id || '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        photo_path: user?.photo_path || ''
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
            const data = await response.json()
            if(data.status === 200){
                setUser((prev: UserProps) => ({
                    ...prev,
                    firstname: data.user.firstname,
                    lastname: data.user.lastname,
                    photo_path: data.user.photo_path
                }))
                toast.success(data.message)
                handleOpeningEditModal()
                return
            }
            else{
                toast.error(data.message)
                return
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
            <div className='profile-infos-container'>
                <div
                    className='profile-infos'
                >
                    <span className='profile-name'> 
                        {user?.firstname} {user?.lastname}
                    </span>
                    <div 
                        className='underline_label'
                    >  
                        <p>
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
                            <p>
                                Votre organisation : 
                            </p>
                            <span
                                onClick={()=> navigate(`/orga/${user?.organization?.id}`)}
                            >
                                {user?.organization?.name}
                            </span>
                        </div>
                    :
                    (
                        <div className='profile-no-orga-container'>
                            <p>
                                Demandez à une organisation de vous ajouter 
                            </p>
                            <p>
                                OU
                            </p>
                            <Button 
                                onClick={()=> navigate(`/orga/create`)}
                                label='Créer une organisation'
                                version='tertiary'
                                ariaLabel='Créer une organisation'
                            />
                        </div>
                    )
                    }
                </div>
                <button
                    className='btn primary'
                    onClick={handleOpeningEditModal}
                >
                    Modifier les informations
                </button>
            </div>
        </div>
        { events.length > 0 ? (
            <div className="profile-events">
                <div className='events-list-container'>
                    <h3>Derniers événements inscris</h3>
                    <div className='events-list'>
                        {/* Liste des événements */}
                        {events.filter((evt:EventProps)=> evt.owner.id !== user?.id).map((event:EventProps) => (
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
                        {events.filter((evt:EventProps)=> evt.owner.id === user?.id).map((event:EventProps) => (
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
                Pas d'événements à venir ou que vous avez créés
            </p>
                
        )}
        <div>
            <button onClick={getLogout} className='btn primary'>Se déconnecter</button>
        </div>
        {openEditModal && createPortal(
            <EditProfileInfoModal
                handleSubmit={handleSubmitEditProfile}
                data={profileEditData}
                handleChangeOpening={handleOpeningEditModal}
                onChange={handleChangeProfile}
            />,
            document.body
        )
            }
    </main>
  )
}

export default Profile