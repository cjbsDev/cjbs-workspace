import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import useCenteredPopup from "../../../../../../hooks/useNewCenteredPopup";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { sampleAddAtom, sampleAddDataAtom } from "./sampleAddAtom";
import SampleAddList from "./SampleAddList";

// const LazySampleAddList = dynamic(() => import("./SampleAddList"), {
//   ssr: false,
//   loading: () => <Typography variant="body2">Loading...</Typography>,
// });

const DataTable = () => {
  const [sampleKyList, setSampleKyList] = useState(null);
  const { getValues, control, watch, setValue } = useFormContext();
  const [sampleData, setSampleData] = useRecoilState(sampleAddDataAtom);

  const { isOpen, openPopup, closePopup } = useCenteredPopup({
    url: "/sampleSimpleListPopup",
    windowName: "샘플 검색",
    width: 800,
    height: 600,
    query: { samplePrevList: sampleData }, // 여기에 원하는 쿼리 파라미터를 추가
  });

  useEffect(() => {
    const handleSampleData = (e) => {
      const { sampleUkeyList } = e.detail;

      console.log("SampleUkeyList*******", sampleUkeyList);

      // Avoid adding duplicates
      // sampleLists.forEach((newItem) => {
      //   if (!fields.some((item) => item.sampleUkey === newItem.sampleUkey)) {
      //     append(newItem); // Use append method to add new items to the field array
      //   }
      // });

      // setValue("otsSampleDetailList", sampleLists);
      // setValue("orderInfo", orderInfo);
      // setValue("sampleInfo", sampleInfo);
      setValue("sampleUkeyList", sampleUkeyList);
      setSampleData(sampleUkeyList);
      // setSmpAdd(sampleUkeyList);
      setSampleKyList(sampleUkeyList);
    };

    window.addEventListener("mySampleSimpleData", handleSampleData);
    return () =>
      window.removeEventListener("mySampleSimpleData", handleSampleData);
  }, [setValue]);

  return (
    <>
      <SampleAddList openPopup={openPopup} />
    </>
  );
};

export default DataTable;
