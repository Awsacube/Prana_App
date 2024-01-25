import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {userToken: 0},
  reducers: {
    login: (state, action) => {
      if (state.userToken === 0) {
        state.userToken = 1;
        console.log('chnagedredux');
      } else if (state.userToken === 1) {
        state.userToken = 0;
        console.log('chnagedredux');
      }
    },
    logOut: (state, action) => {
      state.userToken = false;
    },
  },
});

export const {login, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = state => state.auth.userToken;
export const selectIsLoading = state => state.auth.isLoading;
