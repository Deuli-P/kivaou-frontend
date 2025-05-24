import { useState } from 'react';
import { EventProps } from '../../../utils/types';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../../utils/utils';
import UserGroup from '../../User/UserGroup/UserGroup';
import './EventCard.scss';
import Button from '../../Button/Button';
const API_URL = import.meta.env.VITE_BACKEND_URL;
/*
 * Remarque :
 * L'accès à import.meta.env est la méthode recommandée avec Vite pour injecter des variables d'environnement au build.
 * Pour Docker, il faut s'assurer que les variables (ex: VITE_BACKEND_URL) sont bien définies lors du build de l'image.
 * Si tu veux des variables dynamiques au runtime (après build), il faut une autre approche (ex: fetch d'un fichier config.json généré au démarrage du conteneur).
 */

interface EventCardProps {
  event: EventProps;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [ eventData, setEventData ] = useState<EventProps>(event);

    const address = event.destination.address;
    const addressComplete = address
        ? `${address.number} ${address.street}, ${address.postale_code} ${address.city}, ${address.country}`
        : '';

    const navigate = useNavigate();

    const deleteUserFromUsers = (userId: string) => {
        const updatedUsers = eventData.users?.filter((user) => user.id !== userId);
        setEventData((prevEvent) => ({
            ...prevEvent,
            users: updatedUsers,
            submitted: false
        }));
    };

    const addUserToUsers = (userId: string) => {
        const userData = {
            id: userId,
            photo_path: user?.photo_path || '',
            firstname: user?.firstname || '',
            lastname: user?.lastname || ''
        };
        const updatedUsers = eventData.users ? [...eventData.users, userData] : [userData];

        setEventData((prevEvent) => ({
            ...prevEvent,
            users: updatedUsers,
            submitted: true
        }))
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
        const response = await fetch(`${API_URL}/api/v1/event/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ eventId: event.id })
        });

            if (response.status === 200) {
                addUserToUsers(user ? user.id : '');
                toast.success("Participation validée");
            } else {
                const data = await response.json();
                toast.error(data.message? data.message : "Erreur lors de la l'enregistrement à l'événement");
            }
        } catch (error) {
        console.error('Erreur submit :', error);
        } finally {
        setLoading(false);
        }
    };

    const handleCancel = async () => {
        setLoading(true);
        try {
        const response = await fetch(`${API_URL}/api/v1/event/cancel`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ eventId: event.id })
        });

        if (response.status === 200) {
            deleteUserFromUsers(user ? user?.id : '');
        } else {
            const data = await response.json();
            toast.error(data.message ? data.message : "Erreur lors de l'annulation");
        }
        } catch (error) {
        console.error('Erreur cancel :', error);
        } finally {
        setLoading(false);
        }
    };

    const handleSeeMore = () => {
        navigate(`/orga/event/${event.id}`)
    };

    // aria-label phrase 
    const ariaLabelSubmit = eventData.submitted
        ? `Vous êtes inscrit à l'événement ${eventData.title}`
        : `Vous n'êtes pas inscrit à l'événement ${eventData.title}`;

    const ariaLabelEventCard = `Événement le ${formatDateTime(eventData.start_date)} à ${eventData.destination.name} ${eventData.destination.address && (`${eventData.destination.address?.street}, ${eventData.destination.address?.postale_code} ${eventData.destination.address?.city}, ${eventData.destination.address?.country}`)}`;

  return (
    <article className="event_card-container card" aria-label={ariaLabelEventCard}>
      <div className="event_card-content-container">
        <div className="">
          <h5 className="event_card-title">{eventData.title}</h5>
          {eventData.description && <p> {eventData.description}</p>}
        </div>

        <div className="event_card-info">
          <p className='event_card_label'>📍 : </p>
          <p className="event_card-content">
          {eventData.destination.name}
          </p>
        </div>
        <div className="event_card-info">
          <p className='event_card_label'>🏢 :</p>
          <p className="event_card-content">
            {addressComplete}
          </p>
        </div>
        <div className="event_card-dates">
          <p>⏳ {formatDateTime(eventData.start_date)}</p>
          {eventData.end_date && (<p>⌛ {formatDateTime(eventData.end_date)}</p>)}
        </div>
        {eventData.destination.phone && (
          <div className="event_card-info">
          <p className='event_card_label'>📞 : </p>
          <p className="event_card-content">
            {eventData.destination.phone}
          </p>
        </div>
        )}
        {eventData.destination.website && (
          <div className="event_card-info">
            <p className='event_card_label'>🌐 : </p>
            <a href={eventData.destination.website} target="_blank" rel="noopener noreferrer" className="event_card-content underline">
              {eventData.destination.website}
            </a>
          </div>
        )}
        <div className="event_card-participants">
          <strong>Participants :</strong>
          {eventData.users && eventData.users.length > 0 ? 
            (
              <UserGroup
                users={eventData.users}
                size="m"
              />
            ) 
            : 
            (
              <div className="">
                  <p>Aucun participant pour le moment</p>
              </div>
          )}
        </div>
      </div>
      <div className="event_card-actions">
        {eventData.submitted ? (
          <Button 
            onClick={handleCancel} 
            disabled={loading || eventData.owner.id === user?.id} 
            ariaLabel={ariaLabelSubmit}
            label='Annuler ma participation'
            version='secondary'
          />
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={loading} 
            ariaLabel={ariaLabelSubmit}
            label="Rejoindre l'événement"
            version='primary'
          />
        )}
        <Button
          onClick={handleSeeMore}
          label='Voir plus'
          version='tertiary'
        />
      </div>
    </article>
  );
};

export default EventCard;