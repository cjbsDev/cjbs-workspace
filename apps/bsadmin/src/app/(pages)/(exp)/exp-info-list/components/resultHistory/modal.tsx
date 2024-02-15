import React from "react";
import { ModalContainer, ModalTitle } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import { useRecoilValue } from "recoil";
import { sampleUkeyAtom } from "./atom";
import Tab from "./tab";

const Modal = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>결과 업로드 이력</ModalTitle>
      <DialogContent sx={{ minHeight: 244 }}>
        <Tab />
      </DialogContent>
    </ModalContainer>
  );
};

export default Modal;
