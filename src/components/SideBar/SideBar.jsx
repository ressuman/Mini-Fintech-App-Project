import { PiSquaresFourFill } from "react-icons/pi";
import { BiLogOut, BiMessageSquareDetail } from "react-icons/bi";
import { TbCirclesRelation } from "react-icons/tb";
import { Link } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  const links = [
    {
      name: "dashboard",
      href: "/dashboard",
      icon: <PiSquaresFourFill />,
    },
    {
      name: "transactions",
      href: "/dashboard/transactions",
      icon: <BiMessageSquareDetail />,
    },
    {
      name: "update",
      href: "/update",
      icon: <TbCirclesRelation />,
    },
  ];

  const listItem = links.map((link) => {
    const { name, icon, href } = link;

    return (
      <Link
        href={href}
        key={name}
        className="text-slate-600 hover:text-cyan-500 transition-colors duration-100 ease-in-out capitalize"
      >
        <div className="text-3xl">{icon}</div>
        <p className="ml-3">{name}</p>
      </Link>
    );
  });
  return (
    <div className="px-5 py-8 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-y-5">{listItem}</div>
      <div className="">
        <Link
          href="/login"
          className="text-slate-600 hover:text-cyan-500 transition-colors duration-100 ease-in-out"
        >
          <div className="text-3xl">
            <BiLogOut />
          </div>
          <p className="ml-3">Logout</p>
        </Link>
      </div>
    </div>
  );
}
