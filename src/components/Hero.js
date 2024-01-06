import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 20px; /* Ajusté el padding */
  margin: 20px;
`;

const TextContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 80px; 
  height: auto;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
`;

const HeroText = styled.h1`
  font-size: 2.5rem; 
  color: #333;
  margin: 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out forwards;
`;

const Subtitle = styled.p`
  font-size: 1rem; 
  color: #666;
  max-width: 300px; 
  margin: 10px 0; 
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 1s ease-out 0.3s forwards;
`;

const fadeInUp = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Hero = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
      setRotation(angle);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <style>{fadeInUp}</style>
      <HeroContainer>
        <TextContainer>
          <LogoImage src={logo} alt="Logo" style={{ transform: `rotate(${rotation}deg)` }} />
          <HeroText>Bienvenido a nuestra tienda en línea</HeroText>
          <Subtitle>Descubre una amplia selección de productos de alta calidad para gamers y entusiastas de la tecnología.</Subtitle>
        </TextContainer>
      </HeroContainer>
    </>
  );
};

export default Hero;
