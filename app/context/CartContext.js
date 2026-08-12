'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../utils/products';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recentProductAdded, setRecentProductAdded] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bazaar49_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    setCartLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('bazaar49_cart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1, showPopup = true) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
    } else {
      newCart = [...cart, {
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity
      }];
    }
    saveCart(newCart);
    setRecentProductAdded(product);
    
    if (showPopup) {
      setIsPopupOpen(true);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    saveCart(newCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  // Generate 5-8 random products for the clickbaity recommendations modal, pricing some at 0 and some at 9
  const getClickbaitRecommendations = () => {
    const allProducts = getProducts();
    const filtered = allProducts.filter(p => !recentProductAdded || p.id !== recentProductAdded.id);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, 6);
    const customPrices = [0, 9, 0, 9, 19, 29];
    return shuffled.map((item, idx) => {
      const newPrice = customPrices[idx % customPrices.length];
      return {
        ...item,
        price: newPrice,
        originalPrice: item.price,
        isPromoItem: true
      };
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartLoaded,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isPopupOpen,
      setIsPopupOpen,
      recentProductAdded,
      getClickbaitRecommendations,
      lastOrder,
      setLastOrder
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
