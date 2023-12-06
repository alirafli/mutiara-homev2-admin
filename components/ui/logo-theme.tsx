import React from "react";
import Image from "next/image";

function LogoTheme() {
  return (
    <>
      <Image
        src="/logo.png"
        width={200}
        height={200}
        layout="responsive"
        alt="mutiara home logo"
        priority
        className="block dark:hidden"
      />

      <Image
        src="/logo_white.png"
        width={200}
        height={200}
        layout="responsive"
        alt="mutiara home logo"
        priority
        className="hidden dark:block"
      />
    </>
  );
}

export default LogoTheme;
