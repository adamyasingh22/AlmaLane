"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { ApiProduct } from "@/lib/api"

export interface WishlistItem extends ApiProduct {
  addedAt: string
}

interface WishlistState {
  items: WishlistItem[]
  totalItems: number
}

type WishlistAction =
  | { type: "ADD_ITEM"; payload: ApiProduct }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: WishlistItem[] }

const initialState: WishlistState = {
  items: [],
  totalItems: 0,
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        return state 
      }

      const newItem: WishlistItem = {
        ...action.payload,
        addedAt: new Date().toISOString(),
      }

      const newItems = [...state.items, newItem]

      return {
        items: newItems,
        totalItems: newItems.length,
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)

      return {
        items: newItems,
        totalItems: newItems.length,
      }
    }

    case "CLEAR_WISHLIST":
      return initialState

    case "LOAD_WISHLIST": {
      return {
        items: action.payload,
        totalItems: action.payload.length,
      }
    }

    default:
      return state
  }
}

interface WishlistContextType extends WishlistState {
  addItem: (product: ApiProduct) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  toggleItem: (product: ApiProduct) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("shopvibe-wishlist")
    if (savedWishlist) {
      try {
        const wishlistItems = JSON.parse(savedWishlist)
        dispatch({ type: "LOAD_WISHLIST", payload: wishlistItems })
      } catch (error) {
        console.error("Failed to load wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopvibe-wishlist", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: ApiProduct) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearWishlist = () => {
    dispatch({ type: "CLEAR_WISHLIST" })
  }

  const isInWishlist = (id: string) => {
    return state.items.some((item) => item.id === id)
  }

  const toggleItem = (product: ApiProduct) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearWishlist,
        isInWishlist,
        toggleItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
