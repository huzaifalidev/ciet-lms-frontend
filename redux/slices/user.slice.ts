import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  updatedAt: string;
  accessToken: string;
  refreshToken: string;
}

interface UserState {
  data: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  data: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
