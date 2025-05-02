import React, { useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
const env = import.meta.env.VITE_ENV_MODE;

const fakeDestinations = {
    name: 'Peper Grill',
    service_type: 'restaurant',
    service_link: '',
    google_map: 'https://g.co/kgs/DjjEM1S',
    speciality: 'Fast-food',
    phone: '01 23 45 67 89',
    website: 'https://pepper-grill.com/',
    photo_path: 'https://pepper-grill.com/wp-content/uploads/2023/06/pepper_grill_logo.png.webp',
    number: 6,
    street: 'Boulevard du Mont d\'Est',
    postal_code: 93100,
    city: 'Noisy-le-Grand',
    country: 'France'
};

const emptyDestinations = {
    name: '',
    service_type: 'restaurant',
    service_link: '',
    google_map: '',
    speciality: '',
    phone: '',
    website: '',
    photo_path: '',
    number: 0,
    street: '',
    postal_code: 0,
    city: '',
    country: '',
};

const fakeSchedule = [
    { day: 'Lundi', morning: '11h', afternoon: '23h' },
    { day: 'Mardi', morning: '11h', afternoon: '23h' },
    { day: 'Mercredi', morning: '8h-12h', afternoon: '16h-18h' },
    { day: 'Jeudi', morning: '11h', afternoon: '23h' },
    { day: 'Vendredi', morning: '11h', afternoon: '23h' },
    { day: 'Samedi', morning: 'close', afternoon: 'close' },
    { day: 'Dimanche', morning: 'close', afternoon: 'close' }
];

const emptySchedule = [
    { day: 'Lundi', morning: '', afternoon: '' },
    { day: 'Mardi', morning: '', afternoon: '' },
    { day: 'Mercredi', morning: '', afternoon: '' },
    { day: 'Jeudi', morning: '', afternoon: '' },
    { day: 'Vendredi', morning: '', afternoon: '' },
    { day: 'Samedi', morning: '', afternoon: '' },
    { day: 'Dimanche', morning: '', afternoon: '' }
];

const DestinationCreate = () => {

    const { user } = useAuth();

    const [ destinationData, setDestinationData ] = useState(
        env === 'DEV' ? fakeDestinations : emptyDestinations
      );
      
      const [schedule, setSchedule] = useState(
        env === 'DEV' ? fakeSchedule : emptySchedule
      );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setDestinationData({
            ...destinationData,
            [name]: value
        })
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setDestinationData({
            ...destinationData,
            service_type: value
        });
    }; 


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/destination/create?id=${user?.organization?.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    ...destinationData,
                    schedule
                })
            })
            const data = await response.json()
            if(data.destination.status === 204){
                toast.success(data.message)
                setDestinationData(emptyDestinations)
                setSchedule(emptySchedule)
            }
            else{
                console.error('Error creating destination', data)
            }
        }
        catch(err){
            console.error('Error creating destination', err)
        }
    };

  return (
    <main>
        <h2>Ajouter une destination à votre organisation</h2>
        <p>Il faut ajouter des destinations pour pouvoir les utiliser pour créer des événements.</p>
        <form action='submit' onSubmit={handleSubmit} className='auth-form'>
            <div>
                <span>Information</span>
            
            <label htmlFor="name" className='input-label'>
                Nom de la destination
                <input 
                    className='input-input' 
                    type="text" 
                    name="name" 
                    id="name"
                    required
                    value={destinationData.name}
                    onChange={(e)=>handleChange(e)}
                    placeholder='Nom de la destination' 
                />
            </label>
            <label htmlFor="name" className='input-label'>
                Type de service
                <select 
                    name="service_type" 
                    id="service_type"
                    className='input-input'
                    onChange={(e)=>handleSelect(e)}
                    value={destinationData.service_type}
                >
                    <option className='select-option' value="pub">Bar</option>
                    <option className='select-option' value="restaurant">Restaurant</option>
                    <option className='select-option' value="fast-food">Fast Food</option>
                    <option className='select-option' value="escape-game">Escape Game</option>
                    <option className='select-option' value="amusement-park">Parc d'attraction</option>
                    <option className='select-option' value="entertenment">Loisirs</option>
                    <option className='select-option' value="theater">Cinéma</option>
                </select>
            </label>
            <label htmlFor="service_link" className='input-label'>
                Lien de réservation/commande
                <input 
                    className='input-input' 
                    type="text" 
                    name="service_link" 
                    id="service_link"
                    placeholder='Lien uber eats, site de réservation, etc.' 
                    value={destinationData.service_link}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <label htmlFor="google_map" className='input-label'>
                Lien Google map
                <input 
                    className='input-input' 
                    type="text" 
                    name="google_map" 
                    id="google_map"
                    placeholder='Lien Google map' 
                    value={destinationData.google_map}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <label htmlFor="speciality" className='input-label'>
                Spécialité
                <input 
                    className='input-input' 
                    type="text" 
                    name="speciality" 
                    id="speciality"
                    placeholder='ex: Plongée, Surf, Libanais, Bar.' 
                    value={destinationData.speciality}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <label htmlFor="phone" className='input-label'>
                Téléphone
                <input 
                    className='input-input' 
                    type="text" 
                    name="speciality" 
                    id="phone"
                    placeholder='Téléphone' 
                    value={destinationData.phone}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <label htmlFor="website" className='input-label'>
                Site web
                <input 
                    className='input-input' 
                    type="text" 
                    name="website" 
                    id="website"
                    placeholder='Site web' 
                    value={destinationData.website}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <label htmlFor="photo_path" className='input-label'>
                Photo
                <input 
                    className='input-input' 
                    type="text" 
                    name="photo_path" 
                    id="photo_path"
                    placeholder='Lien de la photo' 
                    value={destinationData.photo_path}
                    onChange={(e)=>handleChange(e)}
                />
            </label>
            <div className='input-schedule'>
                <span className='input-schedule-title'>Horaires d'ouverture (optionnel)</span>
                <p className="input-schedule-description">
                    Saisissez les horaires sous forme libre : "8h-12h", "fermé", "10h", etc.
                </p>
                {schedule.map((item, index) => (
                    <div key={item.day} className="input-schedule-day-row">
                    <label className="input-schedule-day-label">{item.day}</label>
                    <div className="input-schedule-day-inputs-container">
                        <input
                        type="text"
                        className="input-input"
                        placeholder="Matin (ex : 8h-12h ou fermé)"
                        value={item.morning}
                        onChange={(e) => {
                            const newSchedule = [...schedule];
                            newSchedule[index].morning = e.target.value;
                            setSchedule(newSchedule);
                        }}
                        />
                        <input
                        type="text"
                        className="input-input"
                        placeholder="Après-midi (ex : 14h-18h ou fermé)"
                        value={item.afternoon}
                        onChange={(e) => {
                            const newSchedule = [...schedule];
                            newSchedule[index].afternoon = e.target.value;
                            setSchedule(newSchedule);
                        }}
                        />
                    </div>
                    </div>
                ))}
                </div>
            </div>
            <div>
                <span>Adresse</span>
                <label 
                    className="input-label"
                    htmlFor="number"
                >
                Numéro de la voie
                    <input 
                        type="number" 
                        placeholder="ex : 123" 
                        name='number'
                        id="number"
                        required
                        className='input-input'
                        value={destinationData.number}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
                <label 
                    className="input-label"
                    htmlFor="street"
                >
                    Rue
                    <input 
                        type="text" 
                        placeholder="ex : Rue de l'église" 
                        name='street'
                        id="street"
                        required
                        className='input-input'
                        value={destinationData.street}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
                <label 
                    className="input-label"
                    htmlFor="city"
                >
                    Ville
                    <input 
                        type="text" 
                        placeholder="ex : 123" 
                        name='city'
                        id="city"
                        required
                        className='input-input'
                        value={destinationData.city}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
                <label 
                    className="input-label"
                    htmlFor="postal_code"
                >
                    Code postale
                    <input 
                        type="number" 
                        placeholder="ex : 123" 
                        name='postal_code'
                        id="postal_code"
                        required
                        className='input-input'
                        value={destinationData.postal_code}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
                <label 
                    className="input-label"
                    htmlFor="country"
                >
                Pays
                    <input 
                        type="text" 
                        placeholder="ex : 123" 
                        name='country'
                        id="country"
                        required
                        className='input-input'
                        value={destinationData.country}
                        onChange={(e)=>handleChange(e)}
                    />
                </label>
            </div>
            <div className="btn_container">
                <button 
                    className='btn'
                    onClick={() => window.history.back()}
                >
                    Retour
                </button>
                <button 
                    type='submit'
                    className='btn-primary'
                >
                    Créer la destination
                </button>
            </div>
        </form>
    </main>
  )
}

export default DestinationCreate