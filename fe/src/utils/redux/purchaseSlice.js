import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  shipping: "Fast",
};

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    updatedShipping: (state, action) => {
      state.shipping = action.payload.shipping;
    },
  },
});

export const { updatedShipping } = purchaseSlice.actions;

export default purchaseSlice.reducer;
