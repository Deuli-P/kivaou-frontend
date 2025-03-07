import { useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getLogout} = useAuth();

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
            <li><NavLink to='/event/create'>Créer un évenement</NavLink></li>
            <li><NavLink to='/event'>Mes événements</NavLink></li>
            <li><NavLink to='/organizations'>Mon groupe</NavLink></li>
            <li><NavLink to='/profile'>Profil</NavLink></li>
            <li><div onClick={getLogout}>Déconnexion</div></li>
          </ul>
        </nav>
    </header>
  );
};

export default Header;
