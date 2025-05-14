import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import { UserProps } from '../../../utils/types';

interface RemoveMemberConfirmModalProps {
    setClose: () => void;
    item: UserProps;
    onRemove: (item : UserProps) => void;
    setUserToRemove: (user: UserProps | null) => void;
}

const RemoveMemberConfirmModal = ({setClose, item, onRemove,setUserToRemove}: RemoveMemberConfirmModalProps) => {


    const handleClose = () => {
        setClose();
        setUserToRemove(null);
    };
   

  return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={handleClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h3>Êtes-vous sur de vouloir supprimer {item.firstname} {item.lastname} ?</h3>
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

export default RemoveMemberConfirmModal