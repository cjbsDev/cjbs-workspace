import { atom } from "recoil";

const today: Date = new Date();
const defYear: number = today.getFullYear();
const defMonth: number = today.getMonth() + 1;

let currentQuarter: number;
if (defMonth <= 3) {
  currentQuarter = 1;
} else if (defMonth <= 6) {
  currentQuarter = 2;
} else if (defMonth <= 9) {
  currentQuarter = 3;
} else {
  currentQuarter = 4;
}

let currentHalf: number;
if (currentQuarter <= 2) {
  currentHalf = 1;
} else {
  currentHalf = 2;
}

export const dashboardYearAtom = atom({
  key: "dashboardYearAtom",
  default: defYear,
});

export const dashboardMonthAtom = atom({
  key: "dashboardMonthAtom",
  default: defMonth,
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

export const dashboardTargetAtom = atom({
  key: "dashboardTargetAtom",
  default: {
    monthTarget: defMonth,
    quarterTarget: currentQuarter,
    halfTarget: currentHalf,
  },
});

export const dashboardNewTargetAtom = atom({
  key: "dashboardNewTargetAtom",
  default: {
    monthTarget: defMonth,
    quarterTarget: 4,
    halfTarget: 2,
  },
});

export const chartTypeAtom = atom({
  key: "chartTypeAtom",
  default: "line",
});
