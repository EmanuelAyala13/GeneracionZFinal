import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logoShop.jpg';
import Cart from './Cart'; 

const StyledNav = styled.nav`
  position: fixed;
  width: 100%; 
  z-index: 1000;
  background-color: #333;
  top: 0;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    padding: 10px;
  }
`;

const Logo = styled.img`
  max-width: 120px;
  max-height: 40px;
  border-radius: 10px;
  margin-left: 0px;

  @media screen and (max-width: 500px) {
    max-width: 80px;
    max-height: 30px;
  }
`;

const MenuBtn = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  display: none;

  @media screen and (max-width: 500px) {
    display: block;
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  margin-right: 5%;

  li {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    a {
      text-decoration: none;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      transition: color 0.3s ease;

      &:hover {
        color: #ffd700;
      }
    }
  }

  @media screen and (max-width: 500px) {
    display: ${({ menuOpen }) => (menuOpen ? 'flex' : 'none')};
    flex-direction: column;
    background-color: #333;
    position: absolute;
    top: 60px;
    width: 100%;
    margin-right: 0;
    padding: 10px;

    li {
      margin-right: 0;
      text-align: center;
      margin-bottom: 10px;
    }
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <StyledNav>
      <Link to="/" className="logo">
        <Logo src={logo} alt="Logo" />
      </Link>

      <MenuBtn onClick={handleMenuToggle}>☰</MenuBtn>

      <NavList menuOpen={menuOpen}>
        <li>
          <Link to="/iniciar-sesion">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/nosotros">Nosotros</Link>
        </li>

      </NavList>

      {cartOpen && <Cart setCartOpen={setCartOpen} />}
    </StyledNav>
  );
};

export default Navbar;
