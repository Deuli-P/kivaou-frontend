import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserCircle from "../User/UserThumbnail/UserThumbnail";

const Header = () => {
  const { user } = useAuth();

  const isAdmin = user?.user_type === "admin";

  return (
    <header>
      <div className="container">
        <NavLink to={user ? "/home" : "/"} className="header-logo">
          <span className="header-logo">KiVAOU</span>
        </NavLink>

        {user ? (
          <>
            <nav className="desktop-nav">
              {isAdmin ? (
                <NavLink to="/profile" className="header-navlink header-profile">
                  <UserCircle user={user} size="m" />
                  Profile
                </NavLink>
              ) : (
                <>
                  {user?.organization?.id ? (
                    <>
                      <NavLink to="/orga/event/create" className="header-navlink">
                        Créer un événement
                      </NavLink>
                      <NavLink
                        to={`/orga/${user.organization.id}`}
                        className="header-navlink"
                      >
                        Mon organisation
                      </NavLink>
                    </>
                  ) : (
                    <NavLink to="/orga/create" className="header-navlink">
                      Créer une organisation
                    </NavLink>
                  )}
                  <NavLink to="/profile" className="header-navlink header-profile">
                    <UserCircle user={user} size="m" />
                    Profile
                  </NavLink>
                </>
              )}
            </nav>
            <NavLink to="/profile" className="header-profile-mobile" aria-label="Mon profil">
              <UserCircle user={user} size="m" />
            </NavLink>
          </>
        ) : (
          <nav className="guest-nav">
            <NavLink to="/auth/login" className="header-navlink">
              Connexion
            </NavLink>
            <NavLink to="/auth/register" className="header-navlink">
              Inscription
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
