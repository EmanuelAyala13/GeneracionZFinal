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
  background: linear-gradient(to right, #ff4500, #ff0000); 

  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Align bottom elements */
  align-items: center; /* Align horizontally to center */

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const ProductCategory = styled.p`
  margin: 5px 0;
  color: white;
`;

const ProductPrice = styled.p`
  margin: 5px 0;
  font-weight: bold;
  color: white;
`;

const AddToCartButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ProductCard = ({ title, price, category, image, onAddToCart }) => {
  return (
    <ProductCardContainer>
      <ProductImage src={process.env.PUBLIC_URL + image} alt={title} />
      <ProductDetails>
        <ProductTitle>{title}</ProductTitle>
        <ProductCategory>{category}</ProductCategory>
        <ProductPrice>${price.toFixed(2)}</ProductPrice>
        <AddToCartButton onClick={onAddToCart}>Agregar al Carrito</AddToCartButton>
      </ProductDetails>
    </ProductCardContainer>
  );
};

export default ProductCard;
