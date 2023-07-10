import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";
import fetcher from "../../../../func/fetcher";

export default function Region2() {
  const { setValue, getValues, watch } = useFormContext();
  const { data: domesticData2 } = useSWR(
    () =>
      `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=` +
      watch("region1Gc"),
    fetcher,
    {
      suspense: true,
    }
  );
  return (
    <>
      <SelectBox inputName="region2Gc" options={domesticData2.data} />
    </>
  );
}
