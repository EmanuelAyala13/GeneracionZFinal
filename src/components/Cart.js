import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartIconContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1001;
  background-color: #fff;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const CartIcon = styled.span`
  font-size: 24px;
  cursor: pointer;
  color: #555;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 50px;
  right: ${({ isOpen }) => (isOpen ? '20px' : '-400px')}; 
  width: 320px; 
  height: calc(100% - 50px);
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2); 
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  overflow-y: auto;
  background: #f9f9f9; 
  border-radius: 15px; 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: #555;
`;

const CartTitle = styled.h3`
  margin: 0;
  color: #555;
  font-size: 1.5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CartBody = styled.div`
  width: 100%;
  max-height: calc(100% - 150px);
  overflow-y: auto;
`;

const CustomCartItemDetails = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 15px;
  }

  div {
    flex-grow: 1;
  }

  p {
    margin: 5px 0;
    color: #555;
    font-size: 14px;
  }

  .product-name {
    font-weight: bold;
    font-size: 16px;
  }

  .quantity-info {
    font-size: 14px;
    color: #888;
    margin-right: 10px; 
  }

  .quantity-buttons {
    display: flex;
    align-items: center;
  }

  .quantity-buttons button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #555;
    padding: 3px;
    margin: 0 5px; /* Agregar margen entre los botones */
    width: 25px; 
    height: 25px; 
    transition: color 0.3s;
  }

  .quantity-buttons button:hover {
    color: #333;
  }

  .price-info {
    text-align: right;
    font-size: 14px;
    color: #888;
  }

  .total {
    font-size: 16px;
    font-weight: bold;
    color: #555;
  }
`;

const ClearCartButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  transition: background-color 0.3s;
  border-radius: 5px;

  &:hover {
    background-color: #ff473c;
  }
`;

const CartTotal = styled.div`
  width: 100%;
  margin-top: 20px;
  color: #555;
  font-size: 16px;
  text-align: right;
`;

const CartButton = styled.button`
  width: 100%;
  background-color: #555;
  color: #fff;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;
  border-radius: 5px;

  &:hover {
    background-color: #333;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #555;
  padding: 3px;
  margin: 0;
  width: 30px;
  height: 30px;
  transition: color 0.3s;
  display: flex;
  align-items: center; /* Centrar el botón X */
  justify-content: center; /* Centrar el botón X */

  &:hover {
    color: #333;
  }
`;

const Cart = ({ cartItems, setCartItems }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const savePurchase = () => {
    if (cartItems.length === 0) {
      toast.error('No hay productos en el carrito.');
      return;
    }

    const generateInvoiceNumber = () => Math.floor(Math.random() * 1000000);

    const invoiceNumber = generateInvoiceNumber();

    const updatedCart = cartItems.reduce((acc, currentItem) => {
      const existingProductIndex = acc.findIndex((product) => product.title === currentItem.title);
      if (existingProductIndex !== -1) {
        acc[existingProductIndex].quantity += currentItem.quantity;
      } else {
        acc.push({ ...currentItem });
      }
      return acc;
    }, []);

    const purchaseDetails = {
      numeroFactura: invoiceNumber,
      productos: updatedCart.map((item) => ({
        Nombre: item.title,
        Cantidad: item.quantity,
        PrecioTotal: (item.price * item.quantity).toFixed(2),
      })),
      MontoTotal: calculateTotal().toFixed(2),
    };

    localStorage.setItem(`compra_${invoiceNumber}`, JSON.stringify(purchaseDetails));

    setCartItems([]);
    toast.success('Compra exitosa. Número de factura: ' + invoiceNumber);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrito vaciado');
  };

  const groupCartItems = () => {
    const groupedItems = cartItems.reduce((acc, currentItem) => {
      const existingItemIndex = acc.findIndex((item) => item.id === currentItem.id);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].quantity = currentItem.quantity;
      } else {
        acc.push({ ...currentItem });
      }
      return acc;
    }, []);
    return groupedItems;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCart = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      });
      setCartItems(updatedCart);
    }
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
                {groupCartItems().map((item) => (
                  <CustomCartItemDetails key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="product-name">{item.title}</p>
                      <div className="quantity-buttons">
                        <span className="quantity-info">Cantidad: {item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <div className="price-info">
                        <p>Precio: ${item.price.toFixed(2)}</p>
                        <p className="total">Total: ${(item.price * item.quantity).toFixed(2)} USD</p>
                      </div>
                    </div>
                    <RemoveButton onClick={() => removeFromCart(item.id)}>&times;</RemoveButton>
                  </CustomCartItemDetails>
                ))}
              </CartBody>
              <CartTotal>Total: ${calculateTotal().toFixed(2)} USD</CartTotal>
              <ClearCartButton onClick={clearCart}>Vaciar Carrito</ClearCartButton>
              <CartButton onClick={savePurchase}>Confirmar compra</CartButton>
            </div>
          </div>

          <ToastContainer 
            closeButton={false}
            style={{ fontSize: '14px', padding: '10px' }}
            closeStyle={{ fontSize: '14px', padding: '8px' }} 
          />
        </CartContainer>
      )}
    </>
  );
};

export default Cart;
