import React from "react";
import {Box, TableCell, TableRow, Typography} from "@mui/material";
import {cjbsTheme} from "cjbsDSTM";

const ExRow = ( props:any ) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;

  return (
    <>
      {serviceType === 'fs' ?
        (
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
                Escherichia coli CJ2
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                GCF_000010485.1
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'ngs' ?
        (
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
                Escherichia coli CJ2
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                GCF_000010485.1
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'so' ?
        (
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
                N701
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                TCGCCTTA
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                S502
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                CTCTCTAT
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

    </>
  );
};

export default ExRow;
