import {useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';
import { UserProps } from '../utils/types';
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch de la page :
// - GET tous les events ou il a submits et submit not cancelled
// - GET tous les events ou il est user_id et event_status not cancelled

// Envoi de la requête de modification de profil

const Profile = () => {

    const { user , getLogout, setUser } = useAuth();
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



    const handleSubmitEditProfile =async(e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        try{
            console.log("start edit profile")
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
        <h1>Créer un événement</h1>
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
                Nom de l'événement
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
    </main>
  )
}

export default Profile