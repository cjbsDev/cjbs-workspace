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

  // console.log("TYPE", type);

  const { data } = useSWR(type !== null ? `/invc/${invcUkey}` : null, fetcher, {
    suspense: true,
  });
  // data.issuDttm = new Date(data.issuDttm);
  // data.dpstDttm = new Date(data.dpstDttm);
  //
  // const modifyDefaultValues = data;

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
  console.log("INVC Init Value ==>>", data);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const defaultValues = {
    pymtInfoCc: "BS_1914001",
    invcProductDetailList: [
      {
        srvcCtgrMc: "BS_0100005001",
        anlsTypeMc: "",
        products: "",
        qnty: 0,
        unitPrice: 0,
        supplyPrice: 0,
      },
    ],
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    // const {
    //   invcProductDetailList,
    //   agncUkey,
    //   bsnsMngrUkey,
    //   pymtInfoCc,
    //   instUkey,
    //   pymtMngrNm,
    //   rcvEmail,
    //   memo,
    //   report,
    //   vat,
    //   totalPrice,
    //   totalSupplyPrice,
    //   // dpstDttm,
    //   dpstPrice,
    //   pyrNm,
    //   tnsfTargetAgncUkey,
    // } = data;
    //
    // const dpstDttm = dayjs(data.dpstDttm).format("YYYY-MM-DD");
    //
    // const bodyData = {
    //   agncUkey,
    //   bsnsMngrUkey,
    //   dpstDttm,
    //   dpstPrice,
    //   pyrNm,
    //   instUkey,
    //   invcProductDetailList,
    //   memo,
    //   pymtInfoCc,
    //   pymtMngrNm,
    //   rcvEmail,
    //   report,
    //   tnsfTargetAgncUkey,
    //   totalPrice,
    //   totalSupplyPrice,
    //   vat,
    // };
    // 날짜 포맷 변경
    const dpstDttm = dayjs(data.dpstDttm).format("YYYY-MM-DD");
    const issuDttm = dayjs(data.issuDttm).format("YYYY-MM-DD");

    // 요청 바디 구성
    const bodyData = {
      ...data,
      dpstDttm,
      issuDttm,
    };

    console.log("BODY DATA ==>>", bodyData);

    try {
      // 요청 타입에 따른 API 호출
      const apiCall = type === "modify" ? PUT : POST;
      const res = await apiCall(`/invc`, bodyData);

      if (res.success) {
        router.push("/tax-invoice-list");
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

    // try {
    //   const res =
    //     (await type) === "modify"
    //       ? PUT(`/invc`, bodyData)
    //       : POST(`/invc`, bodyData);
    //   // const res = await PUT(`/invc`, bodyData)
    //   console.log("Response", res);
    //   if (res.success) {
    //     router.push("/tax-invoice-list");
    //   } else {
    //     toast(res.message);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form", error);
    // } finally {
    //   setIsLoading(false);
    //   setIsDisabled(true);
    // }
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
