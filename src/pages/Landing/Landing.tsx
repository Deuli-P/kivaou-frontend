import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import './landing.scss';

const features = [
  {
    title: 'Créez vos événements',
    description: "Ajoutez un lieu, une date et invitez votre communauté à participer en quelques clics."
  },
  {
    title: 'Rejoignez une organisation',
    description: "Retrouvez les sorties de votre communauté et inscrivez-vous en un instant."
  },
  {
    title: 'Gérez votre communauté',
    description: "Ajoutez des membres, suivez les participations et gardez le contrôle sur vos événements."
  }
];

const Landing = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <main className="landing-page">
      <section className="landing-hero">
        <h1>KiVaOu</h1>
        <p className="landing-subtitle">
          Organisez, rejoignez et vivez vos sorties entre amis, en famille ou au sein de votre communauté.
        </p>
        <div className="btn-container">
          <Button
            version="primary"
            label="Créer un compte"
            ariaLabel="Créer un compte KiVaOu"
            onClick={() => navigate('/auth/register')}
          />
          <Button
            version="secondary"
            label="Se connecter"
            ariaLabel="Se connecter à KiVaOu"
            onClick={() => navigate('/auth/login')}
          />
        </div>
      </section>
      <section className="landing-features">
        {features.map((feature) => (
          <article key={feature.title} className="landing-feature-card card">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Landing;
