import React from 'react'
import Button from '../../Button/Button';
import Input from '../../Inputs/Input/Input';

interface EditProfileInfoModalProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    data: {
        id: string;
        firstname: string;
        lastname: string;
        photo_path: string;
    };
    handleChangeOpening: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditProfileInfoModal = ({handleSubmit, data, handleChangeOpening, onChange}: EditProfileInfoModalProps) => {

  return (
    <div className='modal-overlay' onClick={handleChangeOpening}>
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h3>Modifier les informations</h3>
            <form
                className='modal-form'
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
            >
                <Input
                    name='firstname'
                    onChange={onChange}
                    value={data.firstname}
                    required={true}
                    label='Prénom'
                    type='text'
                    placeholder='John'
                />
                <Input
                    name='lastname'
                    onChange={onChange}
                    value={data.lastname}
                    required={true}
                    label='Nom'
                    type='text'
                    placeholder='Doe'
                />
                <Input
                    name='photo_path'
                    onChange={onChange}
                    value={data.photo_path}
                    required={true}
                    label='Lien de la photo de profile'
                    type='text'
                    placeholder='https://...'
                />
               
                <div className="btn-container">
                <Button
                    type='button'
                    label='Annuler'
                    version='secondary'
                    ariaLabel='Fermer la modale'
                    onClick={handleChangeOpening}
                />
                <Button
                    type='submit'
                    label='Modifier'
                    version='primary'
                    ariaLabel='Modifier les informations'
                />
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProfileInfoModal