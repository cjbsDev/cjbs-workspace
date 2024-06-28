import React from "react";
import { ModalAction, OutlinedButton } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import { useRecoilValue } from "recoil";
import { sampleUkeyAtom } from "../../recoil/atoms/sampleUkeyAtom";
import { GET, POST, PUT } from "api";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { Box, Stack } from "@mui/material";

const SampleActionBtns = () => {
  const getSampleUkeyList = useRecoilValue(sampleUkeyAtom);
  const searchParams = useSearchParams();
  // const uKey = searchParams.get("uKey");
  const samplePrevList = searchParams.get("samplePrevList");
  const sampleKeys = samplePrevList?.replace(/,\s*$/, "").split(",") || [];

  console.log("%$%$%$%$%$%", sampleKeys.includes("null"));

  // const { mutate } = useSWRConfig();

  const handleClose = () => {
    window.close();
  };

  const sampleAdd = async () => {
    console.log("AAAAAADDDDDD", getSampleUkeyList);

    if (getSampleUkeyList.length === 0) toast("샘플을 선택해 주세요.");

    // const upDateSampleUkeyList = getSampleUkeyList
    //   .map((row) => row.sampleUkey)
    //   .toString();

    // const upDateSampleUkeyList =
    //   sampleKeys.toString() === null
    //     ? getSampleUkeyList.map((row) => row.sampleUkey).toString()
    //     : [
    //         ...getSampleUkeyList.map((row) => row.sampleUkey),
    //         ...sampleKeys,
    //       ].filter((value, index, self) => self.indexOf(value) === index);

    const upDateSampleUkeyList = sampleKeys.includes("null")
      ? getSampleUkeyList.map((row) => row.sampleUkey).toString()
      : [
          ...getSampleUkeyList.map((row) => row.sampleUkey),
          ...sampleKeys.filter((key) => key !== null), // null 값을 제외하고 배열에 추가
        ]
          .filter((value, index, self) => self.indexOf(value) === index)
          .toString(); // 중복 제거하고 문자열로 변환

    console.log("upDateSampleUkeyList", upDateSampleUkeyList);

    try {
      const res = await GET(
        `/ots/sample/info?sampleUkeyList=${upDateSampleUkeyList}`,
      );
      console.log("SSSSSSSSS", res.data);
      const { orderInfo, sampleInfo, sampleUkeyList } = res.data;
      const event = new CustomEvent("mySampleSimpleData", {
        detail: {
          sampleLists: getSampleUkeyList,
          orderInfo: orderInfo,
          sampleInfo: sampleInfo,
          sampleUkeyList: sampleUkeyList,
        },
      });
      window.opener.dispatchEvent(event);
      window.close();
    } catch (error) {}
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={1}>
      <OutlinedButton
        buttonName="취소"
        onClick={handleClose}
        color="secondary"
      />
      <LoadingButton
        // loading={isLoading}
        variant="contained"
        onClick={sampleAdd}
        disabled={getSampleUkeyList.length === 0 ? true : false}
      >
        샘플 추가
      </LoadingButton>
    </Stack>
  );
};

export default SampleActionBtns;
