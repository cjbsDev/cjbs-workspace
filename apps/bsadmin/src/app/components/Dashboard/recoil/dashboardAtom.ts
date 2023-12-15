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
export const startYearAtom = atom({
  key: "startYearAtom",
  default: year,
});

export const endYearAtom = atom({
  key: "endYearAtom",
  default: year,
});

export const dashboardYearAtom = atom({
  key: "dashboardYearAtom",
  default: year,
});

export const startMonthAtom = atom({
  key: "startMonthAtom",
  default: 1,
});

export const endMonthAtom = atom({
  key: "endMonthAtom",
  default: month,
});

export const dashboardMonthAtom = atom({
  key: "dashboardMonthAtom",
  default: month,
});

export const dashboardQuarterAtom = atom({
  key: "dashboardQuarterAtom",
  default: "BS_2100004",
});

export const dashboardHalfAtom = atom({
  key: "dashboardHalfAtom",
  default: "BS_2100005",
});

export const dashboardTypeCcAtom = atom({
  key: "dashboardTypeCcAtom",
  default: "BS_2100003",
});

export const dashboardGroupCcAtom = atom({
  key: "dashboardGroupCcAtom",
  default: "BS_2200001",
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
  default: "line",
});

export const agncTopSelectAtom = atom({
  key: "agncTopSelectAtom",
  default: "",
});

export const instTopSelectAtom = atom({
  key: "instTopSelectAtom",
  default: "",
});

export const groupTargetAtom = atom({
  key: "groupTargetAtom",
  default: "",
});
