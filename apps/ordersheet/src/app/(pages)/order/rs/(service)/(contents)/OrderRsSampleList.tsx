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
import LoadingWhiteSvg from "@components/LoadingWhiteSvg";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import ExcelUploadModal from "@app/(pages)/order/mtp/(service)/(contents)/ExcelUploadModal";
import TableRows from "../../../TableRows";
import MtpFullService from "@app/(pages)/order/mtp/(service)/MtpFullService";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputAppendBtn from "@app/(pages)/order/InputAppendBtn";
import OrderRsSampleDynamicTable from "./OrderRsSampleDynamicTable";
import NoticeBox from "./NoticeBox";
import OrderSelectbox from "@components/OrderSelectbox";

const LazyPrepSelectbox = dynamic(() => import("@components/OrderSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

export default function OrderRsSampleList(props: any) {
  // const { fields, append } = useFieldArray({
  //   name: "items", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  // });
  // console.log("$$$$$$$$$$", props.serviceType);

  const serviceType = props.serviceType;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = {};

  const onSubmit = (data: any) => {
    console.log("Submit Data ==>>", data);
    let returnData;
    if (serviceType === "so") {
      returnData = {
        samples: data.sample,
        addRqstMemo: { memo: data.memo },
        commonInput: {
          libKit: data.libKit,
          // pltfMc : data.pltfMc === undefined ? null : data.pltfMc,
          pltfMc: "BS_0100008005",
        },
      };
    } else {
      returnData = {
        samples: data.sample,
        addRqstMemo: { memo: data.memo },
        groupCmprAnls: {
          groupCmprAnlsList: data.groupCmprAnls,
          isGroupCmprAnls: data.isGroupCmprAnls,
        },
      };
    }

    props.addBodyData(returnData);
  };

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "so":
        return (
          <>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "20%" }}>Sequencing 플랫폼 정보 <Box sx={{color: "#EF151E", fontSize:12}} component="span">*</Box></TH>*/}
            {/*  <TD sx={{ width: "80%" }}>*/}
            {/*    <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
            {/*      <ErrorContainer FallbackComponent={Fallback}>*/}
            {/*        <LazyPrepSelectbox*/}
            {/*          url={`/code/orsh/pltf/list?type=rs_${serviceType}`}*/}
            {/*          inputName={"pltfMc"}*/}
            {/*        />*/}
            {/*      </ErrorContainer>*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
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
      <NoticeBox serviceType={serviceType} />

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

      <OrderRsSampleDynamicTable serviceType={serviceType} />

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
              <LoadingWhiteSvg />
            ) : null
          }
        />
      </Stack>
    </Form>
  );
}
