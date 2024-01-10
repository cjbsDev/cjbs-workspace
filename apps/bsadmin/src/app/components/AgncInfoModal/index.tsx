import React from "react";
import {
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import {
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const Index = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처(PI) 정보</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "35%" }}>거래처 번호</TH>
                <TD></TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>거래처(PI)</TH>
                <TD></TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>연구책임자 아이디</TH>
                <TD></TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>연구책임자 이름</TH>
                <TD></TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "35%" }}>주소</TH>
                <TD></TD>
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

export default Index;
