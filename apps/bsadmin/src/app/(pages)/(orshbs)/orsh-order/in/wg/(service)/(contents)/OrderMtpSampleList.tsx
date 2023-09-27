"use client";

import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
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
import LoadingSvg from "public/svg/loading_wh.svg";
import OrderMTPSampleDynamicTable from "./OrderMTPSampleDynamicTable";
import NoticeBox from "./NoticeBox";
import OrderSelectbox from "@components/OrderSelectbox";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderMtpSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "ngs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=mtpAO"}
                      inputName={"pltfMc"}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
          </>
        );
      case "fs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=mtpAO"}
                      inputName={"pltfMc"}
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
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=mtpAO"}
                      inputName={"pltfMc"}
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

      <OrderMTPSampleDynamicTable serviceType={serviceType} />

      <Stack direction="row" alignItems="center" spacing={0.5}>
        <Typography variant="subtitle1">추가 요청 사항</Typography>
      </Stack>

      <InputValidation
        inputName="memo"
        required={false}
        // errorMessage="추가 요청 사항을 입력해주세요."
        multiline
        maxRows={4}
        sx={{ width: "100%", mb: 4 }}
        placeholder={"추가 요청 사항을 입력해주세요."}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        {/*<OutlinedButton*/}
        {/*  buttonName="이전"*/}
        {/*  onClick={() => props.moveBackFocus()}*/}
        {/*/>*/}

        {/*<ContainedButton*/}
        {/*  type="submit"*/}
        {/*  buttonName="다음"*/}
        {/*  endIcon={*/}
        {/*    isLoading ? (*/}
        {/*      <LoadingSvg stroke="white" width={20} height={20} />*/}
        {/*    ) : null*/}
        {/*  }*/}
        {/*/>*/}

        <ContainedButton
          type="submit"
          buttonName="등록"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>
    </>
  );
}
