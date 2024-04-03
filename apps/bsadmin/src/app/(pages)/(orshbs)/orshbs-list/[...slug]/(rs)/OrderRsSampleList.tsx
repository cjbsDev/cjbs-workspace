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
import OrderRsSampleDynamicTable from "./OrderRsSampleDynamicTable";
import {useParams} from "next/navigation";
import NoticeBox from "../../../orshbs/in/mtp/(service)/(contents)/NoticeBox";
import LoadingWhiteSvg from "../../../../../components/LoadingWhiteSvg";
import {useRouter} from "next-nprogress-bar";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderRsSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const router = useRouter();
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];
  const serviceType = params.slug[1];
  const service = params.slug[3];
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "so":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={`/code/orsh/pltf/list?type=${service}_${serviceType}`}
                      inputName={"pltfMc"}
                      disabled={updataYn === 'N' ? false : true}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
          </>

        );
    }
  };

  return (
    <>
      <NoticeBox serviceType={serviceType}/>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        {serviceType === "so" ? (
          <Typography variant="subtitle1">공통 항목 선택</Typography>
        ) : (
          ""
        )}
      </Stack>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <CommonServiceSelect />
          </TableBody>
        </Table>
      </TableContainer>

      <OrderRsSampleDynamicTable serviceType={serviceType}/>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1">추가 요청 사항</Typography>
      </Stack>

      <InputValidation
        inputName="memo"
        required={false}
        multiline
        maxRows={4}
        placeholder={updataYn === 'N' ? "추가 요청 사항을 입력해주세요." : ""}
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
