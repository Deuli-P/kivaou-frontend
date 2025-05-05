import { useState, useEffect } from 'react';
import { EventProps } from '../../utils/types';

interface EventCardProps {
event: EventProps
}


const EventCard: React.FC<EventCardProps> = ({event}) => {

    const [ submitted, setSubmitted ] = useState(false);

    const addressComplete = event.destination.address ? `${event.destination.address.number} ${event.destination.address.street}, ${event.destination.address.postale_code} ${event.destination.address.city}, ${event.destination.address.country}` : '';

    const handleSubmit = async() => {
        setSubmitted(true);
    };

    const handleCancel = async() => {
        setSubmitted(false);
    };

    const handleSeeMore = () => {
    };

    return (
        <article className=''>
            <div className=''>
                <h2 className=''>{event.title}</h2>
                {/* Note  */}
                <p className=''><strong>Lieu :</strong> {event?.destination.name}</p>
                <p className=''><strong>Adresse :</strong> {addressComplete}</p>
                <p className=''><strong>Téléphone :</strong> {event?.destination.phone}</p>
                <p className=''>
                <strong>Site web :</strong>{' '}
                <a href={event?.destination.website} target="_blank" rel="noopener noreferrer">
                    Site Web
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
        </article>
    );
};

export default EventCard;