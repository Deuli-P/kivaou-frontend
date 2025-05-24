import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { UserProps } from '../utils/types';
interface AuthContextType {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  getLogin: (dataLogin:LoginData) => void;
  getLogout: () => void;
  loading : boolean;
}
interface LoginData {
  email: string;
  password: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);




  const getLogin = async (dataLogin:LoginData) => {
    try{
      const response = await fetch(`/server/api/v1/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(dataLogin)
      })
      const data = await response.json()

      if(data.status === 200){
        console.log('reussite')
        setUser(data.user); 
        toast.success(data.message)
        window.location.href = '/';
      }
      else{
        toast.error(data.message)
      }
    }
    catch(e: any){
      toast.error(e.message)
    }
  }

  const getLogout = async () => {
    try {
        const response = await fetch(`/server/api/v1/auth/logout`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            toast.success(data.message);
            setUser(null);
            window.location.href = '/';
        } else {
            toast.error(data.message);
        }
    } catch (e: any) {
        toast.error("Erreur serveur lors de la déconnexion");
    }
};

  const getSession = async () => {
    try{
      setLoading(true)
      const response = await fetch(`/server/api/v1/auth/check`,{
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
      else{
        setUser(null)
        return false
      }
    }
    catch(e: any){
      return false
    }
    finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    getSession()
  }, []);



  const values:AuthContextType ={
    user,
    setUser,
    getLogin,
    getLogout,
    loading
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