import { atom } from "recoil";

const today: Date = new Date();
const defYear: Number = today.getFullYear();
const defMonth: Number = today.getMonth() + 1;

// console.log("ATOM", defYear, defMonth);

export const dashboardYearAtom = atom({
  key: "dashboardYearAtom",
  default: defYear,
});

export const dashboardMonthAtom = atom({
  key: "dashboardMonthAtom",
  default: defMonth,
});

export const chartTypeAtom = atom({
  key: "chartTypeAtom",
  default: "line",
});
