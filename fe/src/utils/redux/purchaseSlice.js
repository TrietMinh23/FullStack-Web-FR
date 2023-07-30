import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productPrice: 0,
  shipPrice: 20000,
  shipping: "Fast",
  payments: "Cash"
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    updatedShipping: (state, action) => {
      state.shipping = action.payload.shipping;
    },
    updatedPayments: (state, action) => {
      state.payments = action.payload.payments;
    },
    updatedShipTotal: (state, action) => {
      state.shipPrice = action.payload.shipPrice;
    },
    updatedProductPrice: (state, action) => {
      state.productPrice = action.payload.productPrice;
    },
  },
});

export const { updatedShipping, updatedPayments, updatedShipTotal, updatedProductPrice } = purchaseSlice.actions;

export default purchaseSlice.reducer;