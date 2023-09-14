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
                Control
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                분변
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Sample / gDNA
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'ao' ?
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
                환경
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Bacteria (16S rRNA V3-V4)
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                CGACCHCCGDAHAA
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                YGACCHCCCHCCAA
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

      {serviceType === 'group' ?
        (
          <TableRow>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666", width: "30px" }}>
                예시
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Cotrol, Disease, Treatment
              </Typography>
            </TableCell>
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
