"use client";

import React from "react";
import { ModeToggle } from "../toggle-theme";
import { RxHamburgerMenu } from "react-icons/rx";
import { User } from "@/types/user";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { toggleCollapsedSideNav } from "@/lib/redux/features/settingsSlice";
import { IoClose } from "react-icons/io5";

interface TopBarProps {
  user?: User;
}

export default function Topbar({ user }: TopBarProps) {
  const dispatch = useAppDispatch();

  const { navCollapsed } = useAppSelector((state) => state.settingsReducer);
  const handleToggleSidebar = () => {
    dispatch(toggleCollapsedSideNav(!navCollapsed));
  };

  return (
    <div className="flex justify-between bg-zinc-200 dark:bg-zinc-900 shadow-lg dark:shadow-lg-dark px-3 md:px-14 py-2 items-center mb-6">
      {navCollapsed ? (
        <IoClose
          size={20}
          className="cursor-pointer"
          onClick={handleToggleSidebar}
        />
      ) : (
        <RxHamburgerMenu
          size={20}
          className="cursor-pointer"
          onClick={handleToggleSidebar}
        />
      )}

      <div className="flex items-center gap-8">
        <div>
          <h1 className="scroll-m-20 text-lg tracking-tight">
            Halo, {user?.name ?? "..."}!
          </h1>
          <h2 className="scroll-m-20 text-md tracking-tight text-zinc-500">
            {user?.role ?? "..."}
          </h2>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
