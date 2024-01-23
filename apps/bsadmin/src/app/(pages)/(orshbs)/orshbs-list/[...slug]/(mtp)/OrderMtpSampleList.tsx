"use client";

import {
  Box,
  Stack,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { cjbsTheme } from "cjbsDSTM";
import OrderMTPSampleDynamicTable from "./OrderMTPSampleDynamicTable";
import {useParams} from "next/navigation";
import NoticeBox from "../../../orsh-order/in/mtp/(service)/(contents)/NoticeBox";
import LoadingWhiteSvg from "../../../../../components/LoadingWhiteSvg";
import {useRouter} from "next-nprogress-bar";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/CommonSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderMtpSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const router = useRouter();
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];
  const serviceType = params.slug[1];
  const service = params.slug[3];
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <>
      <NoticeBox serviceType={serviceType}/>

      <OrderMTPSampleDynamicTable serviceType={serviceType}/>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1">추가 요청 사항</Typography>
      </Stack>

      <InputValidation
        inputName="memo"
        required={false}
        // errorMessage="추가 요청 사항을 입력해주세요."
        multiline
        maxRows={4}
        placeholder={"추가 요청 사항을 입력해주세요."}
        sx={{
          width: '100%',
          mb: 4,
          ".MuiOutlinedInput-input:read-only": {
            backgroundColor: "white",
            cursor: "pointer",
            textFillColor: "#000000"
          },
        }}
        InputProps={{
          readOnly: updataYn === 'N' ? false : true
        }}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center" sx={{pt:3}}>
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/orshbs-list")}
        />

        {updataYn === 'N' ? (
          <ContainedButton
            type="submit"
            buttonName="주문 수정"
            endIcon={
              isLoading ? (
                <LoadingWhiteSvg />
              ) : null
            }
          />
        ) : ('')}
      </Stack>

    </>
  );
}
