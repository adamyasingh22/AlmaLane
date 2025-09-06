
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

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
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
};

function getStoredUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem("shopvibe-users") || "[]");
  } catch {
    return [];
  }
}

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = getStoredUsers();
  const foundUser = users.find((u) => u.email === email && u.password === password);

  if (!foundUser) {
    return rejectWithValue("Invalid email or password");
  }

  const { password: _, ...userWithoutPassword } = foundUser;
  localStorage.setItem("shopvibe-user", JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
});

export const signupUser = createAsyncThunk<
  User,
  { email: string; password: string; name: string },
  { rejectValue: string }
>("auth/signup", async ({ email, password, name }, { rejectWithValue }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = getStoredUsers();
  if (users.find((u) => u.email === email)) {
    return rejectWithValue("User with this email already exists");
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

  return userWithoutPassword;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state) {
      try {
        const saved = localStorage.getItem("shopvibe-user");
        if (saved) {
          state.user = JSON.parse(saved);
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      } catch {
        state.user = null;
        state.isAuthenticated = false;
      }
      state.isLoading = false;
    },
    logout(state) {
      localStorage.removeItem("shopvibe-user");
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
        state.isLoading = false;
      })

      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload || "Signup failed";
        state.isAuthenticated = false;
        state.isLoading = false;
      });
  },
});

export const { loadUser, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
