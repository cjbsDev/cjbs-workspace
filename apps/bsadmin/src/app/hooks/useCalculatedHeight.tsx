import { useState, useEffect } from "react";

const useCalculatedHeight = (subtractHeight) => {
  const [height, setHeight] = useState(window.innerHeight - subtractHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - subtractHeight);
    };

    window.addEventListener("resize", handleResize);

    // 초기 값 설정
    handleResize();

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => window.removeEventListener("resize", handleResize);
  }, [subtractHeight]);

  return height;
};

export default useCalculatedHeight;
