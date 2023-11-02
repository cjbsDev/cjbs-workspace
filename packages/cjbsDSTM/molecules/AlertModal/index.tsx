"use client";
import { ModalNoneTextTitle } from "../CModal/ModalTitle";
import MyIcon from "icon/MyIcon";
import { ModalAction, ModalContainer } from "../CModal";
import { ContainedButton, OutlinedButton } from "../../atoms/Buttons";
import React from "react";
import { DialogContent, Stack, ThemeProvider, Typography } from "@mui/material";
import { cjbsTheme } from "../../themes";

interface AlertModalProps {
  onClose: () => void;
  alertMainFunc: () => void;
  open: boolean;
  mainMessage?: string;
  subMessage?: string;
  alertBtnName: string;
}

export const AlertModal = ({
  onClose,
  open,
  mainMessage,
  subMessage,
  alertBtnName,
  alertMainFunc,
}: AlertModalProps) => {
  return (
    // <ThemeProvider theme={cjbsTheme}>
    <ModalContainer onClose={onClose} open={open} modalWidth={450}>
      <ModalNoneTextTitle onClose={onClose} />
      <DialogContent sx={{ textAlign: "center" }}>
        <MyIcon icon="exclamation-triangle" size={35} color="red" />
        <Typography variant="subtitle1">{mainMessage}</Typography>
        <Typography variant="body2">{subMessage}</Typography>
      </DialogContent>
      <ModalAction>
        <Stack direction="row" spacing={1}>
          <OutlinedButton
            buttonName={"취소"}
            color="secondary"
            onClick={onClose}
          />
          <ContainedButton
            buttonName={alertBtnName}
            color="error"
            onClick={alertMainFunc}
          />
        </Stack>
      </ModalAction>
    </ModalContainer>
    // </ThemeProvider>
  );
};
