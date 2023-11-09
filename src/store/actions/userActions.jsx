import { addWatchList, deleteWatchList } from "../reducers/userReducer";

export const asyncUpdateWatchList = (stockSymbol) => async (dispatch) => {
  dispatch(addWatchList(stockSymbol));
};

export const asyncDeleteWatchList = (stockSymbol) => async (dispatch) => {
  dispatch(deleteWatchList(stockSymbol));
};
