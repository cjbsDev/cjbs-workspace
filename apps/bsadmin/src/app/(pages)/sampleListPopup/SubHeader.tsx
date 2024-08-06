import React from "react";
import { Grid, Stack } from "@mui/material";
import { DataCountResultInfo } from "cjbsDSTM";
import KeywordSearch from "../../components/KeywordSearch";
import ResultInSearch from "./ResultInSearch";

const SubHeader = ({ totalElements }) => {
  return (
    <Grid container>
      <Grid item xs={5} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
        </Stack>
      </Grid>
      <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          <KeywordSearch />
          <ResultInSearch />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
