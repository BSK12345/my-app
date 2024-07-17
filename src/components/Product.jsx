import React from 'react';
import './Product.css';

const Product = ({ products, addToCart, cart }) => {
  return (
    <div className='productContainer'>
      {products.map((product) => {
        return (
          <div key={product.id} className='productCard'>
            <div className='product_wrapper'>
              <img width="100%" height={300} src={product.thumbnail} alt='' />
            </div>
            <div className='productDetails'>
              <div>{product.title}</div>
              <div>{product.price}</div>
              <div>
                <button 
                  className='add-product' 
                  onClick={() => addToCart(product)}
                  disabled={cart.some((item) => item.id === product.id)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
