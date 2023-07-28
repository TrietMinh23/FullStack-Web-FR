import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "seller",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SETROLE: (state, action) => {
      state.role = action.payload.role;
    },
  },
});

export const { SETROLE } = authSlice.actions;

export default authSlice.reducer;
