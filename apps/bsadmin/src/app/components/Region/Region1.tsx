import { SelectBox } from "cjbsDSTM";
import dynamic from "next/dynamic";
import React from "react";
import getCodeRegionLev01 from "../../data/getCodeRegionLev01.json";

const LazyRegion2 = dynamic(() => import("./Region2"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Region1() {
  return (
    <>
      <SelectBox inputName="region1Gc" options={getCodeRegionLev01} />
      <LazyRegion2 />
    </>
  );
}
