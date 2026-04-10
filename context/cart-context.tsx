"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string; // unique key combining product id and options
  productId: string;
  name: string;
  image: string;
  color: string;
  storage: string;
  priceValue: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, delta: number) => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("ava-cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (e) {
          console.error("Failed to load cart", e);
        }
      }
    }
    return [];
  });

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("ava-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((current) => {
      const existingIndex = current.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...current];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...current, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceValue * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
