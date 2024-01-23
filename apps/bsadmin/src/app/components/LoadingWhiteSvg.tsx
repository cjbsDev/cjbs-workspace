import React from "react";
import Image from "next/image";
const LoadingWhiteSvg = () => {
  return (
    <Image
      alt="Loading..."
      src="/svg/loading_wh.svg"
      width={20}
      height={20}
      priority
    />
  );
};

export default LoadingWhiteSvg;
