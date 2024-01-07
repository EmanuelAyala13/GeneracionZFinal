import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import './Nosotros.css';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 60px;
  margin-bottom: 30px;
  color: #333;
  font-size: 2.5em;
`;

const Paragraph = styled.p`
  margin-bottom: 20px;
  color: #555;
  font-size: 1.2em;
  line-height: 1.6;
`;

const EmailButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Nosotros = () => {
  const handleEmailButtonClick = () => {
    window.location.href = "mailto:24siemprels@gmail.com?subject=Consulta";
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Title>¿Quiénes Somos?</Title>
        <Paragraph>
          En <strong>Generación Z</strong>, nos dedicamos a brindar soluciones innovadoras para mejorar tu experiencia digital. 
          Somos más que una tienda; somos tu compañero en el viaje de sumergirte por completo en tus juegos favoritos, el mundo del streaming y la creación de contenido audiovisual excepcional.
        </Paragraph>
        <Paragraph>
          Nuestra misión es ofrecerte no solo productos, sino también asesoramiento experto y soluciones integrales que transformen la forma en que juegas, compartes y disfrutas del mundo digital.
        </Paragraph>
        <EmailButton onClick={handleEmailButtonClick}>Contactar por Correo</EmailButton>
      </Container>
    </div>
  );
};

export default Nosotros;
