import React, { useState, useMemo } from "react";
import {
  ModalContainer,
  ModalTitle,
  ModalAction,
  OutlinedButton,
  TH,
  TD,
} from "cjbsDSTM";
import {
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  data: object;
}

const PrePayListModal = ({
  onClose,
  open,
  modalWidth,
  data,
}: ModalContainerProps) => {

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>선결제 정산 내역</ModalTitle>
      <DialogContent>
        <Typography variant="subtitle2">상세 정산 내역</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "25%", textAlign:'center' }}>발행일자</TH>
                <TH sx={{ width: "25%", textAlign:'center' }}>구분</TH>
                <TH sx={{ width: "25%", textAlign:'center' }}>No.</TH>
                <TH sx={{ width: "25%", textAlign:'center' }}>차감된 분석비용</TH>
              </TableRow>
              { data !== undefined && (
                data.map((item, index) => {
                  const dataSize = data.length;
                  const {
                    expnPrice,
                    invcId,
                    invcUkey,
                    issuDttm,
                    pymtInfoCc,
                    pymtInfoVal,
                  } = item;
                  console.log('dataSize', dataSize)
                  console.log('index', index)
                  return (
                    <>
                    <TableRow>
                      <TD sx={{ textAlign:'center' }}>{issuDttm}</TD>
                      <TD sx={{ textAlign:'center' }}>{pymtInfoVal}</TD>
                      <TD sx={{ textAlign:'center' }}>{invcId}</TD>
                      <TD sx={{ textAlign:'center' }}>-{expnPrice}</TD>
                    </TableRow>
                    { dataSize === index && (
                      <TableRow>
                        <TD sx={{ textAlign:'center' }}>합계</TD>
                        <TD sx={{ textAlign:'center' }}></TD>
                        <TD sx={{ textAlign:'center' }}></TD>
                        <TD sx={{ textAlign:'center' }}></TD>
                      </TableRow>
                    )}
                    </>
                  );
                })
              )}
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

export default PrePayListModal;
