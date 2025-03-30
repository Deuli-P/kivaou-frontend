import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const EventCreate = () => {
  
  const { user , getLogout, setUser } = useAuth();
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);

    const [ eventData, setEventData ] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        photo_path: ''
       })


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
            console.log("start create event")
            const response = await fetch(`${API_URL}/api/event/create`, {
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
                    photo_path: data.user.photo_path,
                }))
                toast.success('Profil modifié avec succès')
                handleOpeningEditModal()
            }

        }
        catch(e){
            console.log(e)
            toast.error("Erreur lors de la modification du profil")
        }
    }

  return (
    <main>
        <h1>Mon profile</h1>
        <div>
            <img src={user?.photo_path ? user.photo_path : "https://www.randomkittengenerator.com/cats/1957.jpg"} alt={user?.photo_path ? "Photo de profile" : "Photo de chaton"} />
            <div>
                <p>{user?.firstname} {user?.lastname}</p>
                <p>{user?.email}</p>
                { user?.organization.id ? 
                <div onClick={()=> navigate(`/orga/${user?.organization.id}`)}>{user?.organization?.name}</div>
                :
                <div onClick={()=> navigate(`/orga/create`)}>Créer une organisation</div>
                }
            </div>
            <button
                onClick={handleOpeningEditModal}
            >
                Modifier les informations
            </button>
        </div>
        <div className="profile-events">
            <div className='profile-events-container'>
                <h3>Derniers événements inscris</h3>
                <div className='profile-events-list'>
                    {/* Liste des événements */}
                    
                </div>
            </div>
            <div className='profile-events-container'>
                <h3>Derniers événements créés</h3>
                <div className='profile-events-list'>
                    {/* Liste des événements */}
                    
                </div>
            </div>
        </div>
        <div>
            <button onClick={getLogout}>Se déconnecter</button>
        </div>
        {openEditModal && createPortal(
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
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        >
                        Modifier
                    </button>
                    </div>
                </form>
            </div>,
            document.body
        )
            }
    </main>
  )
}

export default EventCreate