import { atom } from "recoil";

export const totalYearAtom = atom({
  key: "totalYearAtom",
  default: 2023,
});

export const totalMonthAtom = atom({
  key: "totalMonthAtom",
  default: 11,
});

export const chartTypeAtom = atom({
  key: "chartTypeAtom",
  default: "line",
});
