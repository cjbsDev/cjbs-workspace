import { formatPhoneNumber, OutlinedButton } from "cjbsDSTM";
import React from "react";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const getColumns = () => [
  {
    name: "병원코드",
    selector: (row) => row.hsptCode,
  },
  {
    name: "병원이름",
    selector: (row) => row.hsptNm,
  },
  {
    name: "선택",
    cell: (row) => {
      return (
        <OutlinedButton
          size="small"
          buttonName="선택"
          onClick={() => {
            const data = {
              ...row,
            };
            const event = new CustomEvent("myHsptData", {
              detail: data,
            });
            window.opener.dispatchEvent(event);
            window.close();
          }}
        />
      );
    },
  },
];
