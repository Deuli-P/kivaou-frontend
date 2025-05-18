import { useState, useEffect } from 'react';
import EventCard from '../../components/Cards/EventCard/EventCard';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EventProps } from '../../utils/types';
import Button from '../../components/Button/Button';
const API_URL = import.meta.env.VITE_BACKEND_URL;
import './userHome.scss';
const UserHome = () => {

  const { user } = useAuth();

  const [events, setEvents] = useState<EventProps[]>([]);

  const navigate = useNavigate();

  const handleRedirectOrganization = () => {
    navigate('/orga/create');
  }

  const handleRedirectEvent = () => {
    navigate('/event/create');
  }

  const fetchEvents = async () => {
    try {
      if(user?.organization?.id === null) {
        setEvents([]);
        return;
      }
      const response = await fetch(`${API_URL}/api/v1/event/active`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();

      if(data.status === 204){
        return;
      }
      else if(data.status === 200) {
        setEvents(data.events || []);
      }else{
        toast.error(data.message);
      }
    
    }
    catch (error) {
      console.error('Error fetching events:', error);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);


  return (
    <main>
      <h1>Liste des événements</h1>
      <span>Bonjour {user?.firstname}</span>
        {user?.organization?.id === null ? (
          <section className='home-no-organization-section'>
            <h2>
              Vous n'avez pas encore d'organisation
            </h2>
            <div className="home-no-organization-content">
              <p>
                Pour rejoindre une organisation il faut que l’administrateur de l’organisation vous invite.
              </p>
              <span>OU</span>
                <Button
                  version='tertiary'
                  label='Créer une organisation'
                  ariaLabel='Créer sa propre organisation'
                  onClick={handleRedirectOrganization}
                  />
              <p>Vous pouvez créer une organisation en suivant ce lien</p>
          </div>
        </section>
      ) : 
      (
       events.length < 1 ? 
        (
          <section className='home-no-organization-section'>
            <h2 className=''>
              Aucun événement à venir trouvé
            </h2>
            <div className="home-no-organization-content">
              <p>Votre organisation n'a aucun événement de prévu actuellement</p>
              <Button
                version='tertiary'
                label='Créer un événement'
                ariaLabel='Créer sa propre organisation'
                onClick={handleRedirectEvent}
                />
              <p>Vous pouvez en créer un dans un lieu ajouté par l'administrateur de l'organisation</p>
            </div>
          </section>
        ) 
        : 
        (
          <div className='events-list'>
            {events.map((event, index) => (
              <EventCard 
                key={index}
                event={event}
              /> 
            ))}
          </div>
        )
      )}
    </main>
  )
}

export default UserHome