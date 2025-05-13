import React, { useState, useEffect } from 'react';
import EventCard from '../../components/Cards/EventCard/EventCard';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EventProps } from '../../utils/types';
const env = import.meta.env.VITE_ENV_MODE;
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {

  const { user } = useAuth();

  const [events, setEvents] = useState<EventProps[]>([]);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/event/active?id=${user?.organization?.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) {
        toast.error("Erreur lors de la récupération des événements")
        throw new Error('Failed to fetch events');
      }
      
      if(response.status === 200) {
        const data = await response.json();
        setEvents(data.result || []);
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
      { user?.organization?.id === null ? (
        <section>
        <h2>
          Il faut rejoindre ou créer une organisation pour avoir acces aux événements
        </h2>
        <p>
          Pour rejoindre une organisation il faut que l’administrateur de l’organisation vous invite.
        </p>
        <div className="">
          <p>Vous pouvez créer une organisation sur la page suivante :</p>
          <button
            className='btn tertiary'
            onClick={() => {
              navigate('/organization/create');
            }}
          >
            Créer une organisation
          </button>
        </div>
      </section>
      ) : 
      (
       events.length < 1 ? 
        (
          <section className=''>
            <h2 className=''>
            Aucun événement n’est prévu dans votre organisation pour le moment
            </h2>
            <div className="">
            <p>Vous pouvez en créer un dans un lieu ajouté par l’organisateur</p>
            <button
              className=''
              onClick={() => {
                navigate('/organization/create');
              }}
            >
              Créer un événement
            </button>
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

export default Home