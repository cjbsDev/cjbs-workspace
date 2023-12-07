import { useState } from "react";

interface CenteredPopupProps {
  url: string | URL | undefined;
  windowName: string | undefined;
  width: number;
  height: number;
}

function useCenteredPopup(
  url: string | URL | undefined,
  windowName: string | undefined,
  width: number,
  height: number
) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const options = `width=${width},height=${height},left=${left},top=${top},resizable=no,toolbar=no`;

    window.open(url, windowName, options);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, openPopup, closePopup };
}

export default useCenteredPopup;
