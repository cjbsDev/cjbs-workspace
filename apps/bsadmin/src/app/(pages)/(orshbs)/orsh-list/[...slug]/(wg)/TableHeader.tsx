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

const TableHeader = (props:any) => {
  const serviceType = props.serviceType;

  return (
    <>

      {serviceType === 'fs' ?
        (
          <TableHead>
            <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey[100] }}>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">No.</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">샘플명 </Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">*</Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Taxonomy (Genus+Species+Strain)</Typography>
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">*</Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Locus tag prefix</Typography>{" "}
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">샘플 상태</Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">*</Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">16S rDNA Identifacation</Typography>{" "}
                </Stack>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">비고</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
        ) : (
          ''
        )
      }

      {serviceType === 'ao' ?
        (
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
                  <Typography variant="subtitle2">Taxonomy (Genus+Species+Strain)</Typography>
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">*</Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Locus tag prefix</Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">DATA 상태</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">비고</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
        ) : (
          ''
        )
      }

      {serviceType === 'so' ?
        (
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
                  <Typography variant="subtitle2">Index 1 name </Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                    *
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Index 1 (forward) </Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                    *
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Index 2 name </Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                    *
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Index 2 (reverse) </Typography>{" "}
                  <Box sx={{ color: "#EF151E", fontSize: 12 }} component="span">
                    *
                  </Box>
                </Stack>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">Adapter</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">비고</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
        ) : (
          ''
        )
      }

      {serviceType === 'comparative' ?
        (
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
                  <Typography variant="subtitle2">Taxonomy (Genus+Species+Strain)</Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">Project(DB) Accession No.</Typography>
                </Stack>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">비고</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
        ) : (
          ''
        )
      }

    </>
  );
};

export default TableHeader;
