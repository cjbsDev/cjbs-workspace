import React, { useState } from "react";
import MyIcon from "icon/MyIcon";
import { OutlinedButton } from "../../atoms/Buttons";
import { CircularProgress } from "@mui/material";
import { useFileDownload } from "./useFileDownload";
import FileSaver from "file-saver";
import { GET } from "api";

interface FileDownloadBtnProps {
  exportUrl: string;
  keyword?: string | undefined;
  iconName?: string;
}

export const FileDownloadBtn = (props: FileDownloadBtnProps) => {
  const { exportUrl, keyword, iconName } = props;
  const { isLoading, fileName, saverFile } = useFileDownload(
    exportUrl,
    keyword
  );

  // const handldFileDown = async () => {
  //   FileSaver.saveAs(
  //     `${process.env.NEXT_PUBLIC_API_URL}${exportUrl}`,
  //     "test.xlsx"
  //   );
  // };

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
        // onClick={handldFileDown}
        disabled={isLoading}
      />
    </>
  );
};
