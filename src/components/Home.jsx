import { useState } from "react";
import Navbar from "./navbars/Navbar";
import Positions from "./Positions";
import Performance from "./Performance";
import Watchlist from "./Watchlist";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Positions");

  const handleTabClick = (e) => {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.classList.remove("text-blue-700");
      tab.classList.remove("border-blue-700");
      tab.classList.add("border-transparent");
    });
    e.target.classList.remove("border-transparent");
    e.target.classList.add("text-blue-700");
    e.target.classList.add("border-blue-700");
    setActiveTab(e.target.textContent);
  };

  return (
    <div className="w-full h-full bg-slate-900 text-white">
      <Navbar />
      <p className="font-bold text-lg px-[2vmax] py-[2vmin]">Paper Trading</p>
      <div className="flex justify-center text-sm">
        <p
          className="px-[2vmax] cursor-pointer py-[2vmin] border-b-[1px] b tab border-transparent"
          onClick={handleTabClick}
        >
          Watchlist
        </p>
        <p
          className="px-[2vmax] cursor-pointer py-[2vmin] border-b-[1px]  border-blue-700 text-blue-700 tab"
          onClick={handleTabClick}
        >
          Positions
        </p>
        <p
          className="px-[2vmax] cursor-pointer py-[2vmin] border-b-[1px] tab border-transparent"
          onClick={handleTabClick}
        >
          Performance
        </p>
      </div>
      <div>
        {activeTab == "Positions" ? (
          <Positions />
        ) : activeTab == "Watchlist" ? (
          <Watchlist />
        ) : (
          <Performance />
        )}
      </div>
    </div>
  );
};

export default Home;
