import { useState } from 'react';
import './styles/index.scss';
import InputWithLabel from './components/InputWithLabel';
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthContext';
import PresentationCard from './components/PresentationCard/PresentationCard';

function App() {
  

  return (
    <AuthProvider>
      <Header />
      <PresentationCard />
  </AuthProvider>
  )
}

export default App
