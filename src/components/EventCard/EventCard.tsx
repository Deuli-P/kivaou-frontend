import { useState, useEffect } from 'react';
import { EventProps } from '../../utils/types';

interface EventCardProps {
event: EventProps
}


const EventCard: React.FC<EventCardProps> = ({event}) => {
    const { title, description, website, start_date, end_date, address } = event;

    const [ submitted, setSubmitted ] = useState(false);

    const handleSubmit = async() => {
        setSubmitted(true);
    };

    const handleCancel = async() => {
        setSubmitted(false);
    };

    const handleSeeMore = () => {
    };

    return (
      <div className=''>
        <h2 className=''>{title}</h2>
  
        {description && description.trim().length > 0 && (
          <p className=''>{description}</p>
        )}
  
        <p className=''><strong>Lieu :</strong> {placeName}</p>
        <p className=''><strong>Adresse :</strong> {address}</p>
        <p className=''><strong>Téléphone :</strong> {phone}</p>
        <p className=''>
          <strong>Site web :</strong>{' '}
          <a href={website} target="_blank" rel="noopener noreferrer" style={styles.link}>
            {website}
          </a>
        </p>
  
        <div className=''>
            { submitted ? (
                <button className='' onClick={handleCancel}>Annuler</button>
            ) : 
            (
                <button className='' onClick={handleSubmit}>Valider</button>
            )}
          <button className='' onClick={handleSeeMore}>Voir plus</button>
        </div>
      </div>
    );
};

export default EventCard;