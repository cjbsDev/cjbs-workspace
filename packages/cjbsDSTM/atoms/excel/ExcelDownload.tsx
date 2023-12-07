"use client";
import React, { useState } from "react";
import { CircularProgress } from "../../../../node_modules/@mui/material/index";
import { POST_BLOB } from "../../../api/index";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { OutlinedButton } from "../Buttons";

const ExcelDownload = ({ downloadUrl }: { downloadUrl: string }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (serverUrl: string) => {
    setIsDownloading(true);

    try {
      const response = await POST_BLOB(serverUrl); // API 요청

      const name = response.headers["Content-Disposition"]
        .split("filename=")[1]
        .replace(/"/g, "");

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", name);

      link.style.cssText = "display:none";

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error("Error occurred while downloading data:", error);
    }

    setIsDownloading(false);
  };

  return (
    <React.Fragment>
      {isDownloading ? (
        <CircularProgress size={"sm"} style={{ margin: "0px 20px" }} />
      ) : (
        <OutlinedButton
          sx={{
            border: "1px solid #CED4DA",

            color: "black",
          }}
          buttonName={"Excel"}
          startIcon={<ListAltIcon color="success" />}
        />
      )}
    </React.Fragment>
  );
};

export default ExcelDownload;
