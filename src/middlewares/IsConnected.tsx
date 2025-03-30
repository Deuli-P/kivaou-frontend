import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IsConnected = () => {
    const { user, loading } = useAuth();
  
    if (loading) {
      return <div>Chargement...</div>; // Ou un spinner, ou rien
    }
  
    if (!user) {
      return <Navigate to='/auth/login' replace />;
    }
  
    return <Outlet />;
  };

export default IsConnected