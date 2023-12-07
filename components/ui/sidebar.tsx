"use client";

import React from "react";
import LogoTheme from "./logo-theme";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCollapsedSideNav } from "@/lib/redux/features/settingsSlice";
import useWindowSize from "@/hooks/useWindowsSize";

interface SidebarProps {
  logout: React.JSX.Element;
}
function Sidebar({ logout }: SidebarProps) {
  const pathname = usePathname();
  const { navCollapsed } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const size = useWindowSize();

  const handleToggleSidebar = () => {
    dispatch(toggleCollapsedSideNav(!navCollapsed));
  };

  const item = [
    { title: "Dashboad", href: "/", onClick: handleToggleSidebar },
    {
      title: "Profile Penyewa",
      href: "/renter-profile",
      onClick: handleToggleSidebar,
    },
    {
      title: "Rumah Sewa",
      href: "/rent-house",
      onClick: handleToggleSidebar,
    },
    {
      title: "Laporan Penyewa",
      href: "/renter-report",
      onClick: handleToggleSidebar,
    },
  ];

  return (
    <div
      className={`flex-col bg-zinc-200 dark:bg-zinc-900 px-2 md:px-5 w-52 md:w-72 h-screen z-20 flex top-0 md:sticky ${
        navCollapsed || size.width >= 767
          ? "fixed block mt-16 md:mt-0"
          : "hidden"
      }`}
    >
      <div className="w-14 mx-auto mt-3 mb-10 ">
        <LogoTheme />
      </div>

      <div className="flex flex-col gap-3 w-full">
        {item.map((data) => (
          <Link
            className={`px-1 py-2 transition rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-700 hover:text-gray-200 flex justify-center ${
              pathname === data.href &&
              "bg-zinc-700 dark:bg-zinc-600 text-white"
            }`}
            key={data.title}
            href={data.href}
            onClick={size.width <= 767 ? data.onClick : () => {}}
          >
            {data.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto mb-40 md:mb-24">{logout}</div>
    </div>
  );
}

export default Sidebar;
