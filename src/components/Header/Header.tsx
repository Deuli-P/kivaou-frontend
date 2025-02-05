import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <div className="logo">MyLogo</div>

        {/* Burger */}
        <div className={`burger-btn ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Navigation */}
        <nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
          <ul>
            <li><div>Tableau de bord</div></li>
            <li><div>Créer un évenement</div></li>
            <li><div >Profil</div></li>
            <li><div >Déconnexion</div></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
