import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const IsAdmin = () => {

    const { user } = useAuth();

    const isAdmin = user?.user_type === 'admin';

    return isAdmin ? <Outlet /> : <Navigate to="/auth/login"/>;

};

export default IsAdmin