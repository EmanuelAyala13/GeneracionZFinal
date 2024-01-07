import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: #333;
  color: white;
  padding: 40px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  text-align: center;
  color: yellow;

  @media (min-width: 768px) {
    text-align: left;
    margin-right: auto;
    margin-bottom: 0;
  }

  h3, p {
    color: white; // Cambiado a blanco
  }
`;

const CommonButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 16px;
`;

const StyledGitHubLink = styled.a`
  display: inline-block;

  img {
    width: 30px;
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
          <p>ZIP: x4352</p>
          <p>Teléfono: 5479-2786</p>
          <CommonButton onClick={handleCorreoButtonClick}>Contacto</CommonButton>
        </Section>
        <Section>
          <h3>Desarrollado por Emanuel Ayala</h3>
          <CommonButton onClick={handleCorreoButtonClick}>Correo</CommonButton>
          <p>
            <StyledGitHubLink onClick={handleGitHubClick}>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub Logo"
                className="github-logo"
              />
            </StyledGitHubLink>
          </p>
        </Section>
      </FooterContent>
      <Section>
        <CommonButton onClick={handleDireccionButtonClick}>Mapa</CommonButton>
      </Section>
      <p>&copy; 2024 Generación Z</p>
    </StyledFooter>
  );
};

export default Footer;
