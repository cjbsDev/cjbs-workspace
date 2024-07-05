import React from "react";
import { Stack, Grid, Link } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
} from "cjbsDSTM";
import KeywordSearch from "../../../components/KeywordSearch";
import ResultInSearch from "./ResultInSearch";
import IconDescBar from "../../../components/IconDescBar";
import { SubHeaderProps } from "../../../types/subHeader-props";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={12} sx={{ pt: 0 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
          {/*<Link href="/order-reg">*/}
          {/*  <ContainedButton buttonName="오더 등록" size="small" />*/}
          {/*</Link>*/}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          <IconDescBar freeDisabled={true} reOrder={true} />
          <FileDownloadBtn
            exportUrl={`/order/list/download${result}`}
            iconName="xls3"
          />
          <KeywordSearch />
          <ResultInSearch />
        </Stack>
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
