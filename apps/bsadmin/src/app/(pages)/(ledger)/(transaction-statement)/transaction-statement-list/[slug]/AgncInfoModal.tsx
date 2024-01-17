import React from "react";
import {
  ContainedButton,
  DataTableBase,
  ModalAction,
  ModalContainer,
  ModalTitle,
  TD,
  TH,
} from "cjbsDSTM";
import {
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";

const AgncInfoModal = (props: ModalContainerProps) => {
  const { open, onClose, modalWidth } = props;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>기관 검색</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "35%" }}>더존 코드</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>기관명</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>사업자 등록번호</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>대표자</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>업태</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>업종</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>주소</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>분류</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>지역</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>특성</TH>
                <TD>1234</TD>
              </TableRow>
              <TableRow>
                <TH>상태</TH>
                <TD>1234</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <ModalAction>
        <ContainedButton buttonName="확인" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default AgncInfoModal;
