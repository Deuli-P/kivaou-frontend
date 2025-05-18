import { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EventProps, UserProps } from '../../../../utils/types';
import './detail.scss';
import Button from '../../../../components/Button/Button';
import UserDetailCard from '../../../../components/User/UserDetailCard/UserDetailCard';
import DeleteEventModal from '../../../../components/Modals/DeleteEventModal/DeleteEventModal';
import CancelEventModal from '../../../../components/Modals/CancelEventModal/CancelEventModal';
import RemoveUserFromEventModal from '../../../../components/Modals/RemoveUserFromEventModal/RemoveUserFromEventModal';
import { formatDateTime } from '../../../../utils/utils';
import Tag from '../../../../components/Tag/Tag';
const API_URL = import.meta.env.VITE_BACKEND_URL;

const emptyEvent: EventProps = {
  id: '',
  title: '',
  organization: {
    id: '',
    name: ''
  },
  owner: {
    id: '',
    firstname: '',
    lastname: '',
    photo_path: ''
  },
  description: '',
  start_date: '',
  end_date: '',
  destination: {
    id: '',
    name: '',
    address:{
      id: '',
      number: 0,
      street: '',
      city: '',
      postale_code: 12345,
      country: ''
    },
    phone: '',
    google_page_link: '',
    photo_path: '',
    website: '',
    service_type: '',
    service_link: '',
    speciality: '',
    schedule: []
  },
  submitted: false,
  users: [],
  status: 'cancelled'
};

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [ loading, setLoading ] = useState(false);
  const [ eventDetails, setEventDetails ] = useState<EventProps>(emptyEvent);
  const [ deleteEventModal, setDeleteEventModal ] = useState(false);
  const [ cancelEventModal, setCancelEventModal ] = useState(false);
  const [ userToRemove, setUserToRemove ] = useState<UserProps | null>(null);
  const [ removeMemberModal, setRemoveMemberModal ] = useState(false);

  const navigate = useNavigate();

  const { user } = useAuth();

  const fetchEventDetails = async (eventId: string) => {
    try {
      console.log("start fetch event details")
      setLoading(true)
      const response = await fetch(`${API_URL}/api/v1/event/${eventId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })

      const data = await response.json()
      if (data.status === 200) {
        setEventDetails(data.event)
        setLoading(false)
      }
      else if(data.status === 204){
        return;
      }
      else if(data.status === 404){
        navigate('/')
      }
      else{
        setLoading(false)
        toast.error(data.message)
      }
    }
    catch (error) {
      console.error('Error fetching event details:', error)
      setLoading(false)
    }
  };

  const handleOpenCancelEvent = () => {
    setCancelEventModal(!cancelEventModal)
  };

  const handleCancelEvent = async () => {
    try {
      console.log('start cancel event')
      const response = await fetch(`${API_URL}/api/v1/event/cancel/${eventDetails.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if(response.status === 204) {
        toast.error('Un problème est survenu lors de l\'annulation de l\'événement')
        return;
      };
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data.message)
        navigate('/')
      }
      else {
        toast.error(data.message)
        return;
      }

    }
    catch (error) {
      console.error('Error cancelling event:', error)
    }
  };

  const handleOpenDeleteEventModal = () => {
    setDeleteEventModal(!deleteEventModal)
  };

  const handleDeleteEvent = async () => {
    try {
      console.log('start cancel event')
      console.log('feature pas encore implémentée')
      const response = await fetch(`${API_URL}/api/v1/admin/event/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      const data = await response.json()
      if (data.status === 200) {
        toast.success(data.message)
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    }
    catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  const handleOpenRemoveMemberModal = () => {
    setRemoveMemberModal(!removeMemberModal)
  };

  const handleRemoveMember = async (user: UserProps) => {
    try {
      console.log('start remove member :', user.id)
      console.log('feature pas encore implémentée')
    }
    catch (error) {
      console.error('Error removing member:', error)
    }
    setRemoveMemberModal(false)
    setUserToRemove(null)
  };

  const addUserToUsers = (userId: string) => {
    const userData = {
        id: userId,
        photo_path: user?.photo_path || '',
        firstname: user?.firstname || '',
        lastname: user?.lastname || ''
    };
    const updatedUsers = eventDetails.users ? [...eventDetails.users, userData] : [userData];

    setEventDetails((prevEvent) => ({
        ...prevEvent,
        users: updatedUsers,
        submitted: true
    }))
};

  const handleSubmitParticipation = async () => {
    setLoading(true);
    try {
    const response = await fetch(`${API_URL}/api/v1/event/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ eventId: eventDetails.id })
    });

    const data = await response.json();
        if (response.status === 200) {
            addUserToUsers(user ? user.id : '');
            toast.success(data.message);
        } else {
            toast.error(data.message? data.message : "Erreur lors de la l'enregistrement à l'événement");
        }
    } catch (error) {
    console.error('Erreur submit :', error);
    } finally {
    setLoading(false);
    }
};

