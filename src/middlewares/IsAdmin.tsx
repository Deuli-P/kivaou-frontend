import { Navigate, Outlet } from "react-router-dom";


const IsAdmin = () => {

    const isAdmin = true

    return isAdmin ? <Outlet /> : <Navigate to="/auth/login" />;

};

export default IsAdmin