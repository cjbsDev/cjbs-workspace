import React from "react";
import { Stack, Grid, Link } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
} from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
import IconDescBar from "../../../../components/IconDescBar";
import { SubHeaderProps } from "../../../../types/subHeader-props";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={12} sx={{ pt: 0 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
          {/*<Link href="/stock-hspt-mngmnt-reg">*/}
          {/*  <ContainedButton buttonName="거래처 등록" size="small" />*/}
          {/*</Link>*/}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          {/*<FileDownloadBtn*/}
          {/*  exportUrl={`/stock/hspt/list/download`}*/}
          {/*  iconName="xls3"*/}
          {/*/>*/}
          <KeywordSearch />
          {/*<ResultInSearch />*/}
        </Stack>
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
