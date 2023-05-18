import React from 'react';
import CJLogo from '../../../public/img/logo/CJ_Bioscience_logo.png';
import Image from 'next/image';
interface LogoProps {
  width?: number;
  height?: number;
}

const CJBSLogo = ({ width = 156, height = 55 }: LogoProps) => {
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
