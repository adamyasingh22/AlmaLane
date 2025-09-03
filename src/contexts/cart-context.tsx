"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { ApiProduct } from "@/lib/api"

export interface CartItem extends ApiProduct {
  quantity: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: ApiProduct }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

interface CartState {
  items: CartItem[]
  totalPrice: number
  totalItems: number 
}

interface CartContextType extends CartState {
  addItem: (product: ApiProduct) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isInCart: (id: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0, 
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      )

      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        const newItem: CartItem = { ...action.payload, quantity: 1 }
        newItems = [...state.items, newItem]
      }

      return {
        items: newItems,
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0), // 👈 always update
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)

      return {
        items: newItems,
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
      }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )

      return {
        items: newItems,
        totalPrice: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
      }
    }

    case "CLEAR_CART":
      return initialState

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product: ApiProduct) =>
    dispatch({ type: "ADD_ITEM", payload: product })
  const removeItem = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id })
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  const clearCart = () => dispatch({ type: "CLEAR_CART" })
  const isInCart = (id: number) => state.items.some((item) => item.id === id)

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
