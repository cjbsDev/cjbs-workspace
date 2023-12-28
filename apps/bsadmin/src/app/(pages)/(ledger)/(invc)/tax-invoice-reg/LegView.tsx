"use client";

import React, { useState } from "react";
import {
  ContainedButton,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LoadingSvg from "public/svg/loading_wh.svg";
import dynamic from "next/dynamic";
import AgncSearchModal from "../../../../components/AgncSearchModal";

// const LazyAgncSearchModal = dynamic(
//   () => import("../../../../components/AgncSearchModal"),
//   {
//     ssr: false,
//   },
// );

const LegView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data ==>>", data);
  };

  const handleAgncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };
  const handleAgncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };
  return (
    <Form onSubmit={onSubmit} defaultValues={undefined}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="세금계산서 등록" />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" spacing={0.2} alignItems="flex-start">
                  <InputValidation
                    inputName="agncNm"
                    required={true}
                    errorMessage="거래처 주세요."
                    // sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <InputValidation
                    inputName="instNm"
                    required={true}
                    errorMessage="거래처 주세요."
                    // sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="거래처 검색"
                    onClick={handleAgncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }}></TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/order-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <ContainedButton
          size="small"
          type="submit"
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>

      <AgncSearchModal
        modalWidth={800}
        open={showAgncSearchModal}
        onClose={handleAgncSearchModalClose}
      />
    </Form>
  );
};

export default LegView;
