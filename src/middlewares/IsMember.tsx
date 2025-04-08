import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const IsMember = () => {

    const { user } = useAuth();

    const isMember = user?.organization.id ? true : false;

    return isMember ? <Outlet /> : <Navigate to="/auth/login" />;

}

export default IsMember