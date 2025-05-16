import ReactDOM from 'react-dom';
import Button from '../../Button/Button';

interface CancelEventModalProps {
    onClose: () => void;
    onCancel: () => void;
}
const CancelEventModal = ({onClose, onCancel}: CancelEventModalProps) => {
  

    return ReactDOM.createPortal(
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal' onClick={(e) => e.stopPropagation()}>
                <h3>Êtes-vous sur de vouloir annuler l'événement ?</h3>
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
                        onClick={()=>onCancel()}
                    />
                </div>
            </div>
        </div>,
        document.body
    );
}

export default CancelEventModal