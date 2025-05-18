import { useState } from 'react';
import './AddressCard.scss';
import { firstLetterUppercase } from '../../../utils/utils';
import { PlaceProps } from '../../../utils/types';

interface AddressCardProps {
  destination: PlaceProps;
  onCreateEventClick: () => void;
};

const AddressCard = ({ destination, onCreateEventClick }: AddressCardProps) => {
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
    <article className="address-card">
      <div className="address-card_header">
      <img className="address-card_image" src={photo_path} alt={`Photo de ${name}`} loading="lazy"/>
      <div className="address-card_name-type">
        <h3 className="address-card__title">{name}</h3>
        <p className="address-card_type">{service_type && (firstLetterUppercase(service_type))} – {speciality}</p>
      </div>
      </div>
      <div className="address-card_content">
        <p className="address-card_address">
          {address?.number} {address?.street}, {address?.postale_code} {address?.city}, {address?.country}
        </p>
        <p className="address-card_phone">📞 {phone}</p>

        <div className="address-card_links">
          {website && <a href={website} target="_blank" rel="noreferrer">🌐 Site Web</a>}
          {service_link && <a href={service_link} target="_blank" rel="noreferrer">🛒 Réserver</a>}
          {google_page_link && <a href={google_page_link} target="_blank" rel="noreferrer">🗺️ Maps</a>}
        </div>
        { destination.schedule ? (
          <>
            <button className="btn secondary" onClick={() => setShowSchedule(!showSchedule)}>
              {showSchedule ? 'Masquer les horaires' : 'Afficher les horaires'}
            </button>

            {showSchedule && (
              <div className="address-card_schedule">
                <strong>Horaires :</strong>
                <ul>
                  {schedule?.map(({ day, morning, afternoon }) => (
                    <li key={day}>{day} : {morning || '—'} / {afternoon || '—'}</li>
                  ))}
                </ul>
              </div>
            )}
            </>
        )
        :
        <button className='btn secondary disabled' disabled={true}>
          Horaires non disponibles
        </button>
        
      }
        <button className="btn primary" onClick={onCreateEventClick}>
          Créer un événement
        </button>
      </div>
    </article>
  );
};

export default AddressCard;