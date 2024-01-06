import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IniciarSesion from './pages/IniciarSesion';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import GlobalStyles from './styles/globalStyles';

const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px; 
  box-sizing: border-box;
`;

const HomePage = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <ContentContainer>
        <Hero />
        <h1>Bienvenido</h1>
        <ProductList />
      </ContentContainer>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} />
      </Routes>
    </Router>
  );
};

export default App;