const deleteUserFromUsers = (userId: string) => {
  if(!userId) return;
  const updatedUsers = eventDetails.users?.filter((user: UserProps) => user.id !== userId);
  setEventDetails((prevEvent) => ({
      ...prevEvent,
      users: updatedUsers,
      submitted: false
  }));
};

const handleCancel = async () => {
    setLoading(true);
    try {
    const response = await fetch(`${API_URL}/api/v1/event/cancel/${eventDetails.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ eventId: eventDetails.id })
    });

    if (response.status === 200) {
        deleteUserFromUsers(user ? user.id : '');
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

  // Afficher le status de l'événement 
  const statusShow = (event: EventProps) => {
    const eventStatus = event.status || 'started';
    const currentDate = new Date();
    const eventStartDate = new Date(event.start_date);
    const eventEndDate = new Date(event.end_date);
  
    if (eventStatus === 'deleted') {
      return 'Supprimé';
    } else if (eventStatus === 'cancelled') {
      return 'Annulé';
    } else if (eventStatus === 'started') {
      if (eventEndDate < currentDate) {
        return 'Terminé';
      } else if (eventStartDate < currentDate && eventEndDate > currentDate) {
        return 'En cours';
      } else if (eventStartDate > currentDate) {
        return 'À venir';
      }
    }
  
    return 'Statut inconnu';
  };
 

    useEffect(() => {
      if(eventId)
      fetchEventDetails(eventId)
    }, [eventId])


  return (
    <main>
      { loading ? (
          <h1 className="">Chargement...</h1>
      )
      :
      (
        <>
          <h1>{eventDetails?.title}</h1>
          <section className="event-detail-section">
            <h2>Information de l'événement</h2>
              <Tag>
                {statusShow(eventDetails)}
              </Tag>
            <div className="event-detail-event-container">
              {eventDetails?.description && <p>{eventDetails.description}</p>}
              {/* Dates - createur - */}
              <div className="event-detail-event-date-time-container">
                <p className='event-detail-event-date-time'>De {formatDateTime(eventDetails?.start_date)}</p>
                <p className='event-detail-event-date-time'>jusqu'à {formatDateTime(eventDetails?.end_date)}</p>
              </div>
            </div>
          </section>
            {statusShow(eventDetails) === 'À venir' && (
              <div className="btn-container">
                {eventDetails?.submitted ? (
                  <Button
                    label="Annuler ma participation"
                    onClick={()=> handleCancel()}
                    version='secondary'
                    disabled={loading}
                    type='button'
                  />
                ) : (
                    <Button
                      label="Participer à l'événement"
                      onClick={() => handleSubmitParticipation()}
                      disabled={loading}
                      version='primary'
                      type='button'
                    />
                )}
              </div>
            )}
          {(user?.organization?.role === 'OWNER' || user?.user_type === 'admin') && (
            <section className="event-actions">
                <h2>Annuler ou supprimer l'événement</h2>
                <Button
                  label="Annuler l'événement"
                  onClick={handleOpenCancelEvent}
                  version='tertiary'
                  type='button'
                />
            {user?.user_type === 'admin' && (
              <Button
              label="Supprimer l'événement"
              onClick={handleOpenDeleteEventModal}
              version='tertiary'
              type='button'
              />
            )}
            </section>
          )}
          <section>
            <h2>Information sur le lieu de l'événement</h2>
            <div className="event-detail-organizer-container">
              {eventDetails?.owner?.photo_path && (
                <img
                  src={eventDetails.owner.photo_path}
                  alt={eventDetails.owner.firstname + ' ' + eventDetails.owner.lastname}
                />
              )}
              <p>{eventDetails.owner.firstname} {eventDetails.owner.lastname}</p>
            </div>
          <div className="event-detail-sections-destination-container">
            {eventDetails?.destination?.photo_path && (
              <img
                src={eventDetails.destination.photo_path}
                alt={eventDetails.destination.name}
              />
            )}
            <div className="event-detail-destination-info">
              <h2>Adresse</h2>
              {/* adresse complete */}
              <div className="event-detail-sous-section-container">
                <p>{eventDetails.destination.address?.number} {eventDetails.destination.address?.street}</p>
                <p>{eventDetails.destination.address?.postale_code} {eventDetails.destination.address?.city}</p>
                <p>{eventDetails.destination.address?.country}</p>
              </div>
            </div>
            <div className='event-detail-destination-info'>
              <h2>Information du lieu</h2>
              <div className="event-detail-sous-section-container">
                {eventDetails.destination.speciality && <p>Spécialité : {eventDetails.destination.speciality}</p>}
                {eventDetails.destination.service_type && <p>Type de service : {eventDetails.destination.service_type}</p>}
                {eventDetails.destination?.website && (
                  <div className='event-detail-website-container'>
                    <p>
                      Site web :</p> 
                      <a 
                        target='_blank' 
                        rel="noopener noreferrer"
                        href={eventDetails.destination.website}
                      >
                        <p>{eventDetails.destination.website}</p>
                      </a>
                    </div>
                )}
                {eventDetails.destination?.website && (
                   <div className='event-detail-website-container'>
                   <p>
                     Page Google map :</p> 
                     <a 
                       target='_blank' 
                       href={eventDetails.destination.google_page_link}
                     >
                       <p>{eventDetails.destination.google_page_link}</p>
                     </a>
                   </div>
                )}
                {eventDetails.destination?.website && (<p>Téléphone : {eventDetails.destination.phone}</p> )}
                
              </div>
            </div>
            {eventDetails.destination.schedule && eventDetails.destination.schedule.length > 0 && (
              <div className='event-detail-destination-info'>
                <h2>Horaires</h2>
                <div className="event-detail-schedule-container">
                  {eventDetails.destination.schedule.map((day) => (
                    <div key={day.day} className="event-detail-schedule-day">
                      <p>{day.day}</p>
                      <p>{day.morning && `Matin : ${day.morning}`}</p>
                      <p>{day.afternoon && `Après-midi : ${day.afternoon}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          </section>
          <section>
            <h2>Liste des participants</h2>
            <div className='event-detail-participants-container'>
              {eventDetails?.users?.map((user: UserProps ) => (
                <UserDetailCard
                  key={user.id}
                  item={user}
                  setOpen={()=> setRemoveMemberModal(true)}
                  setUserToRemove={(user: UserProps) => {setUserToRemove(user)}
                  }
                />
              ))}
            </div>
          </section>
        </>
      )
      }
      {deleteEventModal && user?.user_type === 'admin' && (
        <DeleteEventModal
          onClose={handleOpenDeleteEventModal}
          onDelete={handleDeleteEvent}
        />
      )}
      {cancelEventModal && (user?.organization?.role === 'OWNER' || user?.user_type === 'admin') && (
        <CancelEventModal
          onClose={handleOpenCancelEvent}
          onCancel={handleCancelEvent}
        />
      )}
      {removeMemberModal && userToRemove && (user?.organization?.role === 'OWNER' || user?.user_type === 'admin') && (
        <RemoveUserFromEventModal
          item={userToRemove}
          onClose={handleOpenRemoveMemberModal}
          onRemove={handleRemoveMember}
          setUserToRemove={setUserToRemove}
        />
      )}
    </main>
  )
}

export default EventDetail;