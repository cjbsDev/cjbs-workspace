import { Dialog } from "@mui/material";
import React from "react";

interface ModalContainerProps {
  children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

export const ModalContainer = (props: ModalContainerProps) => {
  const { children, onClose, open, modalWidth } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          maxWidth: modalWidth,
        },
      }}
    >
      {children}
    </Dialog>
  );
};
