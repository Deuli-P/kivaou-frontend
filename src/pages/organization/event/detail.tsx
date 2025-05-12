import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_BACKEND_URL;


const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [loading, setLoading] = useState(false)
  const [ eventDetails, setEventDetails ] = useState({})
  const { user } = useAuth()

  const fetchEventDetails = async (eventId) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/event/${eventId}?id=${user?.organization?.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (response.status === 200) {
        const data = await response.json()
        setEventDetails(data.result)
        setLoading(false)
      }
      else{
        const data = await response.json()
        setLoading(false)
        toast.error(data.message)
      }
    }
    catch (error) {
      console.error('Error fetching event details:', error)
      setLoading(false)
    }
  };

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/api/event/${eventId}?id=${user?.organization?.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      if (response.status === 204) {
        setEventDetails((prev)=> ({
          ...prev,
          status : 'cancelled'
        }))
      }
      else{
        const data = await response.json()
        toast.error(data.message)
      }
    }
    catch (error) {
      console.error('Error deleting event:', error)
    }
  }

    useEffect(() => {
      if(eventId)
      fetchEventDetails(eventId)
    }, [eventId])


  return (
    <main>
      { loading ? (
        <div className="">
          <h3 className="">Chargement...</h3>
        </div>
      )
      :
      (
        <>
          <div className="">
            Eventdetail :ID
          </div>
        </>
      )
      }
    </main>
  )
}

export default EventDetail;