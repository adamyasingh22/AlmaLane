"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { WishlistProvider } from "@/contexts/whishlist-context";
import { SearchProvider } from "@/contexts/search-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <WishlistProvider>
        <Provider store={store}>{children}</Provider>
      </WishlistProvider>
    </SearchProvider>
  );
}
