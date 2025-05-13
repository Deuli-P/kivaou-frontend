import React from 'react';
import { UserProps } from '../../../utils/types';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

interface UserDetailCardProps {
    item: UserProps;
    setUsers: (users: UserProps[]) => void;
    }
const UserDetailCard = ({item, setUsers}: UserDetailCardProps) => {

    const { user } = useAuth();

    const handleRemoveUser = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/organization/remove-user/${item.id}?id=${user?.organization?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            })
            if(response.status === 200){
                setUsers((prevUsers: UserProps[]) => prevUsers.filter((user) => user.id !== item.id))
            }else{
                const data = await response.json()
                toast.error(data.message)
            }
        }
        catch (error) {
            console.error('Error removing user:', error);
            toast.error("Erreur lors de la suppression de l'utilisateur")
        }
    };

  return (
    <article key={item.id} className="orga-detail-user-card">
        {user?.organization?.role === 'OWNER' && (
             <div className="circle-remove-user" onClick={handleRemoveUser}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>
            )}
        <div className="orga-detail-user-card-photo-container">
            {item.photo_path ?
                (
                <img src={item.photo_path} alt="photo de profil" loading="lazy"/>
                )
            :
                (
                <img src="https://www.randomkittengenerator.com/cats/1957.jpg" alt="photo de profil" loading="lazy"/>
                )
            }
            </div>
            <div className="orga-detail-user-card-infos">
            <p>
                {item.firstname} {item.lastname}
            </p>
        </div>
    </article>
  )
}

export default UserDetailCard