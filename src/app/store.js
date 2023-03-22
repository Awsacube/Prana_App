import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import cartSlice from './cart-slice'
import authSlice from './auth-slice'
import locationSlice from './location-slice'

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    cart:cartSlice.reducer,
    auth:authSlice.reducer,
    location:locationSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(userAuthApi.middleware)
})

setupListeners(store.dispatch)