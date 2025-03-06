import { Navigate, Outlet } from "react-router-dom";
const IsMember = () => {

    const isMember = true

    return isMember ? <Outlet /> : <Navigate to="/auth/login" />;

}

export default IsMember