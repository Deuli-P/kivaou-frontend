import { useState } from 'react';
import { EventProps } from '../../utils/types';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './EventCard.scss';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/utils';
import UserGroup from '../UserGroup';

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
      <div className="event_card-content-container">
        <div className="">
          <h2 className="event_card-title">{eventData.title}</h2>
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
          {eventData.destination.address.number} {eventData.destination.address.street}, {eventData.destination.address.postale_code} {eventData.destination.address.city}, {eventData.destination.address.country}
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
          <button className="btn tertiary" onClick={handleCancel} disabled={loading || eventData.owner.id === user.id}>Annuler</button>
        ) : (
          <button className="btn primary" onClick={handleSubmit} disabled={loading}>Valider</button>
        )}
        <button className="btn secondary" onClick={handleSeeMore}>Voir plus</button>
      </div>
    </article>
  );
};

export default EventCard;