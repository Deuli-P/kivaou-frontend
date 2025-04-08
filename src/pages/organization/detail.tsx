import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { EventProps, UserProps } from "../../utils/types";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const OrganizationDetail = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const [ loading, setLoading ] = useState(true);

  const [ organization, setOrganization ] = useState({
    name: 'Robert Space Industries',
    address: {
      street: 'Rue de l\'avion',
      number: 123,
      postal_code: 55604,
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
  })

  const [ role , setRole ] = useState('MEMBER');

  const [ usersList, setUsersList ] = useState([]);
  // EventList = events du passé et event présent ou futur
  const [ eventsList, setEventsList ] = useState({
    past:[],
    futures: []
  });

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
        futures: data.events.futures ? data.events.futures : []
      });
      setRole(data.role);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching organization:', error);
    }
  }


  useEffect(() => {
    fetchOrganization()
  }, [id]);

  useEffect(() => {
    console.log("organization owner id", organization.owner.id);
    console.log('user id ', user);
  }, [organization]);

  return (
    <>
      {!user && <div>Vous devez être connecté pour voir cette page</div>}
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
              <h2>{organization.name}</h2>
              <p>Propietaire : {organization.owner.firstname} {organization.owner.lastname} </p>
            </div>
            <div className="orga-detail-orga-address-container">
              <h2>Adresse</h2>
              <p>{organization.address.street}</p>
              <p>{organization.address.postal_code} {organization.address.city}</p>
              <p>{organization.address.country}</p>
            </div>
          </div>
          <div className="orga-detail-events">
            <div className="orga-detail-events-container">
              <h2>Liste des événements</h2>
              <div className="orga-detail-events-list-container">
                <div className="orga-detail-events-list-past-container">
                  <h3>Événements passés</h3>
                  <ul className="orga-detail-events-list-ul">
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
                <div className="orga-detail-events-list-past-container">
                  <h3>Événements à venir</h3>
                  <ul className="orga-detail-events-list-ul">
                    {eventsList.futures.length === 0 ? 
                      <li className="orga-detail-events-not-found">
                        Aucun événements passés
                      </li>
                    :
                    eventsList.futures.map((evt) => (
                      <li key={evt.id} className="orga-detail-events-card">
                        {evt.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="orga-detail-destitnations">
            <div className="orga-detail-destinations-container">
              <h2>Liste des destinations de l'organisation</h2>
              {role === 'ADMIN' &&(
                <button>
                  Créer une nouvelle destination
                </button>
              )}
              <ul>
                <li className="orga-detail-destinations-not-found">
                  Aucune destination
                </li>
              </ul>
            </div>
          </div>
          <div className="orga-detail-user-list">
            <div className="orga-detail-user-list-container">
              <h2>Liste des utilisateurs</h2>
              <ul>
                {usersList.length === 0 ? 
                  <div className="user-list-not-found">
                    Aucun utilisateur dans cette organisation
                  </div>
                :
                usersList.map((user: UserProps) => (
                  <li key={user.id}>
                    <div className="user-list-photo-container">
                      {user.photo_path ?
                        (
                          <img src={user.photo_path} alt="photo de profil" />
                        )
                      :
                        (
                          <img src="https://www.randomkittengenerator.com/cats/1957.jpg" alt="photo de profil" />
                        )
                      }
                    </div>
                    <div className="user-list-name-container">
                      <p>
                      {user.firstname} {user.lastname}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        ) 
      }
    </>
  )
}

export default OrganizationDetail