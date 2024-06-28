import { atom, atomFamily } from "recoil";

export const resultHistoryModalOpenAtom = atomFamily({
  key: "resultHistoryModalOpenAtom",
  default: false,
});

export const sampleUkeyAtom = atom({
  key: "sampleUkeyAtom",
  default: "",
});
