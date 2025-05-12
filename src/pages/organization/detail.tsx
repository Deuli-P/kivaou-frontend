import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { EventProps, UserProps } from "../../utils/types";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const env = import.meta.env.VITE_ENV_MODE;
import AddressCards from "./cards/AddressCards.js";
import CreateEventModal from './modals/CreateEventModal.js';
import EventCard from "../../components/EventCard/EventCard.js";
const fakeOrganization ={
  name: 'Robert Space Industries',
  address: {
    number: 123,
    street: 'Rue de l\'avion',
    postale_code: 55604,
    city: 'Los Santos',
    country: 'États-Unis',
    latitude: 23.405,
    longitude: -12.456,
  },
  owner: {
    id: '123456789',
    firstname: 'Chriss',
    lastname: 'Robert'
  }
};

const emptyOrganization = {
  name: '',
  address: {
    number: 0,
    street: '',
    postale_code: 0,
    city: '',
    country: '',
    latitude: 0,
    longitude: 0,
  },
  owner: {
    id: '',
    firstname: '',
    lastname: ''
  }
};
const emptyEvents = {
  past: [],
  futures: []
};
const emptyUsers : any[] = [];
const emptyDestinationsList: any[] = [];

const OrganizationDetail = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [ organization, setOrganization ] = useState( env === 'DEV' ? fakeOrganization : emptyOrganization);
  const [ destinationsList, setDestinationsList ] = useState(emptyDestinationsList);


  const navigate = useNavigate();

  const dateNow = new Date();
  const timeNow = dateNow.getTime();

  const [ usersList, setUsersList ] = useState(emptyUsers);
  // EventList = events du passé et event présent ou futur
  const [ eventsList, setEventsList ] = useState(emptyEvents);

  const fetchOrganization = async () => {
    try{
      setLoading(true);
      const response = await fetch(`${API_URL}/api/organization/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch organization');
      }
      const data = await response.json();
      setOrganization(data.organization);
      setUsersList(data.users);
      setEventsList({
        past: data.events.past ? data.events.past : [],
        futures: data.events.future ? data.events.future : []
      });
      setDestinationsList(data.destinations || []);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching organization:', error);
    }
  }


  useEffect(() => {
    fetchOrganization()
  }, [id]);


  return (
    <>
      {!user && <main>Vous devez être connecté pour voir cette page</main>}
      {loading ? 
        <main>
          <div>Chargement...</div>
        </main>
      :
       !organization ? 
        <main>
          <div>Cette organisation n'existe pas</div>
        </main>
      :
        (
        <main>
          <h2>Détail de l'organisations</h2>
          <div className="orga-detail-orga-info">
            <div className="orga-detail-orga-title-container">
              <h2>Nom : {organization.name}</h2>
              <p>Propietaire : {organization.owner.firstname} {organization.owner.lastname} </p>
            </div>
            <div className="orga-detail-orga-address-container">
              <h2>Adresse :</h2>
              <p>{ organization.address.number} {organization.address.street}</p>
              <p>{organization.address.postale_code} {organization.address.city}</p>
              <p>{organization.address.country}</p>
            </div>
          </div>
          <div className="orga-detail-events">
            <div className="orga-detail-events-container">
              <h2>Liste des événements</h2>
              <div className="orga-detail-events-list-container">
                <div className="events-list-container">
                  <h3>Événements passés</h3>
                  <ul className="events-list">
                    {eventsList.past.length === 0 ? 
                      <li className="orga-detail-events-not-found">
                        Aucun événements passés
                      </li>
                    :
                    eventsList.past.map((evt: EventProps) => (
                      <li key={evt.id} className="orga-detail-events-card">
                        {evt.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="events-list-container">
                  <h3>Événements à venir</h3>
                  <ul className="events-list">
                    {eventsList.futures.length === 0 ? 
                      <li className="orga-detail-events-not-found">
                        Aucun événements passés
                      </li>
                    :
                    eventsList.futures.map((evt) => (
                      <EventCard 
                        key={evt.id}
                        event={evt}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="events-list-container">
            <div className="events-list">
              <h2>Liste des destinations de l'organisation</h2>
              {user.organization?.role === 'OWNER' &&(
                <button
                  onClick={() => {
                    navigate('/orga/destination/create', {
                      state: {
                        organizationId: id}})
                  }}
                  className="btn tertiary"
                >
                  Créer une nouvelle destination
                </button>
              )}
            </div>
              <div className="events-list">
                {destinationsList.length > 0 ? 
                  destinationsList.map((destination) => (
                    <AddressCards
                      key={destination.id}
                      destination={destination}
                      onCreateEventClick={() => {
                        setSelectedDestination(destination);
                        setOpenModal(true);
                      }}
                    />
                  ))
                  :
                  <li className="orga-detail-destinations-not-found">
                    Aucune destination
                  </li>
                }
              </div>
          </div>
          <div className="users-list-container">
            <h2>Liste des utilisateurs</h2>
            <div className="users-list-users-container">
                {usersList.length === 0 ? 
                  <div className="user-list-not-found">
                    Aucun utilisateur dans cette organisation
                  </div>
                :
                usersList.map((user: UserProps) => (
                  <article key={user.id} className="orga-detail-user-card">
                    <div className="orga-detail-user-card-photo-container">
                      {user.photo_path ?
                        (
                          <img src={user.photo_path} alt="photo de profil" loading="lazy"/>
                        )
                      :
                        (
                          <img src="https://www.randomkittengenerator.com/cats/1957.jpg" alt="photo de profil" loading="lazy"/>
                        )
                      }
                    </div>
                    <div className="orga-detail-user-card-infos">
                      <p>
                        {user.firstname} {user.lastname}
                      </p>
                    </div>
                  </article>
                ))}
            </div>
          </div>
          {openModal && selectedDestination && (
            <CreateEventModal
              destination={selectedDestination}
              onClose={() => setOpenModal(false)}
            />
          )}
        </main>
        ) 
      }
    </>
  )
}

export default OrganizationDetail