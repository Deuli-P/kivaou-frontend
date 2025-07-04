import { UserProps } from '../../../utils/types';
import { useAuth } from '../../../context/AuthContext';
import './userDetailCard.scss';
import { initials } from '../../../utils/utils';
interface UserDetailCardProps {
    item: UserProps;
    setOpen: () => void;
    setUserToRemove: (user: UserProps) => void;
}

const UserDetailCard = ({item, setOpen, setUserToRemove}: UserDetailCardProps) => {

    const { user } = useAuth();

    const handleStartRemoveMember = async () => {
        setUserToRemove(item);
        setOpen();
    };


    
  return (
    <article key={item.id} className="user-card-container">
        {((user?.organization?.role === 'OWNER' || user?.user_type === 'admin') && user.id !== item.id)  && (
            <div className="user-card-remove-container" onClick={handleStartRemoveMember}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 32 32" enable-background="new 0 0 32 32" xmlSpace="preserve">
                    <path fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" d="M23,27H11c-1.1,0-2-0.9-2-2V8h16v17
                        C25,26.1,24.1,27,23,27z"/>
                    <line fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" x1="27" y1="8" x2="7" y2="8"/>
                    <path fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" d="M14,8V6c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1v2"/>
                    <line fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" x1="17" y1="23" x2="17" y2="12"/>
                    <line fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" x1="21" y1="23" x2="21" y2="12"/>
                    <line fill="none" stroke="#FFF" stroke-width="1" stroke-miterlimit="10" x1="13" y1="23" x2="13" y2="12"/>
                </svg>
            </div>
        )}
            <div className="user-card-photo-container">
                {item.photo_path ?
                    (
                        <img src={item.photo_path} alt="photo de profil" loading="lazy"/>
                    )
                :
                    (
                        <span className="user-circle-initials">{initials(item)}</span>
                    )
                }
            </div>
            <div className="user-card-infos">
            <p>
                {item.firstname} {item.lastname}
            </p>
        </div>
    </article>
  )
}

export default UserDetailCard