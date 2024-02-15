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
  animation: fadeInUp 1s ease;

  @media screen and (max-width: 768px) {
    padding: 20px;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  animation: neon 1.5s ease infinite alternate;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #4caf50;
    bottom: -10px;
    left: 0;
    border-radius: 5px;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @keyframes neon {
    from {
      text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00;
    }
    to {
      text-shadow: 0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff, 0 0 55px #0ff, 0 0 75px #0ff;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
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
  display: ${(props) => (props.showCategories ? 'flex' : 'none')};
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
    height: 100%; 
    object-fit: cover; 
  }
`;

const CategoryTitle = styled.h2`
  color: #000; 
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8); 
`;

const CategoryDescription = styled.p`
  color: #000; 
`;

const HomePage = ({ cartItems, setCartItems }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState({
    AGSSorteo: false,
    MegaSorteo: false,
    PcGamer: false,
  });

  const handleToggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => ({
      ...prevSelected,
      [category]: !prevSelected[category],
    }));
  };

  return (
    <div className="App">
      <GlobalStyles />
      <Navbar />
      <ContentContainer>
        <Hero />
        <WelcomeContainer>
          <Title>Bienvenido a nuestra tienda en línea</Title>
          <Subtitle>Descubre una amplia selección de productos de alta calidad para gamers y entusiastas de la tecnología.</Subtitle>
          <ExploreButton onClick={handleToggleCategories}>
            {showCategories ? 'Ocultar Categorías' : 'Explorar'}
          </ExploreButton>
        </WelcomeContainer>
        <CategoryContainer showCategories={showCategories}>
          <CategoryBox onClick={() => handleCategoryClick('AGSSorteo')}>
            <CategoryTitle>Próximamente</CategoryTitle>
            <CategoryDescription>Participa en nuestro sorteo AGS y gana increíbles premios.</CategoryDescription>
            {selectedCategories.AGSSorteo && (
              <ImageContainer isSelected onClick={() => handleCategoryClick('AGSSorteo')}>
                <img src={AGSSorteoImage} alt="AGSSorteo" />
              </ImageContainer>
            )}
          </CategoryBox>
          <CategoryBox onClick={() => handleCategoryClick('MegaSorteo')}>
            <CategoryTitle>Próximamente</CategoryTitle>
            <CategoryDescription>Prepárate para el Mega Sorteo y gana grandes sorpresas.</CategoryDescription>
            {selectedCategories.MegaSorteo && (
              <ImageContainer isSelected onClick={() => handleCategoryClick('MegaSorteo')}>
                <img src={MegaSorteoImage} alt="MegaSorteo" />
              </ImageContainer>
            )}
          </CategoryBox>
          <CategoryBox onClick={() => handleCategoryClick('PcGamer')}>
            <CategoryTitle>Próximamente</CategoryTitle>
            <CategoryDescription>Explora la nueva línea de PC Gamer con las últimas tecnologías.</CategoryDescription>
            {selectedCategories.PcGamer && (
              <ImageContainer isSelected onClick={() => handleCategoryClick('PcGamer')}>
                <img src={PcGamerImage} alt="PcGamer" />
              </ImageContainer>
            )}
          </CategoryBox>
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
