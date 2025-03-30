import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const OrganizationDetail = () => {

  const { id } = useParams();
  const { user } = useAuth();
  const [ loading, setLoading ] = useState(true);

  const [ organization, setOrganization ] = useState({
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
      setOrganization(data);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching organization:', error);
    }
  }


  useEffect(() => {
    //fetchOrganization()
  }, [id]);


  return (
    <>
      {!user && <div>Vous devez être connecté pour voir cette page</div>}
      {loading ? 
        <main>
          <div>Chargement...</div>
        </main>
      :
        (
        <main>
          <h1>Détail de l'organisations</h1>
          <div>
            <div>
              <h2>{organization.name}</h2>
              <p>Propietaire : {organization.owner.firstname} {organization.owner.lastname} </p>
            </div>
            <h2>Adresse</h2>
            <p>{organization.address.street}</p>
            <p>{organization.address.postal_code} {organization.address.city}</p>
            <p>{organization.address.country}</p>
          </div>
        </main>
        )}
    </>
  )
}

export default OrganizationDetail