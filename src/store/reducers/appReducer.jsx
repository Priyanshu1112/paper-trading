import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stockLists: null,
  stockDetails: {},
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    addStockLists: (state, action) => {
      state.stockLists = action.payload;
    },
    updateStockDetails: (state, action) => {
      state.stockDetails[action.payload.symbol] = action.payload;
    },
  },
});

export const { addStockLists, updateStockDetails } = appReducer.actions;

export default appReducer.reducer;
