import React from "react";
import { ModeToggle } from "../toggle-theme";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Topbar() {
  return (
    <div className="flex justify-between shadow-lg dark:shadow-lg-dark px-3 md:px-14 py-2 items-center mb-6">
      <RxHamburgerMenu size={20} className="cursor-pointer" />

      <div className="flex items-center gap-8">
        <div>
          <h1 className="scroll-m-20 text-lg tracking-tight">Halo, user!</h1>
          <h2 className="scroll-m-20 text-md tracking-tight text-gray-400">
            user role
          </h2>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
}
