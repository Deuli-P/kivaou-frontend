import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from '../../context/AuthContext';
import {  useNavigate } from "react-router-dom";


const Login = () => {

  const { getLogin, user } = useAuth();

  const navigate = useNavigate();

  const [ loginData , setLoginData ] = useState({
    email: 'admin@admin.io',
    password: 'password'
  })
 

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{    
      const responses =  await getLogin(loginData)
      console.log('responses',responses)
      if(responses){
          navigate('/')
      }
    }catch(err){
      console.log(err)
      toast.error("Erreur lors de la connexion")
    }
  };

  useEffect(() => {
    if(user){
      navigate('/')
    }
  
  }, []);

  return (
    <main>
      <h1>Connexion</h1>
      <div>
        <form 
          onSubmit={handleSubmit}
          className='auth-form'
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
          <div className="auth-redirection-link">
            <p>Pas de compte ?</p>
            <a href="/auth/register">Inscrivez-vous</a>
          </div>
          <button 
            type="submit"
            className="btn btn-primary"
            >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login;