import React, { PropsWithChildren } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, RenderOptions } from "@testing-library/react";
import cartReducer from "@/store/cartSlice";
import authReducer from "@/store/authSlice";
import type { RootState } from "@/store";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: { cart: cartReducer, auth: authReducer },
      preloadedState: preloadedState as RootState, 
    }),
    ...renderOptions
  }: {
    preloadedState?: Partial<RootState>; // 
    store?: ReturnType<typeof configureStore>;
  } & RenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
