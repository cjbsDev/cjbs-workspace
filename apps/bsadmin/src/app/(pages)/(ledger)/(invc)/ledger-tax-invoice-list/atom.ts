import { atom } from "recoil";
import dayjs from "dayjs";

export const rmnPriceDetailShowInfoAtom = atom({
  key: "rmnPriceDetailShowInfoAtom",
  default: false,
});

export const isBillAndRequestAtom = atom({
  key: "isBillAndRequestAtom",
  default: false,
});

export const invcStartYearAtom = atom({
  key: "invcStartYearAtom",
  default: dayjs().year(),
});

export const invcStartMonthAtom = atom({
  key: "invcStartMonthAtom",
  default: dayjs().month(0).get("month") + 1,
});

export const invcEndYearAtom = atom({
  key: "invcEndYearAtom",
  default: dayjs().year(),
});

export const invcEndMonthAtom = atom({
  key: "invcEndMonthAtom",
  default: dayjs().month() + 1,
});
