"use client";

import React from "react";
import LogoTheme from "./logo-theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  const item = [
    { title: "Dashboad", href: "/" },
    { title: "Profile Penyewa", href: "/renter-profile" },
    { title: "Rumah Sewa", href: "/rent-house" },
    { title: "Laporan Penyewa", href: "/renter-report" },
  ];

  return (
    <div className="flex flex-col mr-6 bg-zinc-200 dark:bg-zinc-900 px-5 w-72 h-screen shadow-lg dark:shadow-lg-dark">
      <div className="w-14 mx-auto mt-3 mb-10">
        <LogoTheme />
      </div>

      <div className="flex flex-col gap-3 w-full">
        {item.map((data) => (
          <Link
            className={`px-1 py-2 transition rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-700 hover:text-gray-200 ${
              pathname === data.href && "bg-zinc-700 dark:bg-zinc-600 text-white"
            }`}
            key={data.title}
            href={data.href}
          >
            {data.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
