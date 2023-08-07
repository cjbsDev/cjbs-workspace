import React, { useState, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ExcelDownloadButton,
  ModalContainer,
  ModalTitle,
  ModalAction,
  OutlinedButton,
  TH,
  TD,
} from "cjbsDSTM";
import {
  Chip,
  DialogContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  data: object;
}

const RearchInfoModal = ({
  onClose,
  open,
  modalWidth,
  data,
}: ModalContainerProps) => {
  const { ebcId, ebcEmail, nm, telList, agncId, agncNm, instNm } = data;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>연구책임자 정보</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "35%" }}>고객 번호</TH>
                <TD>{ebcId}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>아이디</TH>
                <TD>{ebcEmail}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>이름</TH>
                <TD>{nm}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>연락처</TH>
                <TD>{telList === null ? "-" : telList}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>거래처(PI)</TH>
                <TD>
                  {agncNm}({instNm})
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
      </ModalAction>
    </ModalContainer>
  );
};

export default RearchInfoModal;
