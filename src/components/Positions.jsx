const Positions = () => {
  return (
    <div className="p-[2vmax] w-screen">
      <div className="h-[10vh] w-full text-center flex justify-between p-[2vmax]">
        <div className="w-[40%]">
          <p className="text-[4vmin]">₹10,00,000.00</p>
          <p className="text-[3.4vmin] text-slate-500">Total Portfolio</p>
        </div>
        <div className="w-[40%]">
          <p className="text-green-500">₹0.00</p>
          <p className="text-[3.4vmin] text-slate-500">Positions P&L</p>
        </div>
      </div>
      <div className="h-[10vh] bg-slate-700 rounded-lg w-full p-[2vmax] text-[3.5vmin]">
        <div className="flex w-full justify-between items-center">
          <p className=" text-slate-400">Available Margin</p>
          <p className="">₹10,00,000.00</p>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className=" text-slate-400">Invested Margin</p>
          <p className="">₹0.00</p>
        </div>
      </div>
      <div className="p-[2vmax]">Positions</div>
    </div>
  );
};

export default Positions;
