import React, { useCallback, useEffect } from "react";
import MyIcon from "icon/MyIcon";
import { OutlinedButton } from "../../atoms/Buttons";
import { CircularProgress } from "@mui/material";
import { useFileDownload } from "./useFileDownload";
import { toast } from "react-toastify";

interface FileDownloadBtnProps {
  exportUrl: string;
  keyword?: string | undefined;
  iconName?: string;
  buttonName?: string;
  onClose?: () => void;
}

export const FileDownloadBtn = (props: FileDownloadBtnProps) => {
  const { buttonName = "Excel", exportUrl, keyword, iconName, onClose } = props;
  const { isLoading, fileName, saverFile } = useFileDownload(
    exportUrl,
    keyword,
  );

  const handleSaveFile = useCallback(async () => {
    if (exportUrl !== "") {
      await saverFile();
      if (onClose) {
        onClose();
      }
    } else {
      toast("준비 중입니다.");
    }
  }, []);

  return (
    <>
      <OutlinedButton
        buttonName={buttonName}
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
        onClick={handleSaveFile}
        disabled={isLoading}
      />
    </>
  );
};
