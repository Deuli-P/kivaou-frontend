import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import EventCard from '../../../components/Cards/EventCard/EventCard';
import { EventProps, OrganizationProps, UserProps } from '../../../utils/types';
import UserDetailCard from '../../../components/User/UserDetailCard/UserDetailCard';
import { toast } from 'react-toastify';

const AdminHome = () => {

    const { user } = useAuth();

    const [ events, setEvents ] = useState<EventProps[]>([])
    const [ organizations, setOrganizations ] = useState<OrganizationProps[]>([])
    const [ users, setUsers ] = useState<UserProps[]>([])

    const [ deleteUserModal, setDeleteUserModal ] = useState<boolean>(false)
    const [ userToRemove, setUserToRemove ] = useState<UserProps | null>(null)
    const [ deleteOrganizationModal, setDeleteOrganizationModal ] = useState<boolean>(false)
    const [ organizationToRemove, setOrganizationToRemove ] = useState<OrganizationProps | null>(null)

    const fetchAllData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/all`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();
            if(data.status === 200) {
                setEvents(data.events || []);
                setOrganizations(data.organizations || []);
                setUsers(data.users || []);
            }else{
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error('Error fetching events:', error);
        }
    };




    useEffect(() => {
        //fetchAllData();
    },[])

  return (
    <main>
        <h1>Tableau de bord d'administraiton</h1>
        <span>Bonjour {user?.firstname}</span>
        <section>
            <h2>Liste des événements</h2>
            {events.length === 0 ? (
                <p>Aucun événement prévu sur l'ensemble du site</p>
            ) : (
                <div>
                    {events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </section>
        <section>
            <h2>Liste des organisations</h2>
            {organizations.length === 0 ? (
                <p>Il n'y a aucune organisation de créée et active sur la plateforme pour le moment</p>
            ) : (
                <div>
                    {organizations.map((organization) => (
                       <p
                            key={organization.id}
                       >
                        {organization.name}
                       </p>
                    ))}
                </div>
            )}
        </section>
        <section>
            <h2>Liste des événements</h2>
            {users.length === 0 ? (
                <p>Aucun utilisateur actif d'inscrit sur la plateforme pour le moment</p>
            ) : (
                <div>
                    {users.map((user) => (
                        <UserDetailCard
                            key={user.id}
                            item={user}
                            setOpen={()=>setDeleteUserModal(true)}
                            SetUserToRemove={(user:UserProps)=>setUserToRemove(user)}
                        />
                    ))}
                </div>
            )}
        </section>

    </main>
  )
}

export default AdminHome