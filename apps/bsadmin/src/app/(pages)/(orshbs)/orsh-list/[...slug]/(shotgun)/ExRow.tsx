import React from "react";
import {Box, TableCell, TableRow, Typography, Stack} from "@mui/material";
import {CheckboxSV, cjbsTheme} from "cjbsDSTM";

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
                Control
              </Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2" sx={{ color: "#666" }}>
                분변
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
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-start" sx={{width: '100%'}}>
                <CheckboxSV
                  inputName="test1"
                  labelText="Cotrol"
                  value=""
                  inputProps={{
                    checked: true
                  }}
                  disabled
                />
                <CheckboxSV
                  inputName="test2"
                  labelText="Disease"
                  value=""
                  disabled
                />
                <CheckboxSV
                  inputName="test3"
                  labelText="Treatment"
                  value=""
                  inputProps={{
                    checked: true
                  }}
                  disabled
                />
                <Typography variant="body2" sx={{ color: "#999FA4" }}>
                  (체크한 "Control" 그룹과 "Treatment" 그룹을 비교 분석합니다.)
                </Typography>
              </Stack>
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
