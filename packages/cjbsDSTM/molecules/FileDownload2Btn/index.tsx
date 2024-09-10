import React, { useCallback, useEffect, useState } from "react";
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
  index?: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

export const FileDownload2Btn = (props: FileDownloadBtnProps) => {
  const {
    buttonName = "Excel",
    exportUrl,
    keyword,
    iconName,
    onClose,
    index,
    activeIndex,
    setActiveIndex,
  } = props;
  const { isLoading, fileName, saverFile } = useFileDownload(
    exportUrl,
    keyword,
  );

  const [isDis, setIsDis] = useState(false);

  // const handleSaveFile = useCallback(async () => {
  //   // console.log("INDEX ==>>", !!index);
  //   if (exportUrl !== "") {
  //     await saverFile();
  //     if (onClose) {
  //       onClose();
  //     }
  //   } else {
  //     toast("준비 중입니다.");
  //   }
  // }, [exportUrl, saverFile, onClose]);

  const handleSaveFile = useCallback(async () => {
    if (exportUrl !== "") {
      setActiveIndex(index); // Set the active button index
      await saverFile();
      setActiveIndex(null); // Reset the active button index after download
      if (onClose) {
        onClose();
      }
    } else {
      toast("준비 중입니다.");
    }
  }, [exportUrl, saverFile, onClose, index, setActiveIndex]);

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
        // disabled={isLoading}
        disabled={isLoading || (activeIndex !== null && activeIndex !== index)}
      />
    </>
  );
};
