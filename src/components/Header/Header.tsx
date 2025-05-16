import { useRef, useState } from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserCircle from "../User/UserThumbnail/UserThumbnail";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  const navRef = useRef<HTMLDivElement>(null);

  const handleCloseMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <div className="container">
        {/* Logo */}
        <NavLink to="/" className="header-logo">
          <span className="header-logo">KiVAOU</span>
        </NavLink>
        
        {/* Burger Menu uniquement en mobile */}
        <div
          className={`burger-container ${menuOpen ? "open" : ""}`}
          onClick={handleCloseMenu}
        >
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
          <span className={`burger-bar ${menuOpen ? "open" : ""}`} />
        </div>

        {/* Navigation Desktop*/}
        {user ? (
          <nav className="desktop-nav">
            {user?.organization?.id ? 
              (
                <>
                  <NavLink to="/orga/event/create" className="header-navlink">
                    Créer un événement
                  </NavLink>
                  <NavLink to={`/orga/${user.organization.id}`} className="header-navlink">
                    Mon organisation
                  </NavLink>
                </>
              ) 
            : 
              (
                <NavLink to="orga/create" className="header-navlink">
                  Créer une organisation
                </NavLink>
              )
            }
            <NavLink to="/profile" className="header-navlink header-profile">
                <UserCircle
                  user={user}
                  size="m"
                />
              Profile
            </NavLink>
          </nav>
        ) : (
          <nav className="desktop-nav">
            <NavLink to="/auth/login" className="header-navlink">
              Connexion
            </NavLink>
            <NavLink to="/auth/register" className="header-navlink">
              Inscription
            </NavLink>
          </nav>
        )}
      </div>

      {/* Navigation Mobile */}
      {user ? (
        <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} ref={navRef}>
          {user.organization.id ? 
              (
                <>
                  <NavLink to="/orga/event/create" className="header-navlink">
                    Créer un événement
                  </NavLink>
                  <NavLink to={`/orga/${user.organization.id}`} className="header-navlink">
                    Mon organisation
                  </NavLink>
                </>
              ) 
            : 
              (
                <NavLink to="orga/create" className="header-navlink">
                  Créer une organisation
                </NavLink>
              )
            }
          <NavLink to="/profile" className="header-navlink">
            Profil
          </NavLink>
        </nav>
      ) : (
        <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} ref={navRef}>
          <NavLink to="/auth/login" className="header-navlink">
            Connexion
          </NavLink>
          <NavLink to="/auth/register" className="header-navlink">
            Inscription
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
