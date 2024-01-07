import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import IniciarSesion from './pages/IniciarSesion';
import Productos from './pages/Productos';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Hero from './components/Hero';
import GlobalStyles from './styles/globalStyles';
import AGSSorteoImage from './images/AGSSorteo.jpg';
import MegaSorteoImage from './images/MegaSorteo.jpg';
import PcGamerImage from './images/PcGamer.jpg';

const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  box-sizing: border-box;

  @media screen and (max-width: 1200px) {
    padding: 15px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`;

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`;

const ExploreButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 40px;
  color: white;
`;

const CategoryBox = styled.div`
  flex: 0 0 calc(33.33% - 20px);
  text-align: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 10px 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    flex: 0 0 calc(50% - 20px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-top: 20px;
  height: ${(props) => (props.isSelected ? '300px' : '200px')};
  transition: height 0.3s ease;

  img {
    width: 100%;
    height: auto;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const ImageText = styled.p`
  font-size: 20px;
  margin-bottom: 15px;
  padding: 15px;
`;

const HomePage = ({ cartItems, setCartItems }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <ContentContainer>
        <Hero />
        <WelcomeContainer>
          <h1>Bienvenidos</h1>
          <p>Descubre las últimas tendencias y encuentra productos increíbles para la generación más avanzada.</p>
          <ExploreButton onClick={handleToggleCategories}>
            {showCategories ? 'Ocultar Categorías' : 'Explorar'}
          </ExploreButton>
        </WelcomeContainer>
        <CategoryContainer>
          {showCategories && (
            <>
              <CategoryBox onClick={() => handleCategoryClick('AGSSorteo')}>
                <h2>Próximamente</h2>
                <p>Participa en nuestro sorteo AGS y gana increíbles premios.</p>
                {selectedCategory === 'AGSSorteo' && (
                  <ImageContainer isSelected onClick={() => handleCategoryClick(null)}>
                    <img src={AGSSorteoImage} alt="AGSSorteo" />
                  </ImageContainer>
                )}
              </CategoryBox>
              <CategoryBox onClick={() => handleCategoryClick('MegaSorteo')}>
                <h2>Próximamente</h2>
                <p>Prepárate para el Mega Sorteo y gana grandes sorpresas.</p>
                {selectedCategory === 'MegaSorteo' && (
                  <ImageContainer isSelected onClick={() => handleCategoryClick(null)}>
                    <img src={MegaSorteoImage} alt="MegaSorteo" />
                  </ImageContainer>
                )}
              </CategoryBox>
              <CategoryBox onClick={() => handleCategoryClick('PcGamer')}>
                <h2>Próximamente</h2>
                <p>Explora la nueva línea de PC Gamer con las últimas tecnologías.</p>
                {selectedCategory === 'PcGamer' && (
                  <ImageContainer isSelected onClick={() => handleCategoryClick(null)}>
                    <img src={PcGamerImage} alt="PcGamer" />
                  </ImageContainer>
                )}
              </CategoryBox>
            </>
          )}
        </CategoryContainer>
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
