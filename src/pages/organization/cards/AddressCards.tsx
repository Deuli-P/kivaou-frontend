import React, { useState } from 'react';
import './AddressCard.scss';
import { firstLetterUppercase } from '../../../utils/utils';

const AddressCard = ({ destination, onCreateEventClick }) => {
  const {
    name,
    service_type,
    speciality,
    schedule,
    service_link,
    phone,
    google_page_link,
    website,
    photo_path,
    address
  } = destination;

  const [showSchedule, setShowSchedule] = useState(false);

  

  return (
    <li className="address-card">
      <img className="address-card__image" src={photo_path} alt={`Photo de ${name}`} />
      <div className="address-card__content">
        <h3 className="address-card__title">{name}</h3>
        <p className="address-card__type">{firstLetterUppercase(service_type)} – {speciality}</p>
        <p className="address-card__address">
          {address.street_number} {address.street}, {address.postale_code} {address.city}, {address.country}
        </p>
        <p className="address-card__phone">📞 {phone}</p>

        <div className="address-card__links">
          {website && <a href={website} target="_blank" rel="noreferrer">🌐 Site Web</a>}
          {service_link && <a href={service_link} target="_blank" rel="noreferrer">🛒 Réserver</a>}
          {google_page_link && <a href={google_page_link} target="_blank" rel="noreferrer">📍 Maps</a>}
        </div>
        { destination.schedule ? (
          <>
            <button className="address-card__toggle" onClick={() => setShowSchedule(!showSchedule)}>
              {showSchedule ? 'Masquer les horaires' : 'Afficher les horaires'}
            </button>

            {showSchedule && (
              <div className="address-card__schedule">
                <strong>Horaires :</strong>
                <ul>
                  {schedule.map(({ day, morning, afternoon }) => (
                    <li key={day}>{day} : {morning || '—'} / {afternoon || '—'}</li>
                  ))}
                </ul>
              </div>
            )}
            </>
        )
        :

        <p className="address-card__no-schedule">Horaires non disponibles</p>
        
      }
        <button className="address-card__more" onClick={onCreateEventClick}>
          Créer un événement
        </button>
      </div>
    </li>
  );
};

export default AddressCard;