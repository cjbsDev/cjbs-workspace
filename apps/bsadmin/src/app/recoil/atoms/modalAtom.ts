import { atom } from "recoil";

export const memberManagementModalAtom = atom({
  key: "memberManagementModalAtom",
  default: false,
});

export const isDisabledAtom = atom({
  key: "isDisabledAtom",
  default: true,
});
