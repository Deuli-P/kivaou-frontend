import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { toast } from "react-toastify"
const API_URL = import.meta.env.VITE_BACKEND_URL
const Register = () => {

  const { user, setUser } = useAuth();
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    email: 'jeff@field.com ',
    password: 'papillon',
    firstname: 'Jeff',
    lastname: 'Field',
    photo_path: 'https://randomuser.me/api/portraits/men/65.jpg'
  })

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try{

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(registerData)
      })
      if(response){
        const data = await response.json()
        console.log('data',data)
        if(data.user){
          setUser(data.user)
          toast.success("Inscription réussie")
          if(user){
            navigate('/')
          }
        }
        else{
          toast.error(data.message)
        }
      }
    }
    catch(e: any){
      throw new Error(`Erreur d'inscription : ${e.message}`);
    }
  }

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, []);

  return (
    <main>
      <h1>Inscription</h1>
      <form
        className='auth-form'
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="input-label"
        >
          Email
          <input
            type="email"
            id="email"
            name="email"
            required
            value={registerData.email}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="password"
          className="input-label"
        >
          Mot de passe
          <input
            type="password"
            id="password"
            name="password"
            required
            value={registerData.password}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="firstname"
          className="input-label"
        >
          Prénom
          <input
            type="text"
            id="firstname"
            name="firstname"
            required
            value={registerData.firstname}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="lastname"
          className="input-label"
        >
          Nom
          <input
            type="text"
            id="lastname"
            name="lastname"
            required
            value={registerData.lastname}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="photo_path"
          className="input-label"
        >
          Url de la photo
          <input
            type="text"
            id="photo_path"
            name="photo_path"
            required
            value={registerData.photo_path}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>

        <div className="auth-redirection-link">
          <p>Déja inscrit ? </p>
          <a href="/auth/login">Connectez-vous</a>
        </div>
        <button>
          S'inscrire
        </button>
      </form>
    </main>
  )
}

export default Register