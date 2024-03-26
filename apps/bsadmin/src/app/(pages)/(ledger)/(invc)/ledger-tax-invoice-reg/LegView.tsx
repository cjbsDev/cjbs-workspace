"use client";

import React, { useState } from "react";
import { Form, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { fetcher, POST, PUT } from "api";
import dayjs from "dayjs";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import DynamicBasicInfo from "./components/DynamicBasicInfo";
import ActionBtns from "./components/ActionBtns";
import DynamicViews from "./components/DynamicViews";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { formatDataForSubmission } from "./func/formatDataForSubmission";
import { defaultValues } from "./func/defaultValues";

const LegView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const invcUkey = searchParams.get("invcUkey");
  const anlsItstUkey = searchParams.get("anlsItstUkey");
  console.log("anlsItstUkey&&&&&&&&", anlsItstUkey);

  console.log("$%$%$%$%$%$%$%", type);

  const getSWRUrl = () => {
    if (type === "modify") {
      return `/invc/${invcUkey}`;
    }
    if (type === "anlsltst") {
      return `/invc/anlsItst/${anlsItstUkey}`;
    }
    return null;
  };

  const { data } = useSWR(getSWRUrl(), fetcher, { suspense: true });
  console.log("세금계산서 ==>>", data);

  const anlsltstDefaultValues = data
    ? {
        ...data,
      }
    : null;

  const modifyDefaultValues = data
    ? {
        ...data,
        issuDttm: data.issuDttm !== null ? dayjs(data.issuDttm).toDate() : "",
        dpstDttm: data.dpstDttm !== null ? dayjs(data.dpstDttm).toDate() : "",
      }
    : null;

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    // 요청 바디 구성
    // const bodyData = {
    //   ...data,
    //   // 날짜 포맷 변경
    //   dpstDttm: dayjs(data.dpstDttm).format("YYYY-MM-DD"),
    //   issuDttm: dayjs(data.issuDttm).format("YYYY-MM-DD"),
    // };
    //
    // if (bodyData.pymtInfoCc === "BS_1914001") {
    //   delete bodyData.productDetailList;
    //   delete bodyData.dpstPrice;
    //   delete bodyData.dpstDttm;
    //   delete bodyData.pyrNm;
    // } else if (bodyData.pymtInfoCc === "BS_1914003") {
    //   delete bodyData.productDetailList;
    // } else if (bodyData.pymtInfoCc === "BS_1914004") {
    //   delete bodyData.productDetailList;
    //   delete bodyData.dpstPrice;
    //   delete bodyData.dpstDttm;
    //   delete bodyData.pyrNm;
    // }

    try {
      // 요청 타입에 따른 API 호출
      // const apiCall = type === "modify" ? PUT : POST;
      // const res = await apiCall(`/invc`, bodyData);
      //
      // console.log("RES", res);

      const formattedData = formatDataForSubmission(formData, type);
      const response = await (type === "modify" ? PUT : POST)(
        `/invc`,
        formattedData,
      );

      if (response.success) {
        router.push(
          type === "modify"
            ? `/ledger-tax-invoice-list/${invcUkey}`
            : "/ledger-tax-invoice-list",
        );
        setIsDisabled(true);
      } else {
        toast.error(response.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("세금계산서 등록 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={
        type === "modify"
          ? modifyDefaultValues
          : type === "anlsltst"
            ? anlsltstDefaultValues
            : defaultValues
      }
    >
      <Box sx={{ mb: 4 }}>
        <Title1
          titleName={`세금계산서 ${type === "modify" ? "수정" : "등록"}`}
        />
      </Box>

      {/* 기본정보 */}
      <DynamicBasicInfo />

      {/* 결제정보, 요청금액, 발행처 정보... */}
      <DynamicViews />

      <ActionBtns isLoading={isLoading} isDisabled={isDisabled} />
    </Form>
  );
};

export default LegView;
