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


const ServiceSelectModal = (props) => {
  const { open, onClose, modalWidth } = props;
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>기관 검색</ModalTitle>
      <DialogContent>
        test1234
      </DialogContent>
      <ModalAction>
        <ContainedButton buttonName="확인" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default ServiceSelectModal;
