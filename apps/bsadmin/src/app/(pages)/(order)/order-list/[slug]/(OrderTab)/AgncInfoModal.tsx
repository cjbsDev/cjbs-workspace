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

const AgncInfoModal = ({
  onClose,
  open,
  modalWidth,
  data,
}: ModalContainerProps) => {
  const {
    agncId,
    agncNm,
    instNm,
    agncLeaderNm,
    agncLeadrEmail,
    addr,
    addrDetail,
  } = data;

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처(PI) 정보</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "35%" }}>거래처 번호</TH>
                <TD>{agncId}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>거래처(PI)</TH>
                <TD>
                  {agncNm}({instNm})
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>연구책임자 아이디</TH>
                <TD>{agncLeadrEmail}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>연구책임자 이름</TH>
                <TD>{agncLeaderNm}</TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>주소</TH>
                <TD>
                  {addr} {addrDetail}
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

export default AgncInfoModal;
