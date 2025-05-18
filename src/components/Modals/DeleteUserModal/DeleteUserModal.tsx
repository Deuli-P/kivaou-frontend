import ReactDOM from 'react-dom';
import Button from '../../Button/Button';
import { UserProps } from '../../../utils/types';

interface DeleteUserProps {
    setClose: () => void;
    item: UserProps;
    onRemove: (item: UserProps) => void;
    setUserToDelete: (user: UserProps | null) => void;
  }
  
  const DeleteUserModal = ({
    setClose,
    item,
    onRemove,
    setUserToDelete
  }: DeleteUserProps) => {
  
    const handleClose = () => {
      setClose();
      setUserToDelete(null);
    };
  
    return ReactDOM.createPortal(
      <div className='modal-overlay' onClick={handleClose}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
          <h3>Êtes-vous sûr de vouloir supprimer {item.firstname} {item.lastname} de la plateforme ?</h3>
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
              ariaLabel='Confirmer la suppression'
              onClick={() => onRemove(item)}
            />
          </div>
        </div>
      </div>,
      document.body
    );
  };

export default DeleteUserModal