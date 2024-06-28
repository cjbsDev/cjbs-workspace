import { atom } from "recoil";
import dayjs from "dayjs";

const getCurrentDateInfo = () => {
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  return { year, month };
};
const { year, month } = getCurrentDateInfo();

export const currentYearAtom = atom({
  key: "currentYearAtom",
  default: year,
});

export const currentMonthAtom = atom({
  key: "currentMonthAtom",
  default: month,
});
