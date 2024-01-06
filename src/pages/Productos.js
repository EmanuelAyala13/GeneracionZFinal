import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import './Productos.css';

const products = [
  { title: 'Mouse Logitech G203', price: 39.99, category: 'Mouse', image: '/images/MouseGamerLogitechG203.jpg' },
  { title: 'Mouse Logitech G502 Hero KDA LOL Edition Blanco', price: 59.99, category: 'Mouse', image: '/images/MouseGamerLogitechG502HeroKDALOLEditionBlanco.jpeg' },
  { title: 'Mouse Logitech G Pro Gaming', price: 49.99, category: 'Mouse', image: '/images/MouseGamerLogitechGProGaming.jpg' },
  { title: 'Mouse Redragon Storm Elite M988', price: 34.99, category: 'Mouse', image: '/images/MouseGamerRedDragonStormEliteM988.jpg' },
  { title: 'Mouse XTECH Spiderman', price: 29.99, category: 'Mouse', image: '/images/MouseGamerXTECHSPIDERMAN.jpg' },
  { title: 'Silla Secretlab x League of Legends', price: 299.99, category: 'Silla', image: '/images/SillaGamerSecretlabxLeagueofLegends.png' },
  { title: 'Silla CS001 de Hello Kitty', price: 199.99, category: 'Silla', image: '/images/SillaGamerCS001deHellokitty.png' },
  { title: 'Silla Tournament cuero PU rosa', price: 179.99, category: 'Silla', image: '/images/SillaGamerTournamentcueroPUrosa.jpg' },
  { title: 'Silla VALK Freya negra', price: 169.99, category: 'Silla', image: '/images/SillaGamerVALKFreyanegra.jpg' },
  { title: 'Teclado AURA GK2 Multicolor Mechanical Gaming', price: 89.99, category: 'Teclado', image: '/images/TecladoAURAGK2MulticolorMechanicalGaming.png' },
  { title: 'Teclado G Pro RGB LOL KDA Edition Logitech', price: 119.99, category: 'Teclado', image: '/images/TecladoGProRgbLolKdaEditionLogitech.png' },
  { title: 'Teclado Logitech G213 Prodigy', price: 59.99, category: 'Teclado', image: '/images/TecladoLogitechG213Prodigy.png' },
  { title: 'Teclado Razer Gold Edition Mecánico', price: 129.99, category: 'Teclado', image: '/images/TecladoRazerGoldEditionMecanico.png' },
  { title: 'Teclado Razer Huntsman Mini Mercury Linear Red', price: 139.99, category: 'Teclado', image: '/images/TecladoRazerHuntsmanMiniMercuryLinearRed.png' },
];

const Productos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categorias = [...new Set(products.map((producto) => producto.category))];

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleMostrarTodosClick = () => {
    setCategoriaSeleccionada(null);
  };

  const productosFiltrados = categoriaSeleccionada
    ? products.filter((producto) => producto.category === categoriaSeleccionada)
    : products;

  return (
    <div>
      <Navbar />
      <h2>Nuestros Productos</h2>
      <div>
        <button onClick={handleMostrarTodosClick}>Mostrar Todos</button>
        {categorias.map((categoria) => (
          <button key={categoria} onClick={() => handleCategoriaClick(categoria)}>
            {categoria}
          </button>
        ))}
      </div>
      <div className="product-container">
        <div className="carousel">
          {productosFiltrados.map((producto, index) => (
            <ProductCard key={index} {...producto} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Productos;
