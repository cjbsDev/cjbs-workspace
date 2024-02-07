import React, { useState } from "react";
import {
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent, Typography } from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import { LoadingButton } from "@mui/lab";
import Tab from "./tab";

const RegModal = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>샘플 단계 등록</ModalTitle>
      <DialogContent sx={{ minHeight: 244 }}>
        <Tab />
      </DialogContent>
    </ModalContainer>
  );
};

export default RegModal;
