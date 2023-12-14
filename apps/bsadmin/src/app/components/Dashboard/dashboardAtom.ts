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
export const dashboardYearAtom = atom({
  key: "dashboardYearAtom",
  default: year,
});

export const dashboardMonthAtom = atom({
  key: "dashboardMonthAtom",
  default: month,
});

export const dashboardQuarterAtom = atom({
  key: "dashboardQuarterAtom",
  default: "BS_2100004", // 상수로 대체 가능
});

export const dashboardHalfAtom = atom({
  key: "dashboardHalfAtom",
  default: "BS_2100005", // 상수로 대체 가능
});

export const dashboardTypeCcAtom = atom({
  key: "dashboardTypeCcAtom",
  default: "BS_2100003", // 상수로 대체 가능
});

export const dashboardTargetAtom = atom({
  key: "dashboardTargetAtom",
  default: {
    monthTarget: month,
    quarterTarget: quarter,
    halfTarget: half,
  },
});

export const chartTypeAtom = atom({
  key: "chartTypeAtom",
  default: "line", // 상수로 대체 가능
});
