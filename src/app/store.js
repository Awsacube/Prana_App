import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {userAuthApi} from '../services/userAuthApi';
import cartSlice from './cart-slice';
import authReducer from './auth-slice';
import locationSlice from './location-slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import searchSlice from './search-slice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [authReducer],
  blacklist: [userAuthApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    cart: cartSlice.reducer,
    auth: persistedReducer,
    location: locationSlice.reducer,
    search: searchSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }).concat(userAuthApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
