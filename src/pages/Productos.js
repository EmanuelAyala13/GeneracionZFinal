import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import './Productos.css';

const ProductsPerPage = 3;

const allProducts = [
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

const Productos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const categorias = [...new Set(allProducts.map((producto) => producto.category))];

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setShowMore(false);
  };

  const handleMostrarTodosClick = () => {
    setCategoriaSeleccionada('Mostrar Todos');
    setShowMore(false);
  };

  const handleShowMoreClick = () => {
    setShowMore(true);
  };

  const handleShowLessClick = () => {
    setShowMore(false);
  };

  const productosFiltrados = categoriaSeleccionada
    ? categoriaSeleccionada === 'Mostrar Todos'
      ? allProducts
      : allProducts.filter((producto) => producto.category === categoriaSeleccionada)
    : allProducts;

  const visibleProducts = showMore
    ? productosFiltrados
    : productosFiltrados.slice(0, ProductsPerPage);

  return (
    <div>
      <Navbar />
      <h2>Nuestros Productos</h2>
      <div className="button-container">
        <button onClick={handleMostrarTodosClick}>Mostrar Todo</button>
        {categorias.map((categoria) => (
          <button key={categoria} onClick={() => handleCategoriaClick(categoria)}>
            {categoria}
          </button>
        ))}
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
      <div className="product-container">
        <div className="carousel">
          {visibleProducts.map((producto) => (
            <ProductCard
              key={producto.id}
              {...producto}
              onAddToCart={() => {
                const existingCartItemIndex = cartItems.findIndex((item) => item.id === producto.id);
                if (existingCartItemIndex !== -1) {
                  const updatedCartItems = [...cartItems];
                  updatedCartItems[existingCartItemIndex].quantity++;
                  setCartItems(updatedCartItems);
                } else {
                  setCartItems([...cartItems, { ...producto, quantity: 1 }]);
                }
              }}
            />
          ))}
        </div>
        {productosFiltrados.length > ProductsPerPage && (
          <div>
            {!showMore ? (
              <button onClick={handleShowMoreClick}>Mostrar Más</button>
            ) : (
              <button onClick={handleShowLessClick}>Mostrar Menos</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;
