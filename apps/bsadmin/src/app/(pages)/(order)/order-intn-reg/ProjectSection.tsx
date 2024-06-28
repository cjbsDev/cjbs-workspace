import React, { useCallback, useState } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import Research from "./Research";
import dynamic from "next/dynamic";

const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const ProjectSection = () => {
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  const agncSearchModalOpen = useCallback(() => {
    setShowAgncSearchModal(true);
  }, []);

  // // [ 프로젝트 검색 ] 모달 닫기
  const agncSearchModalClose = useCallback(() => {
    setShowAgncSearchModal(false);
  }, []);

  return (
    <>
      <Typography variant="subtitle1">과제 및 연구</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>과제</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="prjtCodeMc"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제 코드"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: -1000,
                    }}
                    InputProps={{
                      type: "hidden",
                    }}
                  />
                  <InputValidation
                    inputName="prjcNm"
                    disabled={true}
                    required={true}
                    errorMessage="과제를 검색 & 선택해주세요."
                    placeholder="과제를 선택해주세요"
                    sx={{ width: 600 }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="과제 검색"
                    onClick={agncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연구</TH>
              <TD sx={{ width: "85%" }} colSpan={3}>
                <Research required={false} />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 프로젝트 검색 모달*/}
      <LazyProjectSearchModal
        onClose={agncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={900}
      />
    </>
  );
};

export default ProjectSection;
