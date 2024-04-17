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
  // const params = useParams();
  // const ukey = params.slug;

  const searchParams = useSearchParams();
  const uKey = searchParams.get("uKey");

  const { mutate } = useSWRConfig();

  const handleClose = () => {
    window.close();
  };

  const sampleAdd = async () => {
    console.log("AAAAAADDDDDD", getSampleUkeyList);

    if (getSampleUkeyList.length === 0) toast("샘플을 선택해 주세요.");

    const upDateSampleUkeyList = getSampleUkeyList
      .map((row) => row.sampleUkey)
      .toString();

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

    // const event = new CustomEvent("mySampleSimpleData", {
    //   // detail: getSampleUkeyList,
    //   detail: {
    //     sampleLists: getSampleUkeyList,
    //     orderInfo: "@@@@^^^^^",
    //     sampleInfo: "",
    //     sampleUkeyList: "",
    //   },
    // });
    // window.opener.dispatchEvent(event);
    // window.close();

    // const body = {
    //   sampleUkeyList: getSampleUkeyList,
    // };
    // try {
    //   const res = await POST(`/run/add/${uKey}`, body);
    //   console.log("RUN 샘플 추가 성공 여부>>>> ==>>", res.success);
    //
    //   if (res.success) {
    //     mutate(`/run/sample/${uKey}?page=1&size=20`);
    //     handleClose();
    //   } else {
    //     toast(res.message);
    //   }
    // } catch (error: any) {
    //   console.error(
    //     "샘플 추가 오류>>>>",
    //     error.response?.data?.data || error.message,
    //   );
    // } finally {
    //   // setIsLoading(false);
    // }
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
