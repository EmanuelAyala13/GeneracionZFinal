import React from 'react';
import styled from 'styled-components';

const ProductCardContainer = styled.div`
  width: 250px;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  background-color: white;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

const ProductDetails = styled.div`
  padding: 10px;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ProductCategory = styled.p`
  margin: 5px 0;
  color: #888;
`;

const ProductPrice = styled.p`
  margin: 5px 0;
  font-weight: bold;
`;

const ProductCard = ({ title, price, category, image, onAddToCart }) => {
  return (
    <ProductCardContainer>
      <ProductImage src={process.env.PUBLIC_URL + image} alt={title} />
      <ProductDetails>
        <ProductTitle>{title}</ProductTitle>
        <ProductCategory>{category}</ProductCategory>
        <ProductPrice>${price.toFixed(2)}</ProductPrice>
        <button onClick={onAddToCart}>Agregar al Carrito</button>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCard;
