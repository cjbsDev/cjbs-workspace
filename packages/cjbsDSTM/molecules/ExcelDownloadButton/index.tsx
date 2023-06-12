import React from "react";
import { UnStyledButton } from "../../atoms/Buttons";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MyIcon from "../../../icon/myIcon";

export const ExcelDownloadButton = ({ ...props }) => {
  const { buttonName } = props;
  return (
    <UnStyledButton
      {...props}
      buttonName={buttonName}
      startIcon={<MyIcon icon="xls3" size={18} />}
    />
  );
};
