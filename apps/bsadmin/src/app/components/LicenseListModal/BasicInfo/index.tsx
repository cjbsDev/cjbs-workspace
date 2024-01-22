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
  RadioGV,
  SkeletonLoading,
  TD,
  TH,
  Form,
} from "cjbsDSTM";
// import { yieldData } from "../../../../data/inputDataLists";
import dynamic from "next/dynamic";

const LazyStndPriceSrvcType = dynamic(() => import("./StndPriceSrvcType"), {
  ssr: false,
  loading: () => <SkeletonLoading height={180} />,
});

const BasicInfo = (props: any) => {
  const type = props.type === "analysis" ? "BS_0100005001" : "BS_0100005002";
  const handlePlatformChange = props.handlePlatformChange;
  const onClose = props.onClose;

  return (
    <Box>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              {/*<TH sx={{ width: "15%" }}>서비스 분류</TH>*/}
              <TD sx={{ width: "100%", p: 0, border: 0 }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazyStndPriceSrvcType
                    type={type}
                    handlePlatformChange={handlePlatformChange}
                    onClose={onClose}
                  />
                </ErrorContainer>
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>생산량</TH>*/}
            {/*  <TD sx={{ width: "85%" }}>*/}
            {/*    <RadioGV*/}
            {/*      data={yieldData}*/}
            {/*      inputName="prdcSizeMc"*/}
            {/*      required={true}*/}
            {/*      errorMessage="에러메세지는 여기에"*/}
            {/*    />*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BasicInfo;
