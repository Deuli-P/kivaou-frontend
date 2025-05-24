import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './create.scss';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Inputs/Input/Input';
import Select from '../../../../components/Inputs/Select/Select';
import TextArea from '../../../../components/Inputs/TextArea/TextArea';

const API_URL = (window as any).env?.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL;
const env = (window as any).env?.VITE_ENV_MOE || import.meta.env.VITE_ENV_MOE;

interface CreateEventPlaceProps {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    postal_code: number;
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
  }
};

const fakeEvent = {
  title: 'Final des Worlds series',
  description: 'Une description de l\'événement ici pour dire quel est le programme ou le projet',
  start_date: '2025-10-01T12:00',
  end_date: '2025-10-01T15:00',
  place : ""

};

const fakePlaces: CreateEventPlaceProps[] = [
  {
    id: "931b6c05-6a48-47c1-a330-0c92be775f7a"
,
    name: 'Paris',
    address: {
      street: 'Rue de la paix',
      number: 12,
      postal_code: 75002,
      city: 'Paris',
      country: 'France',
      latitude: 48.8566,
      longitude: 2.3522
    }
  },
  {
    id: '12345678-1234-1234-1234-123456789012',
    name: 'Lyon',
    address: {
      street: 'Rue de la république',
      number: 45,
      postal_code: 69002,
      city: 'Lyon',
      country: 'France',
      latitude: 45.7640,
      longitude: 4.8357
    }
  }
];





const CreateEvent = () => {

  const { user } = useAuth();

  const now = new Date();
  const localNow = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);


  const emptyEvent = {
    title: '',
    description: '',
    start_date: localNow,
    end_date: localNow,
    place : ''
  };

  const [eventData, setEventData ] = useState(env === 'DEV' ? fakeEvent : emptyEvent);

  const [ places, setPlaces ] = useState<CreateEventPlaceProps[]>(env === 'DEV' ? fakePlaces : []);
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
  
    setEventData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const fetchPlaces = async (organizationId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/server/api/v1/destination/all/${organizationId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if(!response.ok){
        toast.error("Erreur lors de la récupération des lieux")
        return
      }
      const data = await response.json();
      setPlaces(data.places || [])
      setLoading(false)
    }
    catch(e){
      setLoading(false)
      toast.error("Erreur lors de la récupération des lieux")
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault();
    
      if (new Date(eventData.end_date) < new Date(eventData.start_date)) {
        toast.warning("La date de fin ne peut pas être antérieure à la date de début.");
        return;
      };
    
      if (!user?.organization) {
        toast.error("Vous devez appartenir à une organisation pour créer un événement");
        return;
      };
      if(eventData.place === 'null'){
        toast.error("Vous devez choisir un lieu");
        return;
      }
    
      const response = await fetch(`/server/api/v1/event/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData)
      })
      const data = await response.json();
        if (response.status === 200) {
          toast.success(data.message);
          navigate(`/orga/event/${data.event_id}`);
      } else {
          toast.error(data.message);
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error("Erreur lors de la création de l'événement");
    }
  };

  const handleNavigate = () => {
    navigate('/orga/destination/create')
  };

  useEffect(() => {
    if(user?.organization){
      fetchPlaces(user?.organization?.id)
    }
  },[user])

  if(loading){
    return (
      <main>
        <h1>Chargement...</h1>
      </main>
    )
  }


  return (
    places.length === 0 ?
    (
      <main>
        <h1>Aucun lieu trouvé</h1>
        {/* Si je suis admin alors on affiche le bouton pour creer une destination sinon un message*/}
        {user?.organization?.role === 'OWNER' ? (
          <div className="event-create-no-place-container">
            <p>Vous devez créer un lieu avant de créer un événement.</p>
            <Button
              version='tertiary'
              label='Créer une destination'
              ariaLabel="Créer une première destination pour l'organisation"
              onClick={handleNavigate}
              />
          </div>
        ) : (
          <p>Il faut que l'administrateur de l'organisation créér une destination en premier</p>
        )}
      </main>
    )
    :
    (
      <main>
        <h1>Créer un événement</h1>
        <p>Vous voulez organiser un événement ou prévoir une sortie, vous ètes au bon endroit.</p>
        <form 
          action="submit" 
          onSubmit={handleSubmit}
          className='auth-form'
        >
          <Input
              name='title'
              label="Titre de l'événement"
              type='text'
              placeholder="ex : Escape game de Paris"
              required={true}
              value={eventData.title}
              onChange={(e)=>handleChange(e)}
          />
          <Input
              name='start_date'
              label=" Heure et date de début"
              type='datetime-local'
              required={true}
              value={eventData.start_date}
              onChange={(e)=>handleChange(e)}
              min={new Date().toISOString().slice(0,16)}
          />
          <Input
              label=" Heure et date de fin"
              type='datetime-local'
              required={true}
              name='end_date'
              min={ eventData.start_date || new Date().toISOString().slice(0,16)}
              onChange={(e)=>handleChange(e)}
              value={eventData.end_date}
          />
         <Select
            options={places}
            name='place'
            label='Sélectionner un lieu'
            required={true}
            value={eventData.place}
            onChange={(e)=>handleChange(e)}
            placeholder='-- Sélectionner un lieu --'
         />
         <TextArea
            label="Description de l'événement"
            name='description'
            value={eventData.description}
            onChange={(e)=>handleChange(e)}
            placeholder="Description de l'événement"
            ariaLabel="Description de l'événement"
         />
         <Button
            version='primary'
            disabled={new Date(eventData.end_date) < new Date(eventData.start_date) ? true : false}
            type="submit"
            label='Créer un événement'
            ariaLabel="Créer un événement"
          />
        </form>
      </main>
    )
  );
}

export default CreateEvent