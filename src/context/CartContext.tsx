
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Coffee {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Coffee {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (coffee: Coffee) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalItems = items.reduce((total, item) => total + item.quantity, 0);
    const newTotalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);
    
    setTotalItems(newTotalItems);
    setTotalPrice(newTotalPrice);
  }, [items]);

  const addToCart = (coffee: Coffee) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === coffee.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === coffee.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        return [...prevItems, { ...coffee, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    toggleCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
