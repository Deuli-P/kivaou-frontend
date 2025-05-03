import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard/EventCard';
const env = import.meta.env.VITE_ENV_MODE;
const API_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/home`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch events');
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
        {events.map((event, index) => (
          <EventCard 
            key={index}
            event={event}
          />
        ))}
    </main>
  )
}

export default Home