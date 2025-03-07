import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const IsConnected = () => {
   
    const { user } = useAuth();

    if(!user){
        return <Navigate to='/auth/login' replace />
    }


    return <Outlet />

}

export default IsConnected