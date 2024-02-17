import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  orderId: '',
  address: '',
  paymentType: '',
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // orderRequest: state => {
    //   state.loading = true;
    // },
    // orderSuccess: (state, action) => {
    //   state.loading = false;
    //   state.orderItems = action.payload.orderItems;
    //   state.error = {};
    // },
    // orderFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.error;
    // },
    // orderByIdSuccess: (state, action) => {
    //   state.loading = false;
    //   state.orderByIdItems = action.payload.orderByIdItems;
    //   state.error = {};
    // },
    // orderByIdFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.error;
    // },
    setOrderId: (state, action) => {
      state.orderId = action.payload.orderId;
    },
    setAddress: (state, action) => {
      state.address = action.payload.address;
    },
    setPaymentType: (state, action) => {
      state.paymentType = action.payload.type;
    },
    // couponSuccess: (state, action) => {
    //   state.loading = false;
    //   state.couponItems = action.payload.couponItems;
    //   state.error = {};
    // },
    // couponFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.error;
    // },
  },
});

// Action creators are generated for each case reducer function
export const {setOrderId, setAddress, setPaymentType} = orderSlice.actions;

export default orderSlice;
