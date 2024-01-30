import React from "react";
import { Grid, Link, Stack } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  FileDownloadBtn,
} from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
import ResultInSearch from "./resultInSearch";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import StatusFilter from "./statusFilter";
import AnlsFilter from "./anlsFilter";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <AnlsFilter />
            <StatusFilter />
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Link href="/order-reg">
              <ContainedButton buttonName="오더 등록" size="small" />
            </Link>
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
};

export default SubHeader;
