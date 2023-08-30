import React from "react";
import { TableCell, TableRow, Typography } from "@mui/material";

const ExRow = () => {
  return (
    <TableRow>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666", width: "30px" }}>
          예시
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          CJ01
        </Typography>
        <Typography variant="caption" sx={{ color: "#666" }}>
          (영문, 숫자, -(hyphen)만 입력 가능)
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          토양
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          gDNA
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Bacteria (16S rRNA V3-V4)
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          농도, 사이즈
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2" sx={{ color: "#666" }}>
          gDNA
        </Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
    </TableRow>
  );
};

export default ExRow;
