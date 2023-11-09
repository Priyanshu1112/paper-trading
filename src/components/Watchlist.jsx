import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncFetchStockLists } from "../store/actions/appActions";
import { asyncUpdateWatchList } from "../store/actions/userActions";
import { TailSpin } from "react-loader-spinner";
import { notifyInfo } from "../utils/Notification";
import UserWatchlist from "./UserWatchlist";

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state) => state.user);
  const { stockLists } = useSelector((state) => state.app);
  const [userInput, setUserInput] = useState("");
  const [matchedItems, setMatchedItems] = useState([]);
  const [searchBody, setSearchBody] = useState(false);

  useEffect(() => {
    if (!stockLists) {
      // console.log("calling fetchStockLists");
      dispatch(asyncFetchStockLists());
    }
  }, []);

  useEffect(() => {
    if (userInput != "") {
      setSearchBody(true);
    } else {
      setSearchBody(false);
    }
  }, [matchedItems, userInput]);

  const handleWatchListClick = (e) => {
    const watchListTabs = document.querySelectorAll(".watchList-tab");
    watchListTabs.forEach((watchList) => {
      watchList.classList.remove("bg-blue-500");
      watchList.classList.remove("bg-opacity-300");
    });
    e.target.classList.add("bg-blue-500");
    e.target.classList.add("bg-opacity-30");
  };

  const SearchHandler = (e) => {
    setUserInput(e.target.value);
    let match = stockLists?.filter((stockList) => {
      if (
        stockList.symbol.includes(e.target.value.toUpperCase()) ||
        stockList.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
        return stockList;
    });
    if (match) setMatchedItems(match.slice(0, 10));
  };

  const handleStockClick = (item) => {
    // console.log(item.symbol);
    setSearchBody(false);
    const isAlreadyAdded = watchList.some((stock) => {
      // console.log(stock, item.symbol);
      return stock == item.symbol;
    });
    if (!isAlreadyAdded) dispatch(asyncUpdateWatchList(item.symbol));
    else notifyInfo("Stock already present!");
  };

  return (
    <div className="w-full p-[2vmax]">
      {/* watchLists-tab */}
      <div className="flex gap-[2vw] text-blue-600  text-[1.8vmax]">
        <p
          onClick={handleWatchListClick}
          className="watchList-tab border-[1px] rounded-lg px-[2vmin] py-[.5vmin] border-blue-600 bg-blue-500 bg-opacity-30"
        >
          <i className="ri-star-line"></i> Primary{" "}
          <i className="ri-pushpin-fill bg-transparent text-red-500"></i>
        </p>
        <p
          // onClick={addWatchList-tab}
          className="watchList-tab border-[1px] rounded-lg px-[2vmin] py-[.5vmin] border-blue-600"
        >
          + Add More
        </p>
      </div>
      {/* watchList-body */}
      <div className=" p-[2vmax]">
        <div className="flex w-full items-center justify-between">
          <div
            className={`searchBar relative flex items-center ${
              searchBody ? "rounded-md rounded-b-none" : "rounded-md"
            } w-[90%]  bg-slate-700 p-[1vmin]`}
          >
            <i className="ri-search-line text-slate-300"></i>
            <input
              onChange={SearchHandler}
              value={userInput}
              className="w-full bg-transparent px-[1.5vmin] outline-none text-sm caret-blue-600"
              type="text"
              placeholder="Search for stock symbol or name..."
            />
            <div
              className={`${
                searchBody ? "block" : "hidden"
              } absolute w-full p-[2vmin] left-0 max-h-[30vh] bg-slate-700 overflow-auto rounded-b-md top-[100%] `}
            >
              {stockLists ? (
                matchedItems.length == 0 ? (
                  <p className="text-center border-t-[1px]">
                    <i className="ri-error-warning-fill me-[2vw]"></i>No matches
                    found!
                  </p>
                ) : (
                  matchedItems.map((item) => {
                    // console.log(item);
                    return (
                      <div
                        onClick={() => handleStockClick(item)}
                        key={item.symbol}
                        className="flex justify-between min-h-[6vh] gap-[1vmin] border-b-[1px] border-slate-500 py-[1vmin] text-[3.5vmin]"
                      >
                        <p className="text-start text-sm font-bold">
                          {item.symbol}
                        </p>
                        <p className="text-end">{item.name}</p>
                      </div>
                    );
                  })
                )
              ) : (
                <div className=" flex items-center justify-center border-t-[1px] gap-[2vw]">
                  <TailSpin
                    height="2vh"
                    width="2vh"
                    color="#fff"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                  <p>Fetching Stock List!!</p>
                </div>
              )}
            </div>
          </div>
          <i className="ri-filter-3-line"></i>
        </div>
        {/* user-watchlist */}
        <UserWatchlist />
      </div>
    </div>
  );
};

export default Watchlist;
