// src/components/modal/CreateEventModal.tsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './CreateEventModal.scss';

const CreateEventModal = ({ destination, onClose })=> {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Créer un événement pour', destination.name, '=>', eventName, eventDate);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Créer un événement pour {destination.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom de l'événement :
            <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
          </label>
          <label>
            Date :
            <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
          </label>
          <div className="modal-buttons">
            <button type="submit">Créer</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default CreateEventModal;