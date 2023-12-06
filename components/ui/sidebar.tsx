"use client";

import React from "react";
import LogoTheme from "./logo-theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { IoPeople } from "react-icons/io5";
import { BsFillHousesFill } from "react-icons/bs";
import { TbReportSearch } from "react-icons/tb";

function Sidebar() {
  const pathname = usePathname();

  const item = [
    { title: "Dashboad", href: "/", icon: <MdDashboard size={20} /> },
    {
      title: "Profile Penyewa",
      href: "/renter-profile",
      icon: <IoPeople size={20} />,
    },
    {
      title: "Rumah Sewa",
      href: "/rent-house",
      icon: <BsFillHousesFill size={20} />,
    },
    {
      title: "Laporan Penyewa",
      href: "/renter-report",
      icon: <TbReportSearch size={20} />,
    },
  ];

  return (
    <div className=" flex-col bg-zinc-200 dark:bg-zinc-900 px-2 md:px-5 w-16 md:w-72 h-screen flex sticky top-0">
      <div className="w-auto md:w-14 mx-auto mt-3 mb-10 ">
        <LogoTheme />
      </div>

      <div className="flex flex-col gap-3 w-full">
        {item.map((data) => (
          <Link
            className={`px-1 py-2 transition rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-700 hover:text-gray-200 flex md:block justify-center ${
              pathname === data.href &&
              "bg-zinc-700 dark:bg-zinc-600 text-white"
            }`}
            key={data.title}
            href={data.href}
          >
            <div className="hidden md:block">{data.title}</div>
            <div className="block md:hidden">{data.icon}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
