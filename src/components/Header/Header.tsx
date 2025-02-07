import { useState } from "react";
import "./Header.scss";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        {/* Logo */}
        <div className="logo">MyLogo</div>

        {/* Burger */}
        <div 
          className={`burger-container ${menuOpen ? "open" : null}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span 
            className={`burger-bar ${menuOpen ? "open" : null}`}
            />
          <span 
            className={`burger-bar ${menuOpen ? "open" : null}`}
            />
          <span 
            className={`burger-bar ${menuOpen ? "open" : null}`}
            />
        </div>
      </div>
        {/* Navigation */}
        <nav className={`${menuOpen ? "open" : null}`}>
          <ul>
            <li><div>Créer un évenement</div></li>
            <li><div>Mes événements</div></li>
            <li><div>Mon groupe</div></li>
            <li><div >Profil</div></li>
            <li><div >Déconnexion</div></li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
