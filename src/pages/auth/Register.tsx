import { useState, useEffect } from "react"
import { fetching } from "../../utils/utils"
const API_URL = import.meta.env.VITE_BACKEND_URL
const Register = () => {

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    address: '',
    phone: '',
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

      const response = await fetching(`${API_URL}/api/auth/register`, 'POST', {
        body: JSON.stringify(registerData)
      })
      console.log(response)
      if(response){
        console.log('ok')
      }
    }
    catch(e){
      throw new Error("Erreur d'inscription : ",e)
    }
  }


  return (
    <main className="auth-container">
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
          htmlFor="address"
          className="input-label"
        >
          Adresse
          <input
            type="text"
            id="address"
            name="address"
            required
            value={registerData.address}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="phone"
          className="input-label"
        >
          Téléphone
          <input
            type="text"
            id="phone"
            name="phone"
            required
            value={registerData.phone}
            onChange={(e)=>handleChangeValue(e)}
            className="input-input"
          />
        </label>
        <label
          htmlFor="birthdate"
          className="input-label"
        >
          Date de naissance
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            required
            value={registerData.birthdate}
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