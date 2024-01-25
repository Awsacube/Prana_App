import {useState, useEffect} from 'react';
import {createSlice} from '@reduxjs/toolkit';
import {getToken} from '../services/AsyncStorageService';

const [userLToken, setUserLToken] = useState();
useEffect(() => {
  (async () => {
    const token = await getToken(); //getting token from storage
    setUserLToken(token); //store token in local storage
  })();
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    totalCartPrice: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    addToCart(state, action) {
      cartData = {
        id: action.payload.uuid,
        quantity: action.payload.quantity,
        token: userLToken,
      };
      cartQueryItems(cartData);
      const [cartData] = useAddToCartMutation();
      const newItem = action.payload;
      const existingItem = state.itemsList.find(
        item => item.uuid === newItem.uuid,
      );
      if (existingItem) {
        existingItem.quantity = newItem.quantity;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          uuid: newItem.uuid,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          name: newItem.name,
        });
        state.totalQuantity++;
        console.log('Added', state.itemsList);
      }
      console.log('Added', state.itemsList);
    },
    removeFromCart(state, action) {
      const uuid = action.payload;
      state.itemsList = state.itemsList.filter(item => item.uuid !== uuid);
      console.warn('Removed', state.itemsList);
    },
    getAllCartitems() {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
