"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store, type AppDispatch } from "@/store";
import { loadUser } from "@/store/authSlice";
import { WishlistProvider } from "@/contexts/whishlist-context";
import { SearchProvider } from "@/contexts/search-context";

function InitAuth({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <WishlistProvider>
        <Provider store={store}>
          <InitAuth>{children}</InitAuth>
        </Provider>
      </WishlistProvider>
    </SearchProvider>
  );
}
