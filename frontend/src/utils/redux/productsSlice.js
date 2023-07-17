import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ADDTOCART: (state, action) => {
      state.shoppingCart.push(action.payload.product);
    },
  },
});

export const { ADDTOCART } = productsSlice.actions;

export default productsSlice.reducer;
