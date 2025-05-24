import React, { useState} from 'react'
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Inputs/Input/Input';


const CreateOrganization = () => {

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const [ organizationData, setOrganizationData ] = useState({
    name: 'EDF',
    number: 23,
    street: "Rue de l'avion",
    postale_code: 12345,
    city: 'Fankfurt',
    country: 'France'
  })

  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setOrganizationData(prev => ({
      ...prev,
      [name]: value
    }))
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{
      const response = await fetch(`/server/api/v1/organization/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(organizationData)
      });
      const data = await response.json()

      if(data.status === 200){
        setUser((prev: any) => ({
          ...prev,
          organization:[data.organization]
        }))
        toast.success(data.message);
        navigate('/profile')
      }
      else{
        toast.error(data.message)
        return
      }


    }
    catch(e){
      toast.error("Erreur lors de la création de l'organisation")
    }
  }


  return (
    <main>
      <h1>Créer une organisation</h1>
      <p>Si vous avez déjà une organisation, veuilliez contacter son administrateur pour qu'il vous invite directement.</p>
      <form 
        action="submit" 
        onSubmit={handleSubmit}
        className="auth-form"
      >
        <Input
          name="name"
          label="Nom de l'organisation"
          placeholder="ex : EDF"
          value={organizationData.name}
          onChange={handleChange}
          required
        />

        <Input
          name="number"
          label="Numéro de la voie"
          type="text"
          placeholder="ex : 123"
          value={organizationData.number}
          onChange={handleChange}
          required
        />

        <Input
          name="street"
          label="Rue"
          placeholder="ex : Rue de l'église"
          value={organizationData.street}
          onChange={handleChange}
          required
        />

        <Input
          name="city"
          label="Ville"
          placeholder="ex : Paris"
          value={organizationData.city}
          onChange={handleChange}
          required
        />

        <Input
          name="postale_code"
          label="Code postal"
          type="text"
          placeholder="ex : 75000"
          value={organizationData.postale_code}
          onChange={handleChange}
          required
        />

        <Input
          name="country"
          label="Pays"
          placeholder="ex : France"
          value={organizationData.country}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          version="primary"
          label="Créer l'organisation"
          ariaLabel="Créer l'organisation"
        />
      </form>
    </main>
  )
}

export default CreateOrganization