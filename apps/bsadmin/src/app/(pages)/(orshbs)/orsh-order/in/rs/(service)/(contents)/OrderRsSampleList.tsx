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
import LoadingSvg from "../../../../../../../../../public/svg/loading_wh.svg";
import OrderRsSampleDynamicTable from "./OrderRsSampleDynamicTable";
import NoticeBox from "./NoticeBox";

const LazyPrepSelectbox = dynamic(
  () => import("../../../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

export default function OrderRsSampleList(props: any) {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CommonServiceSelect = () => {
    switch (serviceType) {
      case "so":
        return (
          <>
            <TableRow>
              <TH sx={{ width: "20%" }}>
                Sequencing 플랫폼 정보{" "}
                <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                  *
                </Box>
              </TH>
              <TD sx={{ width: "80%" }}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyPrepSelectbox
                      url={"/code/orsh/pltf/list?type=rs_so"}
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
        multiline
        maxRows={4}
        sx={{ width: "100%", mb: 4 }}
        placeholder={"추가 요청 사항을 입력해주세요."}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center">
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
