import useSWR from "swr";
import fetcher from "../../../../func/fetcher";
import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import React from "react";

const LazyRegion2 = dynamic(() => import("./Region2"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Region1() {
  const { getValues, watch } = useFormContext();
  const { data: domesticData } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002`,
    fetcher,
    {
      suspense: true,
    }
  );

  return (
    <>
      <SelectBox inputName="region1Gc" options={domesticData.data} />
      <LazyRegion2 />
    </>
  );
}
