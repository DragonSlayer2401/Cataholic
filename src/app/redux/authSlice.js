import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false,
    email: '',
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
  },
});

export const { setLoggedIn, setEmail } = authSlice.actions;
export default authSlice.reducer;
