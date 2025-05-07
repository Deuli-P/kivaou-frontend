import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard/EventCard';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EventProps } from '../utils/types';
const env = import.meta.env.VITE_ENV_MODE;
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {

  const { user } = useAuth();

  const [events, setEvents] = useState<EventProps[]>([]);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      console.log('fetching events');
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

  if(user?.organization === null) {
    return (
      <main>
        <div className=''>
          <h3 className=''>
            Il faut rejoindre ou créer une organisation pour avoir acces aux événements
          </h3>
          <p>
            Pour rejoindre une organisation il faut que l’administrateur de l’organisation vous invite.
          </p>
          <div className="">
            <p>Vous pouvez créer une organisation sur la page suivante :</p>
            <button
              className=''
              onClick={() => {
                navigate('/organization/create');
              }}
            >
              Créer une organisation
            </button>
          </div>
        </div>
      </main>
    )
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  return (
    <main>
      <h1>Liste des événements</h1>
      { events.length < 1 ? 
      (
        <div className=''>
          <h3 className=''>
          Aucun événement n’est prévu dans votre organisation pour le moment
          </h3>
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
        </div>
      ) 
      : 
      (
        <div className=''>
          {events.map((event, index) => (
            <EventCard 
              key={index}
              event={event}
            /> 
          ))}
        </div>
      )}
    </main>
  )
}

export default Home