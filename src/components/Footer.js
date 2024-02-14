import React from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub } from 'react-icons/fa';

const StyledFooter = styled.footer`
  background-color: #ffcc00;
  color: #333;
  padding: 10px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px; /* Ajustamos el espacio entre elementos */
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.div`
  text-align: left;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px; 
`;

const CommonButton = styled.button`
  background-color: #ff3300;
  color: #fff;
  padding: 6px 10px; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000;
  }
`;

const Footer = () => {
  const handleCorreoButtonClick = () => {
    window.location.href = 'mailto:GeneracionZ@contact.com?subject=Contacto';
  };

  const handleDireccionButtonClick = () => {
    window.open('https://maps.app.goo.gl/aCHCk7B3qcwYJpS7A', '_blank');
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/EmanuelAyala13', '_blank');
  };

  return (
    <StyledFooter>
      <FooterContent>
        <Section>
          <h3>Contacto</h3>
          <ContactItem>
            <FaEnvelope />
            <p>GeneracionZ@contact.com</p>
          </ContactItem>
          <ContactItem>
            <FaMapMarkerAlt />
            <p>ZIP: x4352</p>
          </ContactItem>
          <ContactItem>
            <FaPhone />
            <p>5479-2786</p>
          </ContactItem>
        </Section>
        <Section>
          <h3>Desarrollado por Emanuel Ayala</h3>
          <CommonButton onClick={handleCorreoButtonClick}>Contactar</CommonButton>
          <CommonButton onClick={handleDireccionButtonClick}>Ver Mapa</CommonButton>
          <CommonButton onClick={handleGitHubClick}>
            <FaGithub />
            Ver en GitHub
          </CommonButton>
        </Section>
      </FooterContent>
      <p>&copy; 2024 Generación Z</p>
    </StyledFooter>
  );
};

export default Footer;
