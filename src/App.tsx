import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { router } from './routing/router';
import { ToastContainer } from 'react-toastify';
import './assets/styles/index.scss';

function App() {


  

  return (
    <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position='bottom-right'
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
        />
      </AuthProvider>
  )
}

export default App
