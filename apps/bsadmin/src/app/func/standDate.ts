import { addDays, subDays } from "date-fns";

export const standDate = (getStandDate = new Date()) => {
  const anlsDttm = new Date(getStandDate);

  const nowMonth: number = anlsDttm.getMonth() + 1;
  return [
    {
      start: subDays(anlsDttm.setDate(1), 1),
      end: addDays(new Date(anlsDttm.setMonth(+nowMonth)).setDate(5), 0),
    },
  ];
};
