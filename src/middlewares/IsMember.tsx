import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const IsMember = () => {

    const { user } = useAuth();

    const isMember = user?.organization?.id || user?.user_type === "admin" ? true : false ;

    return isMember ? <Outlet /> : <Navigate to="/" />;

}

export default IsMember