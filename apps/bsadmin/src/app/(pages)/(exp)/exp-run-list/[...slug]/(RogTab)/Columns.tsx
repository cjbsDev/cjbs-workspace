import React from "react";
import { Tooltip, IconButton, Stack, Box } from "@mui/material";
import MyIcon from "icon/MyIcon";

export const Columns = () => [
  {
    name: "변경일",
    // width: "80px",
    sortable: true,
    ignoreRowClick: true,
    selector: (row) => row.modifiedAt,
  },
  {
    name: "담당자",
    sortable: true,
    // ignoreRowClick: true,
    selector: (row) => (row.updatedByNm === null ? "-" : row.updatedByNm),
  },
  {
    name: "컬럼",
    // sortable: true,
    // selector: (row) => (row.targetColVal === null ? "-" : row.targetColVal),
    cell: (row) => {
      return (
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <Box>
            <p>{row.targetColVal}</p>
          </Box>
          {/*{row.targetColNm === "BS_1704008" ||*/}
          {/*  row.targetColNm === "BS_1704009"}*/}
          <Box data-tag="allowRowEvents">
            <IconButton data-tag="allowRowEvents">
              <MyIcon icon="memo" size={18} data-tag="allowRowEvents" />
            </IconButton>
          </Box>
        </Stack>
      );
    },
  },
  {
    name: "변경전",
    ignoreRowClick: true,
    selector: (row) => row.preUpdateValue,
  },
  {
    name: "변경후",
    ignoreRowClick: true,
    selector: (row) => row.postUpdateValue,
  },
];
