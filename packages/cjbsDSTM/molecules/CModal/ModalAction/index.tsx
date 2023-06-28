import { DialogActions, DialogActionsProps, IconButton } from "@mui/material";
import React from "react";

// interface DialogTitleProps {
//   children?: React.ReactNode;
//   onClose: () => void;
// }
export const ModalAction = (props: DialogActionsProps) => {
  const { children, ...other } = props;
  return (
    <DialogActions
      sx={{
        ...props.sx,
        pb: 4,
        justifyContent: "center",
      }}
      {...other}
    >
      {children}
    </DialogActions>
  );
};
