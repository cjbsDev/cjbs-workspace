import { atom } from "recoil";

export const totalYearAtom = atom({
  key: "totalYearAtom",
  default: 2023,
});

export const totalMonthAtom = atom({
  key: "totalMonthAtom",
  default: 11,
});
