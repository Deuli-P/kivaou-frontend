import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"
import './error.scss';

const Error = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  }

  console.log('Error page');
  return (
    <main>
      <h1>Une erreur est survenue</h1>
      <div className="error-container">
        <p>La page recherchée n'existe pas. Vous pouvez retourner à l'accueil en cliquant sur le bouton suivant</p>
        <Button
          label="Retourner à l'accueil"
          onClick={handleClick}
          version="tertiary"
          type="button"
          ariaLabel="Retourner à l'accueil"
        />
      </div>
    </main>
  )
}

export default Error