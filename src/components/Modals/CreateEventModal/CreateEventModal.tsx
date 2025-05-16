// src/components/modal/CreateEventModal.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PlaceProps } from '../../../utils/types';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
const env = import.meta.env.VITE_ENV_MODE;
const API_URL = import.meta.env.VITE_BACKEND_URL;
import './CreateEventModal.scss';
import Button from '../../Button/Button';
import TextArea from '../../Inputs/TextArea/TextArea';
import Input from '../../Inputs/Input/Input';

interface CreateEventModalProps {
  destination: PlaceProps;
  onClose: () => void;
  setEvent: (event: any) => void;
}


const CreateEventModal = ({ destination, onClose, setEvent }: CreateEventModalProps)=> {

  const { user } = useAuth();
  
  const fakeEvent = {
    title: 'Événement de test',
    description: 'Ceci est une description de test.',
    start_date: '2025-07-01T10:00',
    end_date: '2025-07-02T12:00',
    place: destination.id
  };
  
  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  
  const emptyEvent = {
    title: '',
    description: '',
    start_date: localNow,
    end_date: localNow,
    place: destination.id
  };

  const [eventData, setEventData] = useState(env === 'DEV' ? fakeEvent : emptyEvent);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      try{
        e.preventDefault();
      
        if (new Date(eventData.end_date) < new Date(eventData.start_date)) {
          toast.warning("La date de fin ne peut pas être antérieure à la date de début.");
          return;
        };
      
        if (!user?.organization) {
          toast.error("Vous devez appartenir à une organisation pour créer un événement");
          return;
        };
        if(eventData.place === 'null'){
          toast.error("Vous devez choisir un lieu");
          return;
        }
      
        const response = await fetch(`${API_URL}/api/v1/event/create?id=${user.organization.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(eventData)
        })
          if (response.status === 200) {
            const data = await response.json();
            toast.success(data.message);
            setEvent((prev)=> ({
              ...prev,
              future:[...prev,eventData]
          }));
            onClose();
        } else {
            const data = await response.json();
            toast.error(data.message);
        }
      } catch (error) {
        console.error('Error creating event:', error);
        toast.error("Erreur lors de la création de l'événement");
      }
    };
  

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Créer un événement pour {destination.name}</h2>
        <form onSubmit={handleSubmit} className='modal-form'>
          <Input 
            name='title'
            value={eventData.title}
            onChange={(e) => handleChange(e)}
            required={true}
            label="Nom de l'événement"
            placeholder="Nom de l'événement"
            ariaLabel="Nom de l'événement"
          />
          <Input
            name='start_date'
            label='Date de début'
            type='datetime-local'
            min={new Date().toISOString().slice(0,16)}
            value={eventData.start_date}
            onChange={(e) => handleChange(e)}
            required={true}
            ariaLabel='Date de début'
          />
          <Input
            name='start_date'
            label='Date de fin'
            type='datetime-local'
            min={eventData.start_date}
            value={eventData.end_date}
            onChange={(e) => handleChange(e)}
            required
            ariaLabel='Date de fin'
          />
          
            <TextArea
              name='description'
              label='Description'
              value={eventData.description}
              onChange={(e) => handleChange(e)}
              placeholder="Description de l'événement"
              ariaLabel="Description de l'événement si besoin"
            />
          <div className="btn-container">
            <Button
              onClick={onClose}
              type='button'
              label='Annuler'
              version='secondary'
              ariaLabel='Fermer la modale'
            />
            <Button
              type="submit" 
              label="Créer l'événement"
              version='primary'
              ariaLabel="Créer l'événement"
            />
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateEventModal;