"use client";

import React, { useState } from "react";
import { Form, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { POST } from "api";
import dayjs from "dayjs";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import DynamicBasicInfo from "./components/DynamicBasicInfo";
import ActionBtns from "./components/ActionBtns";
import DynamicViews from "./components/DynamicViews";

const LegView = () => {
  const router = useRouter();
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
    console.log("Form Data ==>>", data);
    const {
      invcProductDetailList,
      agncUkey,
      bsnsMngrUkey,
      pymtInfoCc,
      instUkey,
      pymtMngrNm,
      rcvEmail,
      memo,
      report,
      vat,
      totalPrice,
      totalSupplyPrice,
      // dpstDttm,
      dpstPrice,
      pyrNm,
      tnsfTargetAgncUkey,
    } = data;

    const dpstDttm = dayjs(data.dpstDttm).format("YYYY-MM-DD");

    const bodyData = {
      agncUkey,
      bsnsMngrUkey,
      dpstDttm,
      dpstPrice,
      pyrNm,
      instUkey,
      invcProductDetailList,
      memo,
      pymtInfoCc,
      pymtMngrNm,
      rcvEmail,
      report,
      tnsfTargetAgncUkey,
      totalPrice,
      totalSupplyPrice,
      vat,
    };

    try {
      const res = await POST(`/invc`, bodyData);
      console.log("Response", res);
      if (res.success) {
        router.push("/tax-invoice-list");
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
      setIsDisabled(true);
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="세금계산서 등록" />
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
