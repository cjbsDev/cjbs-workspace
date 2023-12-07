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
import OrderWgSampleDynamicTable from "./OrderWgSampleDynamicTable";
import {useParams} from "next/navigation";
import NoticeBox from "../../../orsh-order/in/mtp/(service)/(contents)/NoticeBox";
import LoadingSvg from "../../../../../../../public/svg/loading_wh.svg";
import {useRouter} from "next-nprogress-bar";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderWgSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const router = useRouter();
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];
  let serviceType = params.slug[1];
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "fs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=wg_fs"}
                      inputName={"pltfMc"}
                      disabled={updataYn === 'N' ? false : true}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
          </>
        );
      case "ngs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=wg_fs"}
                      inputName={"pltfMc"}
                      disabled={updataYn === 'N' ? false : true}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
          </>
        );
      case "so":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=wg_so"}
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
        {serviceType !== "so" ? (
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

      <OrderWgSampleDynamicTable serviceType={serviceType}/>

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
                <LoadingSvg stroke="white" width={20} height={20} />
              ) : null
            }
          />
        ) : ('')}
      </Stack>

    </>
  );
}
