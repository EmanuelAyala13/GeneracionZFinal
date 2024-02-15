import React from 'react';
import styled from 'styled-components';

const marvelFont = "'Bangers', cursive";

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: 20px;
  margin: 20px;
  font-family: ${marvelFont}; 

  @media screen and (max-width: 756px) {
    height: auto;
  }
`;

const TextContainer = styled.div`
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroText = styled.h1`
  font-size: 4rem; 
  margin: 0;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease; 
  text-shadow: -2px -2px 2px rgba(0, 0, 0, 0.8); 
  background: none; 

  &:hover {
    color: #0ff; 
    transform: scale(1.1); 
  }

  @media screen and (max-width: 756px) {
    font-size: 3rem;
  }
  
  @media screen and (max-width: 320px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 2rem; 
  margin: 10px 0;
  font-family: ${marvelFont}; 
  color: #fff;
  background-color: black;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); 
  transition: color 0.3s ease; 

  @media screen and (max-width: 756px) {
    font-size: 1.5rem;
  }
  
  @media screen and (max-width: 320px) {
    font-size: 1rem;
  }
`;

const Hero = () => {
  const textColor = '#fff'; 

  return (
    <HeroContainer>
      <TextContainer>
        <HeroText style={{ color: textColor }}>
          Bienvenidos
        </HeroText>
        <Subtitle active={true}>
          Descubre una amplia selección de productos de alta calidad para gamers y entusiastas de la tecnología.
        </Subtitle>
      </TextContainer>
    </HeroContainer>
  );
};

export default Hero;
