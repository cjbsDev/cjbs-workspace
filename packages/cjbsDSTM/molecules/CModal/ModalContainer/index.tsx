import { Dialog } from "@mui/material";
import React from "react";

interface ModalContainerProps {
  children?: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  modalWidth: number;
  overflowY?: string;
}

export const ModalContainer = (props: ModalContainerProps) => {
  const { children, onClose, open, modalWidth, overflowY = "auto" } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          overflowY: overflowY,
          maxWidth: modalWidth,
        },
      }}
    >
      {children}
    </Dialog>
  );
};
