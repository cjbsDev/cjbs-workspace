import {
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
  desctext?: string;
}
export const ModalTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 3 }} {...other}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="title2">{children}</Typography>
        <IconButton
          onClick={onClose}
          sx={{
            // position: "absolute",
            // right: 20,
            // top: 25,
            color: "black",
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <Typography variant="body2">{other.desctext}</Typography>
      <Divider sx={{ mt: 2 }} />
    </DialogTitle>
  );
};

export const ModalNoneTextTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 3.5 }} {...other}>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 20,
          top: 25,
          color: "black",
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
  );
};
