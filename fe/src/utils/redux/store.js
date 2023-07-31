import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productsReducer from "./productsSlice";
import purchaseReducer from "./purchaseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    purchase: purchaseReducer,
  },
});
