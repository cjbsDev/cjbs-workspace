import { atom } from "recoil";

export const sampleAddAtom = atom({
  key: "sampleAddAtom",
  default: [],
});

export const sampleAddDataAtom = atom({
  key: "sampleAddDataAtom",
  default: "",
});

export const toggleClearedAtom = atom({
  key: "toggleClearedAtom",
  default: false,
});
