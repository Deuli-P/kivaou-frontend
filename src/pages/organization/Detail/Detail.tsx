import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { EventProps, UserProps } from "../../../utils/types";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import AddressCards from "../../../components/Cards/AddressCard/AddressCards";
import CreateEventModal from '../../../components/Modals/CreateEventModal/CreateEventModal.tsx';
import EventCard from "../../../components/Cards/EventCard/EventCard";
import AddUserModal from "../../../components/Modals/AddUserModal/AddUserModal";
import UserDetailCard from "../../../components/User/UserDetailCard/UserDetailCard";
import './detail.scss';
import Button from "../../../components/Button/Button.tsx";
import { toast } from "react-toastify";
import RemoveMemberFromOrganizationConfirmModal from "../../../components/Modals/RemoveMemberFromOrganizationConfirmModal/RemoveMemberFromOrganizationConfirmModal.tsx";



const emptyOrganization = {
  id: null,
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
  const { user, getLogout } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const [openCreateEventModal, setCreateEventOpenModal] = useState(false);
  const [addUserOpenModal, setAddUserOpenModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [ organization, setOrganization ] = useState(emptyOrganization);
  const [ destinationsList, setDestinationsList ] = useState(emptyDestinationsList);
  const [ usersList, setUsersList ] = useState(emptyUsers);
  const [ eventsList, setEventsList ] = useState(emptyEvents);
  const [removeUserModalOpen, setRemoveUserModalOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<UserProps | null>(null);


  const navigate = useNavigate();

  console.log('params :', id);


  const fetchOrganization = async () => {
    try{
      setLoading(true);
      const response = await fetch(`${API_URL}/api/v1/organization/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if(response.status === 402){
        getLogout();
        navigate('/');
      }
      const data = await response.json();

      if(data.status === 200){
        if(!data.organization){
          setLoading(false);
          return;
        }
        setOrganization(data.organization);
        setUsersList(data.users);
        setEventsList({
          past: data.events.past ? data.events.past : [],
          futures: data.events.future ? data.events.future : []
        });
        setDestinationsList(data.destinations || []);
        setLoading(false);
      }

      else {
        toast.error(data.message);
        setLoading(false);
      }
    }
    catch (error) {
      console.error('Error fetching organization:', error);
    }
  }

  const handleRemoveUser = async (userRemove: UserProps) => {
    try{
        const response = await fetch(`${API_URL}/api/v1/organization/remove-user/${userRemove.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        const data = await response.json()
        if(data.status === 200){
          setUsersList((prevUsers: UserProps[]) => prevUsers.filter((user) => user.id !== userRemove.id))
          toast.success(data.message)
          setRemoveUserModalOpen(false);
          setUserToRemove(null);
        }else if ( data.status === 204){
          return;
        }else{
            toast.error(data.message)
        }
    }
    catch (error) {
        console.error('Error removing user:', error);
        toast.error("Erreur lors de la suppression de l'utilisateur")
    }
};


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
       !organization.id ? 
        <main>
          <div>Aucune organisation correspond</div>
        </main>
      :
        (
        <main>
          <section className="orga-detail-orga-info">
            <img 
              src="/hero-1440.webp" 
              srcSet="/hero-320.webp 320w, /hero-768.webp 600w, /hero-1440.webp 1100w, /hero-2400.webp 2000w"
              className="orga-detail-hero"
              loading="lazy"
            />
            <h1>Détail de l'organisations</h1>
            <div className="orga-detail-orga-title-container">
              <p>Nom : {organization.name}</p>
              <p>Propietaire : {organization.owner.firstname} {organization.owner.lastname} </p>
            </div>
            <div className="orga-detail-orga-address-container">
              <p>Adresse :</p>
              <p>{ organization.address.number} {organization.address.street}</p>
              <p>{organization.address.postale_code} {organization.address.city}</p>
              <p>{organization.address.country}</p>
            </div>
          </section>
          <section className="orga-detail-events">
            <div className="orga-detail-events-global-container">
              <h2>Liste des événements</h2>
              <div className="orga-detail-events-list-container">
                <div className="events-list-container">
                  <h3>Événements passés</h3>
                  <div className="events-list">
                    {eventsList.past.length === 0 ? 
                      <p className="orga-detail-events-not-found">
                        Aucun événements passés
                      </p>
                    :
                    eventsList.past.map((evt: EventProps) => (
                      <EventCard 
                        key={evt.id}
                        event={evt}
                      />
                    ))}
                  </div>
                </div>
                <div className="events-list-container">
                  <h3>Événements à venir</h3>
                  <div className="events-list">
                    {eventsList.futures.length === 0 ? 
                      <p className="orga-detail-events-not-found">
                        Aucun événements passés
                      </p>
                    :
                    eventsList.futures.map((evt: EventProps) => (
                      <EventCard 
                        key={evt.id}
                        event={evt}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="events-list-container">
            <div className="orga-detail-title-btn-container">
              <h2>Liste des destinations de l'organisation</h2>
              {user?.organization?.role === 'OWNER' &&(
                <Button
                  onClick={() => {
                    navigate('/orga/destination/create', {
                      state: {
                        organizationId: id}})
                  }}
                  version="tertiary"
                  
                  label='Créer une nouvelle destination'
                  ariaLabel='Créer une nouvelle destination'

                />
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
                        setCreateEventOpenModal(true);
                      }}
                    />
                  ))
                  :
                  <p className="orga-detail-destinations-not-found">
                    Aucune destination
                  </p>
                }
              </div>
          </section>
          <section className="users-list-container">
            <div className="orga-detail-title-btn-container">
              <h3>Liste des utilisateurs</h3>
              {user?.organization?.role === 'OWNER' &&(
              <Button 
                version="tertiary"
                onClick={() => {
                  setAddUserOpenModal(true);
                }}
                label='Ajouter un utilisateur'
                ariaLabel='Ajouter un utilisateur'
              />
              )}
            </div>
            <div className="users-list-users-container">
                {usersList.length === 0 ? 
                  <div className="user-list-not-found">
                    Aucun utilisateur dans cette organisation
                  </div>
                :
                usersList.map((member: UserProps) => (
                  <UserDetailCard
                    key={member.id}
                    item={member}
                    setOpen={()=>setRemoveUserModalOpen(true)}
                    setUserToRemove={(user) => setUserToRemove(user)}
                  />
                ))}
            </div>
          </section>
          {openCreateEventModal && selectedDestination && (
            <CreateEventModal
              destination={selectedDestination}
              onClose={() => setCreateEventOpenModal(false)}
              setEvent={setEventsList}
            />
          )}

          {addUserOpenModal  && (
            <AddUserModal
              onClose={() => setAddUserOpenModal(false)}
              setUsers ={setUsersList}
            />
          )}
          {removeUserModalOpen && userToRemove && (
            <RemoveMemberFromOrganizationConfirmModal
              item={userToRemove}
              setClose={() => setRemoveUserModalOpen(false)}
              setUserToRemove={setUserToRemove}
              onRemove={handleRemoveUser}
            />
          )}
        </main>
        ) 
      }
    </>
  )
}

export default OrganizationDetail