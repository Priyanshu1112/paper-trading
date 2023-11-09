const Navbar = () => {
  return (
    <div className="w-full h-[8vh]">
      <nav className="w-full h-full  px-[2vw] flex items-center justify-between bg-slate-800">
        <div className="user h-[5vh] w-[5vh] text-sm font-bold  flex items-center justify-center bg-cyan-500 rounded-full">
          P
        </div>
        <div className="items-center justify-center text-[2.5vmax] flex gap-[3vw]">
          <i className="ri-stackshare-line"></i>
          <i className="ri-compass-3-line "></i>
          <i className="ri-more-2-line text-[3vmax] font-extrabold"></i>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
