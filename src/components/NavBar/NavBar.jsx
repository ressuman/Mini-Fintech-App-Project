import { User } from "@nextui-org/react";
import { FaBitcoin } from "react-icons/fa6";

export const NavBar = () => {
  return (
    <nav className="p-3 grid grid-cols-12">
      <div className="col-span-2 flex items-center relative">
        <div className="flex gap-x-2 items-center">
          <FaBitcoin className="text-3xl" />

          <h3 className="uppercase">Ressuman FinTech-App</h3>
        </div>
        <div className="bg-slate-200 h-[40px] w-[2px] rounded-3xl absolute right-2"></div>
      </div>
      <div className="col-span-7 flex items-center">
        <p className="text-xl">Hey 👋</p>
      </div>
      <div className="col-span-3 flex items-center pl-5">
        <User
          //
          description="User"
          avatarProps={{
            src: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
          }}
          className=""
        />
      </div>
    </nav>
  );
};
