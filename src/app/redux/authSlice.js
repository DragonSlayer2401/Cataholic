import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: localStorage.getItem('token') ? true : false,
    favorites: [],
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.id !== action.payload
      );
    },
  },
});

export const { setLoggedIn, setFavorites, addFavorite, removeFavorite } = authSlice.actions;
export default authSlice.reducer;
