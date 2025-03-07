import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_BACKEND_URL
interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  getLogin: (arg0:LoginData) => void;
  getLogout: () => void;
}
interface LoginData {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const getLogin = async (dataLogin:LoginData) => {
    try{
      const response = await fetch(`${API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataLogin)
      })
      const data = await response.json()

      if(data.success){
        toast.success(data.message)
        setUser(data.user)
        return true
      }
      else{
        toast.error(data.message)
        return false
      }
    }
    catch(e: any){
      toast.error(e.message)
    }
  }

  const getLogout = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/logout`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setUser(null);
        } else {
            toast.error(data.message);
        }
    } catch (e: any) {
        toast.error("Erreur serveur lors de la déconnexion");
    }
};

  const checkIfAuth = async () => {
    try{
      const response = await fetch(`${API_URL}/api/auth/check`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const data = await response.json()
      if(data.success){
        setUser(data.user)
        return true
      }
    }
    catch(e: any){
      toast.error(e.message)
      return false
    }
  }

  useEffect(() => {
    checkIfAuth()
  },[])


  const values:AuthContextType ={
    user,
    setUser,
    getLogin,
    getLogout
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };