import { Box, Chip, Typography } from "@mui/material";
import { OutlinedButton } from "cjbsDSTM";
import React from "react";

export const getColumns = (
  goDetailPage: (topCodeMc: string, midCodeMc: string) => void,
) => [
  {
    name: "No",
    width: "80px",
    center: true,
    cell: (row: any, index: number) => {
      return index + 1;
    },
  },
  {
    name: "분류",
    width: "100px",
    selector: (row: { topValue: string }) => row.topValue,
  },
  {
    name: "분석종류",
    width: "150px",
    selector: (row: { midValue: string }) => row.midValue,
  },

  {
    name: "분석 단계",
    wrap: true,
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
        <Typography variant="body2">등록된 분석 단계가 없습니다.</Typography>
      );
    },
  },
  {
    name: "관리",
    width: "80px",
    center: true,
    button: true,
    cell: (row: { topCodeMc: string; midCodeMc: string }) => {
      return (
        <OutlinedButton
          buttonName="관리"
          size="small"
          onClick={() => goDetailPage(row.topCodeMc, row.midCodeMc)}
        />
      );
    },
  },
];
