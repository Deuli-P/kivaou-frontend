import React, {useState} from 'react'
import { toast } from 'react-toastify';
const API_URL = import.meta.env.VITE_BACKEND_URL


const CreateEvent = () => {

  const [eventData, setEventData ] = useState({
    name: 'EDF',
    number: 23,
    street: "Rue de l'avion",
    postal_code: 12345,
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
    console.log('submit')
    try{
      const response = await fetch(`${API_URL}/api/event/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(organizationData)
      });
      if(!response.ok){
        toast.error("Erreur lors de la création de l'organisation")
        return
      }
      console.log('response create orga : ', response)
      const data = await response.json();
      console.log('data create orga : ', data)
    }
    catch(e){
      console.log(e)
      toast.error("Erreur lors de la création de l'organisation")
    }
    finally{
      toast.success('Organisation créée avec succès')
    }
  }


  return (
    <main>
      <h1>Créer une organisation</h1>
      <p>Si vous avez déjà une organisation, veuilliez contacter son administrateur pour qu'il vous invite directement.</p>
      <form 
        action="submit" 
        onSubmit={handleSubmit}
        className='auth-form'
      >
        <label 
            className="input-label"
            htmlFor="firstname"
        >
            Nom de l'organisation
            <input 
                type="text" 
                placeholder="ex : EDF" 
                name='name'
                id="name"
                required
                className='input-input'
                value={organizationData.name}
                onChange={(e)=>handleChange(e)}
            />
        </label>
        <label 
            className="input-label"
            htmlFor="firstname"
        >
           Numéro de la voie
            <input 
                type="number" 
                placeholder="ex : 123" 
                name='number'
                id="number"
                required
                className='input-input'
                value={organizationData.number}
                onChange={(e)=>handleChange(e)}
            />
        </label>
        <label 
            className="input-label"
            htmlFor="firstname"
        >
            Rue
            <input 
                type="text" 
                placeholder="ex : Rue de l'église" 
                name='street'
                id="street"
                required
                className='input-input'
                value={organizationData.street}
                onChange={(e)=>handleChange(e)}
            />
        </label>
        <label 
            className="input-label"
            htmlFor="firstname"
        >
            Ville
            <input 
                type="text" 
                placeholder="ex : 123" 
                name='city'
                id="city"
                required
                className='input-input'
                value={organizationData.city}
                onChange={(e)=>handleChange(e)}
            />
        </label>
        <label 
            className="input-label"
            htmlFor="firstname"
        >
            Code postale
            <input 
                type="number" 
                placeholder="ex : 123" 
                name='postal_code'
                id="postal_code"
                required
                className='input-input'
                value={organizationData.postal_code}
                onChange={(e)=>handleChange(e)}
            />
        </label>
        <label 
            className="input-label"
            htmlFor="firstname"
        >
           Pays
            <input 
                type="text" 
                placeholder="ex : 123" 
                name='country'
                id="country"
                required
                className='input-input'
                value={organizationData.country}
                onChange={(e)=>handleChange(e)}
            />
        </label>
          <button
              type="submit"
              >
              Créer
          </button>
      </form>
    </main>
  )
}

export default CreateEvent