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
import LoadingSvg from "public/svg/loading_wh.svg";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import ExcelUploadModal from "@app/(pages)/order/ExcelUploadModal";
import TableRows from "./TableRows";
import MtpFullService from "@app/(pages)/order/mtp/MtpFullService";
import { useFieldArray } from "react-hook-form";
import InputAppendBtn from "@app/(pages)/order/InputAppendBtn";
import OrderMTPSampleDynamicTable from "@app/(pages)/order/OrderMTPSampleDynamicTable";

const LazyPrepSelectbox = dynamic(
  () => import("../../components/CommonSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

type FormValues = {
  samples: {
    sampleNm: string;
    source: string;
    sampleCategoryCc: string;
    anlsTargetGeneCc: string;
    qc: string;
    memo: string;
  }[];
};

export default function OrderMtpSampleList(props: any) {
  // const { fields, append } = useFieldArray({
  //   name: "items", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  // });
  // console.log("$$$$$$$$$$", props.serviceType);
  let serviceType = props.serviceType;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = {};

  const onSubmit = (data: any) => {
    console.log("Submit Data ==>>", data);
    // console.log("length", Object.keys(data).length);
    const samples = [];
    const sampleCnt = (Object.keys(data.sample).length - 2) / 6;
    for (let i = 0; i < sampleCnt; i++) {
      const sample = {
        anlsTargetGeneCc: data[i + "_anlsTargetGeneCc"],
        memo: data[i + "_memo"],
        qc: data[i + "_qc"],
        sampleCategoryCc: data[i + "_sampleCategoryCc"],
        sampleNm: data[i + "_sampleNm"],
        source: data[i + "_source"],
      };
      samples.push(sample);
    }
    console.log("SAMPLES ==>>", samples);

    const returnData = {
      samples: data.sample,
      addRqstMemo: {memo: data.memo}
    };
    // upload file이 있는경우
    props.addBodyData(returnData);
    if(data.uploadFile[0]) {
      props.addFileData(data.uploadFile[0]);
    }

  };

  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =
    useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "fs":
        return (
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
        );
      case "ao":
        return (
          <TableRow>
            <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보</TH>
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
        );
      // case 'so' :
      //     return (
      //         <TableRow>
      //             <TH sx={{ width: "20%" }}>자체 QC 결과 파일 (선택)</TH>
      //             <TD sx={{ width: "80%" }}>
      //                 <Stack direction="row" spacing={0.5} alignItems="flex-start">
      //                     <ErrorContainer FallbackComponent={Fallback}>
      //                         <LazyPrepSelectbox url={"/code/orsh/pltf/list?type=mtpSO"} inputName={"pltfMc"} />
      //                     </ErrorContainer>
      //                 </Stack>
      //             </TD>
      //         </TableRow>
      //     )
    }
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box
        alignItems="start"
        sx={{
          backgroundColor: cjbsTheme.palette.grey["50"],
          paddingX: 5,
          paddingY: 3,
          mb: 2,
        }}
      >
        <ul>
          <li style={{ color: "#EF151E" }}>
            <Typography variant="body2">
              보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기
              바랍니다.
            </Typography>
          </li>
          <li style={{ color: "#EF151E" }}>
            <Typography variant="body2">
              분석 결과는 EzBioCloud로 업로드됩니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은
              1개월 후 자동폐기됩니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서
              다운로드 바랍니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              분석 결과는 연구용으로만 사용이 가능합니다.
            </Typography>
          </li>
        </ul>
      </Box>

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

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">샘플 리스트</Typography>
        </Stack>
      </Stack>

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
