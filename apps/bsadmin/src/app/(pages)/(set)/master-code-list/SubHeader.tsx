import React from "react";
import { Stack, Grid } from "@mui/material";
import { DataCountResultInfo } from "cjbsDSTM";
import KeywordSearch from "../../../components/KeywordSearch";
import { SubHeaderProps } from "../../../types/subHeader-props";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => {
  return (
    <Grid container>
      <Grid item xs={6} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />
        </Stack>
      </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          {/*<KeywordSearch />*/}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
