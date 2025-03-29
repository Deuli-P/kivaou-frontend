import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';


// Fetch de la page :
// - GET tous les events ou il a submits et submit not cancelled
// - GET tous les events ou il est user_id et event_status not cancelled

// Envoi de la requête de modification de profil

const Profile = () => {

    const { user , getLogout } = useAuth();
    const navigate = useNavigate();

    const [openEditModal, setOpenEditModal] = useState(false);

    const [ profileEditData, setProfileEditData ] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        photo_path: user?.photo_path,
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

    const handleSubmitEditProfile =(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        try{

            console.log('submit')
        }
        catch(e){
            console.log(e)
            toast.error("Erreur lors de la modification du profil")
        }
        finally{
            toast.success('Profil modifié avec succès')
            handleOpeningEditModal()
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

export default Profile