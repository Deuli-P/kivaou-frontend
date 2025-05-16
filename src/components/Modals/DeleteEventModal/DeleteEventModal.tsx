import ReactDOM from 'react-dom';
import Button from '../../Button/Button';

interface DeleteEventModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const DeleteEventModal = ({onClose, onDelete}: DeleteEventModalProps) => {


    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h3>Êtes-vous sur de vouloir supprimer l'événement ?</h3>
                <div className="btn-container">
                    <Button
                        type='button'
                        label='Annuler'
                        version='primary'
                        ariaLabel='Fermer la modale'
                        onClick={onClose}
                    />
                    <Button
                        type='button'
                        label='Confirmer'
                        version='tertiary'
                        ariaLabel='Confirmer la suppression du membre'
                        onClick={()=>onDelete()}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}

export default DeleteEventModal