import axios from "axios";
import { addStockLists, updateStockDetails } from "../reducers/appReducer";
import { notifyError } from "../../utils/Notification";

const apiToken = "sk_76f47ac67b6141869374e02a59193019";

export const asyncFetchStockLists = () => async (dispatch) => {
  console.log("fetchStockLists called");
  //   const { data } = await
  axios
    .get(`https://cloud.iexapis.com/stable/ref-data/symbols?token=${apiToken}`)
    .then(({ data }) => {
      dispatch(addStockLists(data));
    })
    .catch((err) => {
      console.log(err);
      if (err.code == "ERR_NETWORK") {
        console.log("Network error");
        notifyError("Network error");
      }
    });
};

export const asyncGetStockDetails = (symbol) => async (dispatch) => {
  console.log("GetStockDetails called ---", { symbol });
  axios
    .get(
      `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${apiToken}`
    )
    .then(({ data }) => {
      // console.log(data);
      dispatch(updateStockDetails(data));
      let timeout;
      if (!data.isUSMarketOpen) {
        const usMarketOpeningTimeET = new Date();
        usMarketOpeningTimeET.setUTCHours(13, 30, 0, 0);
        usMarketOpeningTimeET.setDate(usMarketOpeningTimeET.getDate() + 1);

        const indiaTimeZoneOffset = 5.5 * 60 * 60 * 1000;
        const currentTimeIndia = new Date(
          new Date().getTime() + indiaTimeZoneOffset
        );

        timeout = usMarketOpeningTimeET - currentTimeIndia;
        console.log("US MARKET CLOSED--", timeout);
      } else {
        timeout = 3000;
        console.log("US MARKET OPEN--", timeout);
      }

      // setTimeout(() => {
      //   console.log("calling getStockDetails---", timeout);
      //   dispatch(asyncGetStockDetails(symbol));
      // }, timeout);
    })
    .catch((err) => {
      if (err.code == "ERR_NETWORK") {
        console.log("Network error");
        notifyError("Network error");
      }
    });
};
