import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  RadioGV,
  SkeletonLoading,
  TD,
  TH,
} from "cjbsDSTM";
import { yieldData } from "../../../../data/inputDataLists";
import dynamic from "next/dynamic";

const LazyStndPriceSrvcType = dynamic(() => import("./StndPriceSrvcType"), {
  ssr: false,
  loading: () => <SkeletonLoading height={180} />,
});

const BasicInfo = () => {
  return (
    <Box>
      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>서비스 분류</TH>
              <TD sx={{ width: "85%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStndPriceSrvcType />
                </ErrorContainer>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>생산량</TH>
              <TD sx={{ width: "85%" }}>
                <RadioGV
                  data={yieldData}
                  inputName="testRadioGV"
                  required={true}
                  errorMessage="에러메세지는 여기에"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BasicInfo;
