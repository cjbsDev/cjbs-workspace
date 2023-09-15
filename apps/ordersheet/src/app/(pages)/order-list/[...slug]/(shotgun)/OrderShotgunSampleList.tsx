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
  UnStyledButton,
} from "cjbsDSTM";
import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import LoadingSvg from "@public/svg/loading_wh.svg";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import OrderShotgunSampleDynamicTable from "./OrderShotgunSampleDynamicTable";
import {useParams} from "next/navigation";
import NoticeBox from "@app/(pages)/order/shotgun/(service)/(contents)/NoticeBox";

const LazyPrepSelectbox = dynamic(
  () => import("@components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderShotgunSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];
  let serviceType = params.slug[1];

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "fs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Depth (DB) <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/list/shortly?topUniqueCode=BS_0100010"}
                      inputName={"depthCc"}
                      disabled={updataYn === 'N' ? false : true}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>자체 QC 결과 파일 (선택)</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    { updataYn === 'N' ? (
                      <Box>
                        <InputValidation
                          inputName="uploadFile"
                          required={false}
                          type="file"
                          sx={{ width: 306 }}
                        />
                        <Typography variant="body2">
                          * 파일 재업로드 시, 기존 파일은 삭제됩니다.
                        </Typography>
                      </Box>
                    ) : ('')}
                    <InputValidation
                      inputName="selfQcFileNm"
                      required={false}
                      sx={{
                        width: 300,
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { border: updataYn === 'N' ? 'none' : 'none' },
                        },
                        ".MuiOutlinedInput-input:read-only": {
                          backgroundColor: "white",
                          cursor: "pointer",
                          textFillColor: "#000000"
                        },
                      }}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
          </>

        );
      case "so":
        return (
          <TableRow>
            <TH sx={{ width: "20%" }}>Depth (DB) <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
            <TD sx={{ width: "80%" }}>
              <Stack direction="row" spacing={0.5} alignItems="flex-start">
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyPrepSelectbox
                    url={"/code/list/shortly?topUniqueCode=BS_0100010"}
                    inputName={"depthCc"}
                    disabled={updataYn === 'N' ? false : true}
                  />
                </ErrorContainer>
              </Stack>
            </TD>
          </TableRow>
        );
    }
  };

  return (
    <>
      <NoticeBox serviceType={serviceType}/>

      <Stack direction="row" alignItems="center" spacing={0.5}>
        {serviceType !== "ao" ? (
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

      <OrderShotgunSampleDynamicTable serviceType={serviceType}/>

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
          "& .MuiOutlinedInput-root": {
            "& fieldset": { border: updataYn === 'N' ? '' : 'none' },
          },
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

    </>
  );
}
