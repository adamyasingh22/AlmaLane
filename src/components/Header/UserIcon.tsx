"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated, logout } from "@/store/authSlice";
import type { AppDispatch } from "@/store";
import { useState, useEffect, useRef } from "react";

export default function UserIcon() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H3m12 0l-4-4m4 4l-4 4m8-8V5a2 2 0 00-2-2h-5m7 14v-3"
          />
        </svg>
        Login
      </Link>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white font-bold">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <span className="hidden sm:inline text-gray-700 font-medium">
          {user?.name}
        </span>
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white border rounded-lg shadow-md z-50">
          <div className="px-4 py-2 text-sm text-gray-600 border-b">
            {user?.email}
          </div>
          <button
            onClick={() => {
              dispatch(logout());
              setMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
