import { atom } from "recoil";

// 유틸리티 함수
const getCurrentDateInfo = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  const half = quarter <= 2 ? 1 : 2;
  return { year, month, quarter, half };
};

// 현재 날짜 정보 가져오기
const { year, month, quarter, half } = getCurrentDateInfo();

// 대시보드 상태 정의
export const currentYearAtom = atom({
  key: "currentYearAtom",
  default: year,
});

export const currentMonthAtom = atom({
  key: "currentMonthAtom",
  default: month,
});
