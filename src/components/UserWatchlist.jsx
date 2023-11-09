import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetStockDetails } from "../store/actions/appActions";
import { TailSpin } from "react-loader-spinner";

const UserWatchlist = () => {
  const dispatch = useDispatch();
  const { watchList } = useSelector((state) => state.user);
  const { stockDetails } = useSelector((state) => state.app);

  useEffect(() => {
    if (watchList) {
      watchList.forEach((wl) => {
        dispatch(asyncGetStockDetails(wl));
      });
    }
  }, [watchList]);

  return (
    <div className=" mt-[3vmax] rounded-lg max-h-[60vh] overflow-auto">
      {watchList?.map((wl) => {
        const detail = stockDetails[wl];
        return detail ? (
          <div
            className="min-h-[6vh] bg-slate-800 flex gap-[2vmax] justify-between  my-[2vmin] py-[1vmin] px-[1.5vmin] rounded-lg"
            key={wl}
          >
            <div className="max-w-[60%] font-bold text-start">
              <p className="text-[3.5vmin] ">{detail?.companyName}</p>
              <p className="text-[3vmin] text-slate-300">{detail?.symbol}</p>
            </div>
            <div className="text-end text-[3.5vmin]">
              <p>{detail?.latestPrice}</p>
              <p
                className={`${
                  detail.change > 0
                    ? "text-green-500"
                    : detail.change < 0
                    ? "text-red-500"
                    : "text-slate-200"
                } text-[3.2vmin]`}
              >
                {detail?.change}{" "}
                {detail.changePercent ? `(${detail?.changePercent}%)` : ""}
              </p>
            </div>
          </div>
        ) : (
          <div
            className="min-h-[6vh] flex gap-[2vmax] justify-center "
            key={detail?.symbol}
          >
            <TailSpin
              height="2vh"
              width="2vh"
              color="#fff"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />{" "}
            <p>Fetching Details</p>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default UserWatchlist;
