import React, { useEffect, useReducer } from 'react';
import './App.css';
import Cart from './components/Cart';
import Product from './components/Product';
import axios from 'axios';

const initialstate = {
  products: [],
  cart: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: action.payload };

    case "ADD_TO_CART":
      let product = action.payload;
      product.quantity = 1;
      product.totalPrice = product.price;
      let updatedCart = [...state.cart, product];
      return { ...state, cart: updatedCart };

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload.id) };

    case "INCREASE_QUANTITY":
      let increaseIndex = state.cart.findIndex((product) => product.id === action.payload.id);
      let increaseItem = state.cart[increaseIndex];
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, increaseIndex),
          {
            ...increaseItem,
            quantity: increaseItem.quantity + 1,
            totalPrice: (increaseItem.quantity + 1) * increaseItem.price,
          },
          ...state.cart.slice(increaseIndex + 1),
        ],
      };

    case "DECREASE_QUANTITY":
      let decreaseIndex = state.cart.findIndex((product) => product.id === action.payload.id);
      let decreaseItem = state.cart[decreaseIndex];

      if (decreaseItem.quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter((cartItem) => cartItem.id !== decreaseItem.id)
        };
      }

      return {
        ...state,
        cart: [
          ...state.cart.slice(0, decreaseIndex),
          {
            ...decreaseItem,
            quantity: decreaseItem.quantity - 1,
            totalPrice: (decreaseItem.quantity - 1) * decreaseItem.price,
          },
          ...state.cart.slice(decreaseIndex + 1),
        ],
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("https://dummyjson.com/products");
      dispatch({ type: "ADD_PRODUCT", payload: res.data.products });
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  }

  const removeProduct = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  }

  const increaseQuantity = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item });
  }

  const decreaseQuantity = (item) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: item });
  }

  return (
    <div className='pc-container'>
      <Product products={state.products} addToCart={addToCart} cart={state.cart} />
      <Cart
        cart={state.cart}
        removeProduct={removeProduct}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}

export default App;
