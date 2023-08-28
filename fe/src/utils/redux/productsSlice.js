import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  shoppingCart: [],
  search: false,
  purchase: [],
  total: 0,
  totalPage: 1,
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
        (item) => item._id === id
      );

      console.log(targetIndex, index);

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
      state.products = action.payload;
    },
    ADDTOPURCHASE: (state, action) => {
      for (const entry of state.shoppingCart) {
        const foundItem = entry.item.find(
          (item) => item._id === action.payload.data.id
        );

        const targetIndex = state.purchase.findIndex(
          (item) => item.name === entry.name
        );
        if (targetIndex >= 0) {
          state.purchase[targetIndex].item.push(foundItem);
        } else {
          state.purchase.push({
            name: entry.name,
            item: [foundItem],
          });
        }
        break; // Nếu bạn chỉ cần tìm một lần
      }
    },
    REMOVEFROMPURCHASE: (state, action) => {
      const targetIndex = state.purchase.findIndex(
        (item) => item.name === action.payload.data.shop
      );

      const index = state.purchase[targetIndex].item.findIndex(
        (item) => item._id === action.payload.data.id
      );

      state.purchase[targetIndex].item.splice(index, 1);
      if (!state.purchase[targetIndex].item.length) {
        state.purchase.splice(targetIndex, 1);
      }
    },
    ADDTOPURCHASEBYSHOPALL: (state, action) => {
      const { name, item } = action.payload;
      const targetIndex = state.purchase.findIndex(
        (item) => item.name === name
      );
      if (targetIndex >= 0) {
        state.purchase[targetIndex].item = item;
      } else {
        state.purchase.push(action.payload);
      }
    },
    REMOVEFROMPURCHASEBYSHOPALL: (state, action) => {
      const { name } = action.payload;

      const targetIndex = state.purchase.findIndex(
        (item) => item.name === name
      );

      console.log(targetIndex);

      state.purchase.splice(targetIndex, 1);
    },
    ADDTOPURCHASEALL: (state) => {
      state.purchase = [...state.shoppingCart];
    },
    REMOVEFROMPURCHASEALL: (state) => {
      state.purchase = [];
    },
    SEARCH: (state, action) => {
      state.search = action.payload.flag;
    },
    UPDATETOTALPAGE: (state, action) => {
      state.totalPage = action.payload.totalPages;
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
  ADDTOPURCHASE,
  REMOVEFROMPURCHASE,
  ADDTOPURCHASEBYSHOPALL,
  REMOVEFROMPURCHASEBYSHOPALL,
  ADDTOPURCHASEALL,
  SEARCH,
  REMOVEFROMPURCHASEALL,
  UPDATETOTALPAGE,
} = productsSlice.actions;

export default productsSlice.reducer;
