import React, { useState } from "react";
import MyIcon from "icon/MyIcon";
import { OutlinedButton } from "../../atoms/Buttons";
import { CircularProgress } from "@mui/material";
import { useFileDownload } from "./useFileDownload";

interface FileDownloadBtnProps {
  exportUrl: string;
  iconName?: string;
}

export const FileDownloadBtn = (props: FileDownloadBtnProps) => {
  const { exportUrl, iconName } = props;
  const { isLoading, fileName, saverFile } = useFileDownload(exportUrl);

  return (
    <>
      <OutlinedButton
        buttonName="Excel"
        size="small"
        color="secondary"
        sx={{ color: "black" }}
        startIcon={
          isLoading ? (
            <CircularProgress size={16} />
          ) : (
            <MyIcon icon={iconName} size={18} />
          )
        }
        onClick={() => saverFile()}
        disabled={isLoading}
      />
    </>
  );
};
