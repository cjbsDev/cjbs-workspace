"use client";

import React, { useMemo, useState } from "react";
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

const LegView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const invcUkey = searchParams.get("invcUkey");

  const { data } = useSWR(type !== null ? `/invc/${invcUkey}` : null, fetcher, {
    suspense: true,
  });

  const modifyDefaultValues = useMemo(() => {
    if (data) {
      return {
        ...data,
        issuDttm: new Date(data.issuDttm),
        dpstDttm: new Date(data.dpstDttm),
      };
    }
    return null;
  }, [data]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const defaultValues = {
    pymtInfoCc: "BS_1914001",
    productDetailList: [
      {
        srvcTypeMc: "BS_0100005001",
        anlsTypeMc: "",
        products: "",
        sampleSize: 0,
        unitPrice: 0,
        supplyPrice: 0,
      },
    ],
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // 요청 바디 구성
    const bodyData = {
      ...data,
      // 날짜 포맷 변경
      dpstDttm: dayjs(data.dpstDttm).format("YYYY-MM-DD"),
      issuDttm: dayjs(data.issuDttm).format("YYYY-MM-DD"),
    };

    if (bodyData.pymtInfoCc === "BS_1914001") {
      delete bodyData.productDetailList;
      delete bodyData.dpstPrice;
      delete bodyData.dpstDttm;
      delete bodyData.pyrNm;
    } else if (bodyData.pymtInfoCc === "BS_1914003") {
      delete bodyData.productDetailList;
    } else if (bodyData.pymtInfoCc === "BS_1914004") {
      delete bodyData.productDetailList;
      delete bodyData.dpstPrice;
      delete bodyData.dpstDttm;
      delete bodyData.pyrNm;
    }

    console.log("BODY DATA ==>>", bodyData);

    try {
      // 요청 타입에 따른 API 호출
      const apiCall = type === "modify" ? PUT : POST;
      const res = await apiCall(`/invc`, bodyData);

      if (res.success) {
        type === "modify"
          ? router.push(`/ledger-tax-invoice-list/${invcUkey}`)
          : router.push("/ledger-tax-invoice-list");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("폼 제출 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setIsDisabled(true);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      defaultValues={type === null ? defaultValues : modifyDefaultValues}
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
