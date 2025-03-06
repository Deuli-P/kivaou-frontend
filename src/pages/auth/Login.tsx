import { useState } from "react";
import { fetching } from "../../utils/utils";

const API_URL = import.meta.env.VITE_BACKEND_URL

const Login = () => {

  const [ loginData , setLoginData ] = useState({
    email: '',
    password: ''
  })


  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()



    const response = fetching(`${API_URL}/api/auth/login`, 'POST', {
      body: JSON.stringify(loginData)
    })
    console.log(response)
    if(response){
      console.log('ok')
    }

    
  };

  return (
    <>
    <div
      className="login-container"
    >
      <h1>Connexion</h1>
      <button
        onClick={async() => {
          await fetching(`${API_URL}/api/`,'GET', {})
        }}
      >
        Check liaison with backend
      </button>
      <div>
        <form 
          onSubmit={handleSubmit}
          className='login-form'
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
              value={loginData.email} 
              onChange={handleChangeValue}
              className="input-input"
              />
            </label>
          <label 
            htmlFor="password"
            className="input-label">
              Mot de passe
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              value={loginData.password} 
              onChange={handleChangeValue}
              className="input-input"
              />
          </label>
          <div className="login-no-account">
            <p>Pas de compte ?</p>
            <a href="/register">Inscrivez-vous</a>
          </div>
          <button 
            type="submit"
            className="btn btn-primary"
            >
            Se connecter
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login;