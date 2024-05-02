import { useState } from "react";

interface CenteredPopupProps {
  url: string | URL | undefined;
  windowName: string | undefined;
  width: number;
  height: number;
  query?: Record<string, string | number | null>; // 쿼리 파라미터를 위한 선택적 속성
}

function useCenteredPopup({
  url,
  windowName,
  width,
  height,
  query,
}: CenteredPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    // 쿼리 객체를 URL 쿼리 스트링으로 변환
    const queryString = query ? new URLSearchParams(query).toString() : "";
    const fullUrl = queryString ? `${url}?${queryString}` : url; // 기존 URL에 쿼리 스트링 추가

    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const options = `width=${width},height=${height},left=${left},top=${top},resizable=no,toolbar=no,scrolling=no`;

    window.open(fullUrl, windowName, options);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return { isOpen, openPopup, closePopup };
}

export default useCenteredPopup;
