import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IniciarSesion from './pages/IniciarSesion';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import GlobalStyles from './styles/globalStyles';

const HomePage = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <div className="content">
        <Hero />
        <h1>Bienvenido a la Página de Inicio</h1>
        <ProductList />
      </div>
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
