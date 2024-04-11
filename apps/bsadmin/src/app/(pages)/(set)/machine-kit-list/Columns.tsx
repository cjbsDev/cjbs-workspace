import { OutlinedButton } from "cjbsDSTM";
import React from "react";
import { Box, Chip, Typography } from "@mui/material";

export const getColumns = () => [
  {
    name: "No",
    cell: (row: any, index: number) => {
      return index + 1;
    },
    width: "80px",
    center: true,
  },
  {
    name: "장비",
    selector: (row: { topValue: string }) => row.topValue,
    width: "200px",
  },
  {
    name: "Kit",
    cell: (row: { btmValueList: any }) => {
      return row.btmValueList.length > 0 ? (
        <Box sx={{ mb: -1 }}>
          {row.btmValueList.map((item: any) => (
            <Chip
              key={item.btmCodeMc}
              label={item.btmCodeVal}
              size="small"
              sx={{
                border: "1px solid #ADB5BD",
                backgroundColor: "#FFFFFF",
                color: "#000000",
                mr: 1,
                mb: 1,
              }}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body2">등록된 데이터가 없습니다.</Typography>
      );
    },
    // width: "65%",
    wrap: true,
  },
  {
    name: "관리",
    cell: (row: { topCodeMc: string; midCodeMc: string }) => {
      return (
        <OutlinedButton
          data-tag="allowRowEvents"
          buttonName="관리"
          size="small"
        />
      );
    },
    width: "80px",
    center: true,
    button: true,
  },
];
