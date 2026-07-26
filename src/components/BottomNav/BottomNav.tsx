import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './BottomNav.scss';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
};

const HomeIcon = () => (
  <svg {...iconProps}>
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" />
  </svg>
);

const PlusIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

const OrganizationIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
  </svg>
);

const ProfileIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="8" r="3.2" />
    <path d="M4.5 20c1.4-3.6 4.2-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </svg>
);

const BottomNav = () => {
  const { user } = useAuth();

  if (!user) return null;

  const isAdmin = user.user_type === 'admin';

  const items = isAdmin
    ? [
        { to: '/', label: 'Accueil', icon: <HomeIcon />, end: true },
        { to: '/profile', label: 'Profil', icon: <ProfileIcon /> }
      ]
    : user.organization?.id
    ? [
        { to: '/', label: 'Accueil', icon: <HomeIcon />, end: true },
        { to: '/orga/event/create', label: 'Créer', icon: <PlusIcon /> },
        { to: `/orga/${user.organization.id}`, label: 'Organisation', icon: <OrganizationIcon /> },
        { to: '/profile', label: 'Profil', icon: <ProfileIcon /> }
      ]
    : [
        { to: '/', label: 'Accueil', icon: <HomeIcon />, end: true },
        { to: '/orga/create', label: 'Créer', icon: <PlusIcon /> },
        { to: '/profile', label: 'Profil', icon: <ProfileIcon /> }
      ];

  return (
    <nav className="bottom-nav" aria-label="Navigation principale">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
