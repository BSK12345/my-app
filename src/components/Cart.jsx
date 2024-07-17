import React from 'react';
import './Cart.css';

const Cart = ({ cart, removeProduct, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className='cartContainer'>
      <h2>CART</h2>

      {cart.length === 0 && <p>Cart is Empty</p>}

      {cart.map((item) => (
        <div key={item.id} className='cart-wrapper'>
          <img width="100%" src={item.thumbnail} alt={item.title} />

          <div className='cart-info'>
            <div>{item.title}</div>
            <div className='right'>
              <div className='cart-action' onClick={() => increaseQuantity(item)}>+</div>
              <div>{item.quantity}</div>
              <div className='cart-action' onClick={() => decreaseQuantity(item)}>-</div>
              <div>{item.totalPrice}</div>
            </div>
          </div>

          <button className='remove-product' onClick={() => removeProduct(item)}>REMOVE</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
