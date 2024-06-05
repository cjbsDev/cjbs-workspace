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

export const startYearAtom = atom({
  key: "startYearAtom",
  default: dayjs().year(),
});

export const startMonthAtom = atom({
  key: "startMonthAtom",
  default: dayjs().month(0).get("month") + 1,
});

export const endYearAtom = atom({
  key: "endYearAtom",
  default: dayjs().year(),
});

export const endMonthAtom = atom({
  key: "endMonthAtom",
  default: dayjs().month() + 1,
});
