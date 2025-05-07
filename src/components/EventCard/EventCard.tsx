import { useState } from 'react';
import { EventProps } from '../../utils/types';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './EventCard.scss';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/utils';

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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event/submit?id=${user?.organization?.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ eventId: event.id })
        });

            if (response.status === 204) {
                addUserToUsers(user.id);
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/event/cancel?id=${user?.organization?.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ eventId: event.id })
        });

        if (response.status === 204) {
            deleteUserFromUsers(user.id);
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

  return (
    <article className="event_card-container">
      <h2 className="event_card-title">{eventData.title}</h2>
      <p>{formatDateTime(eventData.start_date)} - { eventData.end_date && (formatDateTime(eventData.end_date))}</p>
      {eventData.description && <p className="event_card-description"><strong>Description :</strong> {eventData.description}</p>}
      <p className="event_card-info"><strong>Lieu :</strong> {eventData.destination.name}</p>
      <p className="event_card-info"><strong>Adresse :</strong> {addressComplete}</p>
      {eventData.destination.phone && (
        <p className="event_card-info"><strong>Téléphone :</strong> {eventData.destination.phone}</p>
      )}
      {eventData.destination.website && (
        <p className="event_card-info">
          <strong>Site web :</strong>{' '}
          <a href={eventData.destination.website} target="_blank" rel="noopener noreferrer" className="event_card-link">
            {eventData.destination.website}
          </a>
        </p>
      )}

      <div className="event_card-participants">
        <strong>Participants :</strong>
        <ul className="event_card-user_list">
            { eventData.users && eventData.users.length > 0 ? (
          eventData.users.map((user) => (
            <li key={user.id} className="event_card-user_item">
              <img src={user.photo_path} alt={user.id} className="event_card-user_avatar" />
            </li>
          ))
        ) : (
            <div className="">
                <p>Aucun participant pour le moment</p>
            </div>
        )}
        </ul>
      </div>

      <div className="event_card-actions">
        {eventData.submitted ? (
          <button className="btn cancel" onClick={handleCancel} disabled={loading || eventData.owner.id === user.id}>Annuler</button>
        ) : (
          <button className="btn submit" onClick={handleSubmit} disabled={loading}>Valider</button>
        )}
        <button className="btn" onClick={handleSeeMore}>Voir plus</button>
      </div>
    </article>
  );
};

export default EventCard;