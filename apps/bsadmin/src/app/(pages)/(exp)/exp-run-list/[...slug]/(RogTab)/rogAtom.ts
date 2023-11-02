import { atom } from "recoil";

export const updateSampleLogListAtom = atom({
  key: "updateSampleLogListAtom",
  default: {
    pageInfo: {
      totalElements: 0,
    },
    updateSampleLogList: [],
  },
});
