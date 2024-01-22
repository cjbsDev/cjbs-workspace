import React from "react";
import { Stack, Grid, Link, Typography, Box } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
  ErrorContainer,
  Fallback,
} from "cjbsDSTM";
import KeywordSearch from "../../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
import { SubHeaderProps } from "../../../../../types/subHeader-props";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import InvcReqFilterBtn from "./InvcReqFilterBtn";
const LazyTotalTaxPrice = dynamic(() => import("./TotalTaxPrice"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={12} sx={{ pt: 0 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
          <Link href="./ledger-tax-invoice-reg">
            <ContainedButton buttonName="세금계산서 등록" size="small" />
          </Link>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Stack direction="row">
            <InvcReqFilterBtn />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <FileDownloadBtn
              exportUrl={`/invc/list/download`}
              iconName="xls3"
            />
            <KeywordSearch />
            {/*<ResultInSearch />*/}
          </Stack>
        </Stack>
      </Stack>
    </Grid>

    <Grid item xs={12}>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyTotalTaxPrice />
      </ErrorContainer>
    </Grid>
  </Grid>
);

export default SubHeader;
