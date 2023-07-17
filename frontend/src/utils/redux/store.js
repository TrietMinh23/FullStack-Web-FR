import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productsSlice";
import purchaseReducer from "./purchaseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    purchase: purchaseReducer,
  },
});
