import React from 'react';
import CJLogo from '../../../public/img/logo/logo-en.png';
import Image from 'next/image';
interface LogoProps {
  width?: number;
  height?: number;
}

const CJBSLogoEn = ({ width = 110, height = 34 }: LogoProps) => {
  return <Image src={CJLogo} alt='CJ바이오사이언스' width={width} height={height} quality={100} />;
};

export default CJBSLogoEn;
