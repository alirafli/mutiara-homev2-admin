import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

function LogoTheme() {
  const [logo, setLogo] = useState<string>("/logo.png");
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setLogo("/logo_white.png");
    } else {
      setLogo("/logo.png");
    }
  }, [theme]);

  return (
    <Image
      src={logo}
      width={200}
      height={200}
      layout="responsive"
      alt="mutiara home logo"
      priority
    />
  );
}

export default LogoTheme;
