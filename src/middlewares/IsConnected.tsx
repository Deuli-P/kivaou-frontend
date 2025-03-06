import { Navigate, Outlet } from "react-router-dom";

const IsConnected = () => {
    const isConnected = true

    return isConnected ? <Outlet /> : <Navigate to="/auth/login" />;

}

export default IsConnected