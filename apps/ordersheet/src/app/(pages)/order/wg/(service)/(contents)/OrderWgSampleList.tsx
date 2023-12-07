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
import ExcelUploadModal from "@app/(pages)/order/mtp/(service)/(contents)/ExcelUploadModal";
import TableRows from "../../../TableRows";
import MtpFullService from "@app/(pages)/order/mtp/(service)/MtpFullService";
import {useFieldArray, useFormContext} from "react-hook-form";
import InputAppendBtn from "@app/(pages)/order/InputAppendBtn";
import OrderWgSampleDynamicTable from "./OrderWgSampleDynamicTable";
import NoticeBox from "./NoticeBox";
import OrderSelectbox from "@components/OrderSelectbox";

const LazyPrepSelectbox = dynamic(
  () => import("@components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

export default function OrderWgSampleList(props: any) {
  // const { fields, append } = useFieldArray({
  //   name: "items", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  // });
  // console.log("$$$$$$$$$$", props.serviceType);

  const serviceType = props.serviceType;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = {};

  const onSubmit = (data: any) => {
    console.log("Submit Data ==>>", data);

    const returnData = {
      samples: data.sample,
      addRqstMemo: {memo: data.memo},
      commonInput: {
        pltfMc : data.pltfMc === undefined ? null : data.pltfMc,
        libKit : data.libKit === undefined ? null : data.libKit,
      },
      cmprGenomeAnls: {
        cmprGenomeAnlsDetailList: data.cmprGenomeAnlsDetailList,
        // isCmprGenomeAnls: data.isCmprGenomeAnls,
        isCmprGenomeAnls: 'Y',
        cmprGenomeAnlsTypeCc : data.isCmprGenomeAnls === "N" ? 'BS_1609002' : 'BS_1609001',
      },
    };

    // Full service 만
    props.addBodyData(returnData);
    if(serviceType === 'fs') {
      // upload file이 있는경우
      if(data.uploadFile[0]) {
        props.addFileData(data.uploadFile[0]);
      }
    }

  };

  // const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "fs":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={`/code/orsh/pltf/list?type=wg_${serviceType}`}
                      inputName={"pltfMc"}
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
                    <InputValidation
                      inputName="uploadFile"
                      required={false}
                      type="file"
                      sx={{ width: 306 }}
                    />
                  </Stack>
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
                      url={`/code/orsh/pltf/list?type=wg_${serviceType}`}
                      inputName={"pltfMc"}
                    />
                  </ErrorContainer>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>Library kit 정보</TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <InputValidation
                      inputName="libKit"
                      required={false}
                      placeholder="Library 제작 시에 사용하신 Library kit 정보를 입력해주세요."
                      sx={{ width: 800 }}
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
          </>
        );
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
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

      <OrderWgSampleDynamicTable serviceType={serviceType} />

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
        <OutlinedButton
          buttonName="이전"
          onClick={() => props.moveBackFocus()}
        />

        <ContainedButton
          type="submit"
          buttonName="다음"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>
    </Form>
  );
}
