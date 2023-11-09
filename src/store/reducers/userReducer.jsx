import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchList: [],
  // availableMargin :
  // totalPortfolio :
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addWatchList: (state, action) => {
      state.watchList.push(action.payload);
    },
    deleteWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { addWatchList, deleteWatchList } = userReducer.actions;

export default userReducer.reducer;
