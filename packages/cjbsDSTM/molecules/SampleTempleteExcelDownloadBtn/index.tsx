import React, { useState } from "react";
import MyIcon from "icon/MyIcon";
import {ContainedButton, OutlinedButton} from "../../atoms/Buttons";
import { CircularProgress } from "@mui/material";
import FileSaver from "file-saver";
import { GET } from "api";
import { toast } from "react-toastify";
import axios from "axios";

interface FileDownloadBtnProps {
  exportUrl: string;
  keyword?: string | undefined;
  iconName?: string;
}

export const SampleTempleteExcelDownloadBtn = (props: FileDownloadBtnProps) => {
  const { exportUrl, keyword, iconName } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSaveFile = async () => {
    if (exportUrl !== "") {
      try {
        setIsLoading(true);
        const res = await GET(`${exportUrl}`);
        const { presignedUrl, fileOriginNm } = res.data;
        // console.log("res.data", presignedUrl, fileOriginNm);
        await axios({
          url: presignedUrl,
          method: "get",
          responseType: "blob",
        }).then((response) => {
          console.log("*********", response);
          FileSaver.saveAs(presignedUrl, fileOriginNm);
        });
      } catch (e: any) {
        console.log(e.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast("준비 중입니다.");
    }
  };

  return (
    <>
      <ContainedButton
        buttonName="엑셀 양식 다운로드"
        size="small"
        color="secondary"
        sx={{ marginLeft: "20spx !important" }}
        startIcon={
          isLoading ? (
            <CircularProgress size={16} />
          ) : (
            <MyIcon icon="download" size={18} />
          )
        }
        onClick={handleSaveFile}
        disabled={isLoading}
      />
    </>
  );
};
