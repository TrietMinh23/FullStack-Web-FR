import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  total: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ADDTOCART: (state, action) => {
      const { name, price, image, shop, quantity, id } = action.payload;
      const targetIndex = state.shoppingCart.findIndex(
        (item) => item.name === shop
      );

      if (targetIndex >= 0) {
        state.shoppingCart[targetIndex].item.push({
          name,
          price,
          image,
          quantity,
          id,
        });
      } else {
        state.shoppingCart.push({
          name: shop,
          item: [
            {
              name,
              price,
              image,
              quantity,
              id,
            },
          ],
        });
      }
      state.total += 1;
    },
    DELETE: (state, action) => {
      const { id, shop } = action.payload;
      const targetIndex = state.shoppingCart.findIndex(
        (item) => item.name === shop
      );

      const index = state.shoppingCart[targetIndex].item.findIndex(
        (item) => item.id === id
      );

      state.shoppingCart[targetIndex].item.splice(index, 1);
      if (!state.shoppingCart[targetIndex].item.length) {
        state.shoppingCart.splice(targetIndex, 1);
      }
      state.total -= 1;
    },
    REMOVEFROMCART: (state, action) => {
      const { id, shop } = action.payload;
      const targetIndex = state.shoppingCart.findIndex(
        (item) => item.name === shop
      );

      const index = state.shoppingCart[targetIndex].item.findIndex(
        (item) => item.id === id
      );

      if (state.shoppingCart[targetIndex].item[index].quantity > 1)
        state.shoppingCart[targetIndex].item[index].quantity -= 1;
      else {
        state.shoppingCart[targetIndex].item.splice(index, 1);
        if (!state.shoppingCart[targetIndex].item.length) {
          state.shoppingCart.splice(targetIndex, 1);
        }
      }
      state.total -= 1;
    },
  },
});

export const { ADDTOCART, REMOVEFROMCART, DELETE } = productsSlice.actions;

export default productsSlice.reducer;
