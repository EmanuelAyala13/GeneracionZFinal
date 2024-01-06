// ProductList.js
import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import Cart from './Cart';

const ProductGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 20px;
`;

const products = [
  { id: 1, title: 'Mouse Logitech G203', price: 39.99, category: 'Mouse', image: '/images/MouseGamerLogitechG203.jpg' },
  { id: 2, title: 'Mouse Logitech G502 Hero KDA LOL Edition Blanco', price: 59.99, category: 'Mouse', image: '/images/MouseGamerLogitechG502HeroKDALOLEditionBlanco.jpeg' },
  { id: 3, title: 'Mouse Logitech G Pro Gaming', price: 49.99, category: 'Mouse', image: '/images/MouseGamerLogitechGProGaming.jpg' },
  { id: 4, title: 'Mouse Redragon Storm Elite M988', price: 34.99, category: 'Mouse', image: '/images/MouseGamerRedDragonStormEliteM988.jpg' },
  { id: 5, title: 'Mouse XTECH Spiderman', price: 29.99, category: 'Mouse', image: '/images/MouseGamerXTECHSPIDERMAN.jpg' },
  { id: 6, title: 'Silla Secretlab x League of Legends', price: 299.99, category: 'Silla', image: '/images/SillaGamerSecretlabxLeagueofLegends.png' },
  { id: 7, title: 'Silla CS001 de Hello Kitty', price: 199.99, category: 'Silla', image: '/images/SillaGamerCS001deHellokitty.png' },
  { id: 8, title: 'Silla Tournament cuero PU rosa', price: 179.99, category: 'Silla', image: '/images/SillaGamerTournamentcueroPUrosa.jpg' },
  { id: 9, title: 'Silla VALK Freya negra', price: 169.99, category: 'Silla', image: '/images/SillaGamerVALKFreyanegra.jpg' },
  { id: 10, title: 'Teclado AURA GK2 Multicolor Mechanical Gaming', price: 89.99, category: 'Teclado', image: '/images/TecladoAURAGK2MulticolorMechanicalGaming.png' },
  { id: 11, title: 'Teclado G Pro RGB LOL KDA Edition Logitech', price: 119.99, category: 'Teclado', image: '/images/TecladoGProRgbLolKdaEditionLogitech.png' },
  { id: 12, title: 'Teclado Logitech G213 Prodigy', price: 59.99, category: 'Teclado', image: '/images/TecladoLogitechG213Prodigy.png' },
  { id: 13, title: 'Teclado Razer Gold Edition Mecánico', price: 129.99, category: 'Teclado', image: '/images/TecladoRazerGoldEditionMecanico.png' },
  { id: 14, title: 'Teclado Razer Huntsman Mini Mercury Linear Red', price: 139.99, category: 'Teclado', image: '/images/TecladoRazerHuntsmanMiniMercuryLinearRed.png' },
];

const ProductList = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const existingProductIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div>
      <ProductGrid>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} />
        ))}
      </ProductGrid>
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default ProductList;
