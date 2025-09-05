"use client";

import type React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface StoredUser extends User {
  password: string; 
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "LOAD_USER"; payload: User | null };

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return { user: action.payload, isLoading: false, isAuthenticated: true };

    case "LOGIN_ERROR":
    case "LOGOUT":
      return { user: null, isLoading: false, isAuthenticated: false };

    case "LOAD_USER":
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: !!action.payload,
      };

    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Utility function to safely parse localStorage users
  const getStoredUsers = (): StoredUser[] => {
    const savedUsers = localStorage.getItem("shopvibe-users");
    try {
      return savedUsers ? (JSON.parse(savedUsers) as StoredUser[]) : [];
    } catch (error) {
      console.error("Failed to parse stored users:", error);
      return [];
    }
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("shopvibe-user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        dispatch({ type: "LOAD_USER", payload: user });
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
        localStorage.removeItem("shopvibe-user");
        dispatch({ type: "LOAD_USER", payload: null });
      }
    } else {
      dispatch({ type: "LOAD_USER", payload: null });
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: "LOGIN_START" });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getStoredUsers();

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      localStorage.setItem("shopvibe-user", JSON.stringify(userWithoutPassword));
      dispatch({ type: "LOGIN_SUCCESS", payload: userWithoutPassword });
      return { success: true };
    } else {
      dispatch({ type: "LOGIN_ERROR" });
      return { success: false, error: "Invalid email or password" };
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string
  ): Promise<{ success: boolean; error?: string }> => {
    dispatch({ type: "LOGIN_START" });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getStoredUsers();

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      dispatch({ type: "LOGIN_ERROR" });
      return { success: false, error: "User with this email already exists" };
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      email,
      password, 
      name,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("shopvibe-users", JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem("shopvibe-user", JSON.stringify(userWithoutPassword));
    dispatch({ type: "LOGIN_SUCCESS", payload: userWithoutPassword });
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("shopvibe-user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
