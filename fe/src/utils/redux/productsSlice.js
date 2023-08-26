import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  shoppingCart: [],
  total: 0,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    UPDATETOTAL: (state, action) => {
      state.total = action.payload;
    },
    ADDTOCART: (state, action) => {
      const { sellerId } = action.payload.data;
      const targetIndex = state.shoppingCart.findIndex(
        (item) => item.name === sellerId.name
      );

      if (targetIndex >= 0) {
        state.shoppingCart[targetIndex].item.push(action.payload.data);
      } else {
        state.shoppingCart.push({
          name: sellerId.name,
          item: [action.payload.data],
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
    UPDATEPRODUCT: (state, action) => {
      const { flag } = action.payload;

      if (flag !== undefined) {
        if (flag) {
          const { total } = action.payload;
          console.log("CHECK", total);
          state.total = total;
        } else {
          const { listProduct } = action.payload;
          if (listProduct) {
            for (let item of listProduct) {
              const { sellerId } = item;
              const targetIndex = state.shoppingCart.findIndex(
                (item) => item.name === sellerId.name
              );

              if (targetIndex >= 0) {
                state.shoppingCart[targetIndex].item.push(item);
              } else {
                state.shoppingCart.push({
                  name: sellerId.name,
                  item: [item],
                });
              }
            }
          }
        }
      } else {
        const { listProduct } = action.payload;
        if (listProduct) {
          for (let item of listProduct) {
            const { title, price, image, _id, sellerId } = item;
            const targetIndex = state.shoppingCart.findIndex(
              (item) => item.name === sellerId.name
            );

            if (targetIndex >= 0) {
              state.shoppingCart[targetIndex].item.push(item);
            } else {
              state.shoppingCart.push({
                name: sellerId.name,
                item: [item],
              });
            }
          }
        }
        state.total = listProduct.length;
      }
    },
    GETALLPRODUCTS: (state, action) => {
      state.products = action.payload.products;
    },
  },
});

export const {
  ADDTOCART,
  REMOVEFROMCART,
  DELETE,
  UPDATEPRODUCT,
  UPDATETOTAL,
  GETALLPRODUCTS,
} = productsSlice.actions;

export default productsSlice.reducer;
