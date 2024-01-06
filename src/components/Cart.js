import React, { useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 300px;
  height: 100%;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  padding: 20px;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: right 0.3s ease-in-out;

  @media screen and (max-width: 480px) {
    width: 60%;
    max-width: none;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CartIconContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1001;
`;

const CartIcon = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: white;
`;

const CloseButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: white;
`;

const CartTitle = styled.h3`
  margin: 0;
  color: white;
  font-size: 1.5em;
`;

const CartBody = styled.div`
  overflow-y: auto;
  max-height: calc(100% - 70px);
`;

const CartItemDetails = styled.div`
  flex: 1;
  padding-right: 10px;

  img {
    max-width: 50px;
    height: auto;
  }
  
  p {
    margin: 5px 0;
  }
`;

const CartTotal = styled.div`
  margin-top: 20px;
  color: white;
`;

const CartButton = styled.button`
  background-color: #fff;
  color: #ff7e5f;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const Cart = ({ cartItems, setCartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuy = () => {
    toast.success('Compra exitosa!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <>
      <CartIconContainer>
        <CartIcon onClick={toggleCart}>🛒</CartIcon>
      </CartIconContainer>
      {isCartOpen && (
        <CartContainer isOpen={isCartOpen}>
          <CartHeader>
            <CartTitle>Carrito de compras</CartTitle>
            <CloseButton onClick={closeCart}>&times;</CloseButton>
          </CartHeader>

          <div className="panel panel-default">
            <div className="panel-body">
              <CartBody>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index}>
                      <CartItemDetails>
                        <img src={item.image} alt={item.title} />
                        <p>{item.title}</p>
                        <p>Precio: ${item.price.toFixed(2)}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Total: ${(item.price * item.quantity).toFixed(2)} USD</p>
                        <div>
                          <button onClick={() => removeFromCart(index)}>X</button>
                        </div>
                      </CartItemDetails>
                    </div>
                  ))
                ) : (
                  <div className="alert alert-info">Carrito Vacio</div>
                )}
              </CartBody>
              <CartTotal>Total: ${calculateTotal().toFixed(2)} USD</CartTotal>
              <CartButton onClick={handleBuy}>Comprar</CartButton>
            </div>
          </div>
          <ToastContainer />
        </CartContainer>
      )}
    </>
  );
};

export default Cart;
