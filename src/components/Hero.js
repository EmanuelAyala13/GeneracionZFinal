import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../images/logo.png';

const neonFont = "'Roboto', sans-serif";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 20px;
  margin: 20px;
  font-family: ${neonFont};
`;

const TextContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
`;

const HeroText = styled.h1`
  font-size: 3rem;
  margin: 0;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  text-shadow: -2px -2px 2px rgba(0, 0, 0, 0.8); 

  &:hover {
    color: #0ff; 
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: red;
  margin: 10px 0;
  font-family: ${neonFont};
  animation: neonEffect 0.5s ease-in-out infinite alternate;

  @keyframes neonEffect {
    from {
      text-shadow: 0 0 5px #00ffbb, 0 0 10px #00ffbb, 0 0 15px #00ffbb, 0 0 20px #00ffbb, 0 0 25px #00ffbb, 0 0 30px #00ffbb, 0 0 35px #00ffbb;
    }
    to {
      text-shadow: none;
    }
  }
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LogoContainer = styled.div`
  animation: ${rotateAnimation} 4s linear infinite;
`;

const Hero = () => {
  const [rotation, setRotation] = useState(0);
  const [textColor, setTextColor] = useState('#fff'); 

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

  const handleTextColorChange = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16); 
    setTextColor(randomColor);
  };

  return (
    <HeroContainer>
      <TextContainer>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" style={{ transform: `rotate(${rotation}deg)` }} />
        </LogoContainer>
        <HeroText style={{ color: textColor }} onClick={handleTextColorChange}>
          Bienvenido a nuestra tienda en línea
        </HeroText>
        <Subtitle>
          Descubre una amplia selección de productos de alta calidad para gamers y entusiastas de la tecnología.
        </Subtitle>
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;
