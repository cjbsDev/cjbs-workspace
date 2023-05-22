import React from 'react';
import CJLogo from '../../../public/img/logo/CJ_Bioscience_logo.png';
import Image from 'next/image';
interface LogoProps {
  width?: number;
  height?: number;
}

const CJBSLogo = ({ width = 120, height = 36.52 }: LogoProps) => {
  return (
    <div>
      <Image
        src={CJLogo}
        alt="CJ바이오사이언스"
        width={width}
        height={height}
      />
    </div>
  );
};

export default CJBSLogo;
