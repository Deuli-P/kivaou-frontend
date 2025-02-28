import { useState } from "react";
import { fetching } from "../utils/utils";


const LoginPage = () => {

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



    const response = fetching('localhost:3001/api/login', 'POST', {
      body: JSON.stringify(loginData)
    })
    console.log(response)
    if(response){
      console.log('ok')
    }

    
  };



  return (
    <>
    <div>
      <h1>Connexion</h1>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" >Email</label>
        <input type="email" id="email" name="email" required value={loginData.email} onChange={handleChangeValue}/>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" required value={loginData.password} onChange={handleChangeValue}/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
    </>
  )
}

export default LoginPage