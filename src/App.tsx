import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routing/router';
import './styles/index.scss';
import { ToastContainer } from 'react-toastify';

function App() {


  

  return (
    <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer/>
      </AuthProvider>
  )
}

export default App
