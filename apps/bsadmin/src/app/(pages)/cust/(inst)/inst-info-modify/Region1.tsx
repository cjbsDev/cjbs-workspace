import useSWR from "swr";
import fetcher from "../../../../func/fetcher";
import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import React from "react";
import Region2 from "./Region2";

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
  // const { data: domesticData2 } = useSWR(
  //   () =>
  //     `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=` +
  //     watch("region1Gc"),
  //   fetcher
  // );

  // if (!domesticData2) return "loading...";

  const dddd = [
    {
      value: "43000",
      codeValue: "chungbuk",
      optionName: "충청북도",
    },
    {
      value: "44000",
      codeValue: "chungnam",
      optionName: "충청남도",
    },
    {
      value: "45000",
      codeValue: "jeonbuk",
      optionName: "전라북도",
    },
    {
      value: "46000",
      codeValue: "jeonnam",
      optionName: "전라남도",
    },
    {
      value: "47000",
      codeValue: "gyeongbuk",
      optionName: "경상북도",
    },
    {
      value: "48000",
      codeValue: "gyeongnam",
      optionName: "경상남도",
    },
    {
      value: "50000",
      codeValue: "jeju",
      optionName: "제주특별자치도",
    },
  ];

  console.log("region1 data", domesticData.data);
  // console.log("region2 data", domesticData2.data);
  console.log("getValue1", getValues("region1Gc"));
  console.log("getValue2", getValues("region2Gc"));

  return (
    <>
      <SelectBox inputName="region1Gc" options={domesticData.data} />
      {/*<SelectBox inputName="region2Gc" options={domesticData2.data} />*/}
      <LazyRegion2 />
    </>
  );
}
