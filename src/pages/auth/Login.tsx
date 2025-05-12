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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try{    
      getLogin(loginData);
    }catch(err){
      toast.error("Erreur lors de la connexion")
    }
  };

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user, navigate]);
  

  return (
    <main>
      <h2>Connexion</h2>
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
              placeholder="email@email.io"
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
              placeholder="Votre mot de passe"
              required 
              value={loginData.password} 
              onChange={handleChangeValue}
              className="input-input"
              />
          </label>
          <div className="auth-redirection-link">
            <p>Pas de compte ?</p>
            <a href="/auth/register" className="deep_link">Inscrivez-vous</a>
          </div>
          <button 
            type="submit"
            className="btn primary"
            >
            Se connecter
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login;