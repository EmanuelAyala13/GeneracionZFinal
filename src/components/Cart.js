import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartIconContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1001;
  background: linear-gradient(to right, #d9d9d9, #a6a6a6);
`;

const CartIcon = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 400px;
  height: 100%;
  padding: 20px;
  box-shadow: -2px 0px 5px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  background: linear-gradient(to right, #ffd700, #ffa500);
  border-radius: 10px;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const CartTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartBody = styled.div`
  max-height: calc(100% - 70px);
  overflow-y: auto;
`;

const CustomCartItemDetails = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;

  img {
    max-width: 60px;
    height: auto;
    margin-right: 10px;
  }

  div {
    flex-grow: 1;
    overflow: hidden;
  }

  p {
    margin: 0;
    color: #333;
  }

  .quantity-control {
    display: flex;
    align-items: center;
  }
`;

const QuantityButton = styled.div`
  background-color: #333;
  color: #fff;
  border: 1px solid #333;
  padding: 3px 6px;
  cursor: pointer;
  font-size: 12px;
  width: 20px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const ClearCartButton = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;

const CartTotal = styled.div`
  margin-top: 20px;
  color: #333;
  font-size: 14px;
`;

const CartButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #333;
  padding: 5px;
  margin: 0;
  width: 40px;
  height: 40px;
`;

const Cart = ({ cartItems, setCartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemIds, setCartItemIds] = useState(new Set());

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItems(storedCartItems);
      const ids = new Set(storedCartItems.map(item => item.id));
      setCartItemIds(ids);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const ids = new Set(cartItems.map(item => item.id));
    setCartItemIds(ids);
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setCartItemIds(new Set([...cartItemIds, product.id]));
    }
    toast.success('Producto agregado al carrito');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    setCartItemIds(new Set([...cartItemIds].filter(id => id !== productId)));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCart = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      const updatedCartItemIds = new Set(updatedCart.map(item => item.id));
      setCartItemIds(updatedCartItemIds);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const savePurchase = () => {
    if (cartItems.length === 0) {
      toast.error('No hay productos en el carrito.');
      return;
    }

    const invoiceNumber = Math.floor(Math.random() * 1000000);
    const purchaseDetails = cartItems.map(
      (item) => `${item.title} cantidad: ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}`
    );

    localStorage.setItem(`purchase_${invoiceNumber}`, JSON.stringify(purchaseDetails));

    setCartItems([]);
    setCartItemIds(new Set());
    toast.success('Compra exitosa. Número de factura: ' + invoiceNumber);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartItemIds(new Set());
    toast.info('Carrito vaciado');
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
                {Array.from(cartItemIds).map((id) => {
                  const item = cartItems.find((item) => item.id === id);
                  return (
                    <CustomCartItemDetails key={item.id}>
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <div className="quantity-control">
                          <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            -
                          </QuantityButton>
                          <p>Cantidad: {item.quantity}</p>
                          <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            +
                          </QuantityButton>
                        </div>
                        <p>Precio: ${item.price.toFixed(2)}</p>
                        <p>Total: ${(item.price * item.quantity).toFixed(2)} USD</p>
                      </div>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>&times;</RemoveButton>
                    </CustomCartItemDetails>
                  );
                })}
              </CartBody>
              <CartTotal>Total: ${calculateTotal().toFixed(2)} USD</CartTotal>
              <CartButton onClick={savePurchase}>Comprar</CartButton>
              <ClearCartButton onClick={clearCart}>Vaciar Carrito</ClearCartButton>
            </div>
          </div>
          <ToastContainer />
        </CartContainer>
      )}
    </>
  );
};

export default Cart;
