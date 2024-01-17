import { atom } from "recoil";

export const rmnPriceDetailShowAtom = atom({
  key: "rmnPriceDetailShowAtom",
  default: false,
});

export const vatAtom = atom({
  key: "vatAtom",
  default: 0,
});

export const totalPriceAtom = atom({
  key: "totalPriceAtom",
  default: 0,
});

export const totalSupplyPriceAtom = atom({
  key: "totalSupplyPriceAtom",
  default: 0,
});

export const instModalShowAtom = atom({
  key: "instModalShowAtom",
  default: false,
});
export const agncModalShowAtom = atom({
  key: "agncModalShowAtom",
  default: false,
});
