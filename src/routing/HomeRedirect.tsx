import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home/UserHome.tsx";
import AdminHome from "../pages/Home/AdminHome/AdminHome.tsx";

const HomeRedirect = () => {
  const { user } = useAuth();

  if (user?.user_type === 'admin') {
    return <AdminHome />;
  }

  return <Home />;
};

export default HomeRedirect;