import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";
import fetcher from "../../func/fetcher";

export default function Region2() {
  const { watch } = useFormContext();
  // const getRegion1Gc = watch("region1Gc");
  // if (getRegion1Gc) {
  //     // 1레벨에서 선택한 후에 실행
  // }

  const { data: domesticData2 } = useSWR(
    () =>
      `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=` +
      watch("region1Gc"),
    fetcher,
    {
      suspense: true,
    }
  );
  return <SelectBox inputName="region2Gc" options={domesticData2.data} />;
}
