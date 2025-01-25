import React from "react";

import logo from "../../public/nodata.png"; // Adjust the path to your logo image
import Image from "next/image";

export const NoData = () => {
  return (
    <div className="flex justify-center items-center ">
      {/* Logo */}
      <Image src={logo} alt="logo" width={500} height={400}/>
    </div>
  );
};
