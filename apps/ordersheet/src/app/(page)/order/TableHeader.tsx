import React from "react";
import {
  Box,
  Stack,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey[100] }}>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="subtitle2">No.</Typography>
        </TableCell>
        <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">샘플명 </Typography>{" "}
            <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
              *
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">샘플출처 </Typography>{" "}
            <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
              *
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">샘플 상태 </Typography>{" "}
            <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
              *
            </Box>
          </Stack>
        </TableCell>
        <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2">분석 타겟 유전자 </Typography>{" "}
            <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
              *
            </Box>
          </Stack>
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="subtitle2">자체 DNA QC</Typography>
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <Typography variant="subtitle2">비고</Typography>
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
