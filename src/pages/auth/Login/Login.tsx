import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Inputs/Input/Input";
import './../auth.scss';

const Login = () => {

  const { getLogin, user } = useAuth();

  const navigate = useNavigate();

  const [ loginData , setLoginData ] = useState({
    email: 'pierre@deliverycar.fr',
    password: 'Devliverycar28*'
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
      <h1>Connexion</h1>
      <div>
        <form 
          onSubmit={handleSubmit}
          className='auth-form'
          >
            <Input
              name='email'
              onChange={handleChangeValue}
              value={loginData.email}
              required={true}
              label='Email'
              type='email'
              ariaLabel='Entrez votre email'
            />
            <Input
              name='password'
              onChange={handleChangeValue}
              value={loginData.password}
              required={true} 
              label='Mot de passe'
              type='password'
              ariaLabel='Entrez votre mot de passe'
            />
          <div className="auth-redirection-link">
            <p>Pas de compte ?</p>
            <a href="/auth/register" className="deep_link">Inscrivez-vous</a>
          </div>
          <Button
            type="submit"
            version="primary"
            label="Se connecter"
            ariaLabel="Se connecter à l'application"
            disabled={!loginData.email || !loginData.password ? true : false}
          />
            
        </form>
      </div>
    </main>
  )
}

export default Login;