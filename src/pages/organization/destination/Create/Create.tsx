import React, { useState } from 'react'
import { useAuth } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';
import ScheduleInput from '../../../../components/Schedule/ScheduleInput';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Inputs/Input/Input';
const API_URL = import.meta.env.VITE_BACKEND_URL;
import './create.scss'
import Select from '../../../../components/Inputs/Select/Select';

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
    postale_code: 93100,
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
    postale_code: 0,
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

const optionsData = [
    { value: 'pub', label: 'Bar' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'fast-food', label: 'Fast Food' },
    { value: 'escape-game', label: 'Escape Game' },
    { value: 'amusement-park', label: 'Parc d\'attraction' },
    { value: 'entertenment', label: 'Loisirs' },
    { value: 'theater', label: 'Cinéma' }
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
            [name]: value.trim()
        })
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setDestinationData({
            ...destinationData,
            service_type: value
        });
    }; 

    const handleCancel = () => {
        window.history.back()
    };


    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try{
            const response = await fetch(`${API_URL}/api/destination/create?id=${user?.organization?.id}`, {
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
            console.log(response)
            if(response.status === 200){
                const data = await response.json()
                toast.success(data.message)
                setDestinationData(emptyDestinations)
                setSchedule(emptySchedule)
            }
            else{
                const data = await response.json()
                console.log('erreur de création de la destination', data)
                toast.error(data.message)
            }
        }
        catch(err){
            console.error('Error creating destination', err)
        }
    };

  return (
    <main>
        <h1>Ajouter une destination à votre organisation</h1>
        <p>Il faut ajouter des destinations pour pouvoir les utiliser pour créer des événements.</p>
        <form action='submit' onSubmit={handleSubmit} className='auth-form'>
            <section>
                <h2>Information</h2>
                <Input
                    name='name'
                    onChange={handleChange}
                    value={destinationData.name}
                    required={true}
                    label='Nom de la destination'
                    type='text'
                    placeholder='Nom de la destination'
                    ariaLabel="Nom de la destination"
                />
                <Select
                    options={optionsData}
                    onChange={handleSelect}
                    value={destinationData.service_type}
                    required={true}
                    label='Type de service'
                    placeholder='Type de service'
                    ariaLabel="Type de service de la destination"
                    name='service_type'
                />
                <Input
                    name='service_link'
                    onChange={handleChange}
                    value={destinationData.service_link}
                    label='Lien de réservation/commande'
                    type='text'
                    placeholder='Lien de réservation/commande'
                    ariaLabel="Lien de réservation/commande"
                />
                <Input
                    name='google_map'
                    onChange={handleChange}
                    value={destinationData.google_map}
                    label='Lien Google map'
                    type='text'
                    placeholder='Lien du lieu sur Google map'
                    ariaLabel="Lien du lieu sur Google map"
                />
                <Input
                    name='speciality'
                    onChange={handleChange}
                    value={destinationData.speciality}
                    label='Spécialité'
                    type='text'
                    placeholder='ex: Plongée, Surf, Libanais, Bar.'
                    ariaLabel="Ce que fait la destination"
                />
                <Input
                    name='phone'
                    onChange={handleChange}
                    value={destinationData.phone}
                    label='Téléphone'
                    type='text'
                    placeholder='+33 1 23 45 67 89'
                    ariaLabel="Numéro de téléphone de la destination"
                />
                <Input
                    name='website'
                    onChange={handleChange}
                    value={destinationData.website}
                    label='Site web'
                    type='text'
                    placeholder='https://...'
                    ariaLabel="Site web de la destination"
                />
                <Input
                    name='photo_path'
                    onChange={handleChange}
                    value={destinationData.photo_path}
                    label='Photo du lieu'
                    type='text'
                    placeholder='https://...'
                    ariaLabel="Photo ou logo de la destination"
                />
            </section>

            <section className='input-schedule-container'>
                <h2 >Horaires d'ouverture (optionnel)</h2>
                <p >
                    Saisissez les horaires sous forme libre : "8h-12h", "fermé", "10h", etc.
                </p>
                {schedule.map((item, index) => (
                    <ScheduleInput
                    key={index}
                    item={item}
                    index={index}
                    setSchedule={setSchedule}
                    schedule={schedule}
                    />
                ))}
            </section>
            <section>
                <h2>Adresse du lieu</h2>
                <Input
                    name="number"
                    type="number"
                    label="Numéro de la voie"
                    placeholder="ex : 123"
                    value={destinationData.number}
                    onChange={handleChange}
                    required
                    />

                    <Input
                    name="street"
                    label="Rue"
                    placeholder="ex : Rue de l'église"
                    value={destinationData.street}
                    onChange={handleChange}
                    required
                    />

                    <Input
                    name="city"
                    label="Ville"
                    placeholder="ex : Paris"
                    value={destinationData.city}
                    onChange={handleChange}
                    required
                    />
                    <Input
                    name="postal_code"
                    type="number"
                    label="Code postal"
                    placeholder="ex : 75000"
                    value={destinationData.postale_code}
                    onChange={handleChange}
                    required
                    />
                    <Input
                    name="country"
                    label="Pays"
                    placeholder="ex : France"
                    value={destinationData.country}
                    onChange={handleChange}
                    required
                    />
            </section>
            <div className="btn-container">
                <Button 
                    type='button'
                    label='Retour'
                    ariaLabel='Retour vers la page précédente'
                    version='secondary'
                    onClick={handleCancel}
                />
                <Button 
                    type='submit'
                    label='Créer la destination'
                    ariaLabel='Créer une nouvelle adresse'
                    version='primary'

                />
            </div>
        </form>
    </main>
  )
}

export default DestinationCreate