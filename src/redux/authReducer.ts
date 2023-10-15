import { createSlice } from '@reduxjs/toolkit'
import { User } from '../interfaces/user';

interface AuthState {
  users: User[],
  currentUser: User | null,
  error: string | null
}

const initialState: AuthState = {
  users: [],
  currentUser: null,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const user = state.users.find(user => user.username === action.payload.username || user.email === action.payload.email);

      if (user) {
        state.error = 'Username or email already exist';
      } else {
        const newUser = {
          id: Math.random(),
          ...action.payload
        };

        state.users.push(newUser);
        state.currentUser = newUser;
        state.error = null;
      }

    },
    loginUser: (state, action) => {
      const user = state.users.find(user => user.username === action.payload.username && user.password === action.payload.password);

      if (!user) {
        state.error = 'User doesn\'t exist';
      } else {
        state.currentUser = user
        state.error = null;
      }
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { registerUser, loginUser, logoutUser, clearAuthError } = authSlice.actions

export default authSlice.reducer