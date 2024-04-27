import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  users: [],
  isFetching: false,
  error: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error flag
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
      state.error = false; // Reset error flag
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // get all
    getUserStart: (state) => {
      state.isFetching = true,
        state.error = false
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload
    },
    getUserFailed: (state) => {
      state.isFetching = false,
        state.error = true
    }
  }
});

export const {
  loginFailure,
  loginStart,
  loginSuccess,
  getUserStart,
  getUserSuccess,
  getUserFailed } = userSlice.actions;
export default userSlice.reducer;
