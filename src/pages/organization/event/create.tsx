import React, {useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { PlaceProps } from '../../../utils/types';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_BACKEND_URL

const env = import.meta.env.VITE_ENV_MODE;

const fakeEvent = {
  title: 'Final des Worlds series',
  description: 'Une description de l\'événement ici pour dire quel est le programme ou le projet',
  start_date: '2025-10-01T12:00',
  end_date: '2025-10-01T15:00',
  place : '8e54650a-cb47-49ba-98ed-a654fd1fb7ad'
};

const fakePlaces = [
  {
    id: '8e54650a-cb47-49ba-98ed-a654fd1fb7ad',
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

  const [ places, setPlaces ] = useState<PlaceProps[]>(env === 'DEV' ? fakePlaces : []);
  const [ loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEventData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const fetchPlaces = async (organizationId: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/destination/all?id=${organizationId}`, {
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
      console.log(e)
      setLoading(false)
      toast.error("Erreur lors de la récupération des lieux")
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (new Date(eventData.end_date) < new Date(eventData.start_date)) {
      toast.warning("La date de fin ne peut pas être antérieure à la date de début.");
      return;
    };
  
    if (!user?.organization) {
      toast.error("Vous devez appartenir à une organisation pour créer un événement");
      return;
    };

  
    await fetch(`${API_URL}/api/event/create?id=${user.organization.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(eventData)
    })
    .then(response => {
      if (!response.ok) {
        toast.error("Erreur lors de la création de l'organisation");
        throw new Error("Erreur HTTP");
      }
      return response.json();
    })
    .then(data => {
      console.log('data create event :', data);
      toast.success("L'événement est créé avec succès");
    })
    .catch(err => {
      console.error(err);
      toast.error("Erreur lors de la création de l'événement");
    });
  };

  const handleNavigate = () => {
    navigate('/orga/destination/create')
  };

  useEffect(() => {
    fetchPlaces(user?.organization.id)
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
        <p>Vous devez créer un lieu avant de créer un événement.</p>
        {/* Si je suis admin alors on affiche le bouton pour creer une destination sinon un message*/}
        {user?.organization.role === 'OWNER' ? (
          <div className="">
            <p>Vous devez créer un lieu avant de créer un événement.</p>
            <button
              onClick={handleNavigate}
              className='btn'
              >
              Créer une destination
            </button>
          </div>
        
        ) : (
          <p>Vous devez créer un lieu avant de créer un événement.</p>
        )}
      </main>
    )
    :
    (
      <main>
        <h1>Créer un événement</h1>
        <p>Vous voulez orgniser un événement ou prévoir une sortie, vous ètes au bon endroit.</p>
        <form 
          action="submit" 
          onSubmit={handleSubmit}
          className='auth-form'
        >
          <label 
              className="input-label"
              htmlFor="title"
          >
              Titre de l'événement
              <input 
                  type="text" 
                  placeholder="ex : Escape game de Paris" 
                  name='title'
                  id="title"
                  required
                  className='input-input'
                  value={eventData.title}
                  onChange={(e)=>handleChange(e)}
              />
          </label>
          <label 
              className="input-label"
              htmlFor="firstname"
          >
              Heure et date de début
              <input 
                  type="datetime-local" 
                  name='start_date'
                  id="start_date"
                  min={new Date().toISOString().slice(0,16)}
                  required
                  className='input-input'
                  value={eventData.start_date}
                  onChange={(e)=>handleChange(e)}
              />
          </label>
          <label 
              className="input-label"
              htmlFor="firstname"
          >
              Heure et date de fin
              <input 
                  type="datetime-local" 
                  name='end_date'
                  id="end_date"
                  min={ eventData.start_date || new Date().toISOString().slice(0,16)}
                  className='input-input'
                  value={eventData.end_date}
                  onChange={(e)=>handleChange(e)}
              />
          </label>
          <div className="event-form-place-list-container">
            <label 
                className="select-label"
                htmlFor="place"
            >
              Lieu
              <select 
                  name="place"
                  id="place"
                  required
                  className='input-select'
                  value={eventData.place}
                  onChange={(e)=>handleChange(e)}
              >
                  <option value="null">-- Sélectionner un lieu --</option>
                  {places.map((place) => (
                      <option
                          key={place.id}
                          value={place.id}
                          className="input-option"
                      >
                          {place.name}
                      </option>
                  ))} 
              </select>
            </label>
          </div>
          <label 
            className="input-label"
            htmlFor="description"
          >
            Description
            <textarea 
                rows={5}
                placeholder="Description de l'événement" 
                name='description'
                id="description"
                className='textarea-input'
                value={eventData.description}
                onChange={(e)=>handleChange(e)}
            />
          </label>
            <button
                disabled={new Date(eventData.end_date) < new Date(eventData.start_date) ? true : false}
                type="submit"
                >
                Créer
            </button>
        </form>
      </main>
    )
  );
}

export default CreateEvent