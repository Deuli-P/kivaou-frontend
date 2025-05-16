import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import { UserProps } from '../../../utils/types';

interface RemoveMemberFromEventProps {
    onClose: () => void;
    item: UserProps;
    onRemove: (item : UserProps) => void;
    setUserToRemove: (user: UserProps | null) => void;
};


const RemoveUserFromEventModal = ({item, onClose, setUserToRemove, onRemove}: RemoveMemberFromEventProps) => {

    const handleClose = () => {
        onClose();
        setUserToRemove(null);
    };
  
  
    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={handleClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h3>Êtes-vous sur de vouloir exclure de l'événement {item.firstname} {item.lastname} ?</h3>
                <div className="btn-container">
                    <Button
                        type='button'
                        label='Annuler'
                        version='primary'
                        ariaLabel='Fermer la modale'
                        onClick={handleClose}
                    />
                    <Button
                        type='button'
                        label='Confirmer'
                        version='tertiary'
                        ariaLabel='Confirmer la suppression du membre'
                        onClick={()=>onRemove(item)}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}

export default RemoveUserFromEventModal