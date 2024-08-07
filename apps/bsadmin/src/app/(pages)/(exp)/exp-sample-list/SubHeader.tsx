import React from "react";
import { Stack, Grid } from "@mui/material";
import { DataCountResultInfo, FileDownloadBtn } from "cjbsDSTM";
import KeywordSearch from "../../../components/KeywordSearch";
import { SubHeaderProps } from "../../../types/subHeader-props";
import ResultInSearch from "./components/ResultInSearch";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={5} sx={{ pt: 0 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <DataCountResultInfo totalCount={totalElements} />
      </Stack>
    </Grid>
    <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
        <FileDownloadBtn
          exportUrl={`/sample/list/download${result}`}
          iconName="xls3"
        />

        <KeywordSearch />
        <ResultInSearch />
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
