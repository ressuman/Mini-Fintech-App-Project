import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";
import SideBar from "../../components/SideBar/SideBar";
import { TransAndWallet } from "../../components/Transaction/TransAndWallet";

export default function DashBoard() {
  return (
    <>
      <div className="shadow-sm z-10">
        <NavBar />
      </div>
      <div className="grid grid-cols-12 min-h-[calc(100vh-64px)]">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-7 bg-slate-100">
          <Outlet />
        </div>
        <div className="col-span-3">
          <TransAndWallet />
        </div>
      </div>
    </>
  );
}
