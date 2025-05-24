import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { toast } from "react-toastify"
import { regexEmail, regexPassword } from "../../../utils/utils"
import Button from "../../../components/Button/Button"
import Input from "../../../components/Inputs/Input/Input"
import './../auth.scss';

const Register = () => {

  const { user, setUser } = useAuth();
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    email: 'john@doe.com',
    password: 'Papillons28*',
    firstname: 'John',
    lastname: 'Die',
    photo_path: 'https://randomuser.me/api/portraits/men/70.jpg'
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

      // Validation des données
      
      if(!regexEmail.test(registerData.email)){
        toast.error("L'email n'est pas valide")
        return
      }


      if(!regexPassword.test(registerData.password )|| registerData.password.length < 12){
        toast.error("Le mot de passe doit contenir au moins 12 caractères, une majuscule, une minuscule et un chiffre")
        return
      };

      if (registerData.password.length > 200) {
        toast.error("Le mot de passe ne doit pas dépasser 200 caractères")
        return
      };

      if(registerData.firstname.length < 2 || registerData.lastname.length < 2){
        toast.error("Le prénom et le nom doivent contenir au moins 2 caractères")
        return
      };


      const response = await fetch(`/server/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(registerData)
      })
      const data = await response.json()
      if(data.status === 200){
        setUser(data.user)
        toast.success(data.message)
        navigate('/')
      }
      else{
        toast.error(data.message)
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
        <Input
          name='email'
          type='email'
          label='Email'
          placeholder="email@email.io"
          required={true}
          value={registerData.email}
          onChange={handleChangeValue}
          ariaLabel="Email de l'utilisateur"
        />
        <div className="password-container">

        <Input
          name='password'
          type='password'
          label='Mot de passe'
          placeholder="Mot de passe sécurisé"
          required={true}
          value={registerData.password}
          onChange={handleChangeValue}
          ariaLabel="Mot de passe de l'utilisateur comprenant au moins 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
          />
          <p>Votre mot de passe doit contenir au minimum 12 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial !</p>
          </div>
        <Input
          name="firstname"
          label='Prénom'
          type="text"
          placeholder="Jeff"
          required={true}
          value={registerData.firstname}
          onChange={(e)=>handleChangeValue(e)}
          ariaLabel="Prénom de l'utilisateur"
        />
        <Input
          name="lastname"
          label='Nom'
          type="text"
          placeholder="Doe"
          required={true}
          value={registerData.lastname}
          onChange={(e)=>handleChangeValue(e)}
          ariaLabel="Nom de l'utilisateur"
        />
        <Input
          name="photo_path"
          label='https://...'
          type="text"
          required={true}
          value={registerData.photo_path}
          onChange={(e)=>handleChangeValue(e)}
          ariaLabel="URL de la photo de profil de l'utilisateur"
        />
        <div className="auth-redirection-link">
          <p>Déja inscrit ? </p>
          <a href="/auth/login">Connectez-vous</a>
        </div>
        <Button
            type="submit"
            version="primary"
            label="S'inscrire"
            ariaLabel="S'inscrire à l'application"
          />
      </form>
    </main>
  )
}

export default Register