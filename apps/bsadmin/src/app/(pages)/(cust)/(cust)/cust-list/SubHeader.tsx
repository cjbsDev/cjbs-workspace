import React from "react";
import { Stack, Grid } from "@mui/material";
import { ContainedButton, DataCountResultInfo } from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
// import IconDescBar from "../../../components/IconDescBar";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import Filter from "./Filter";
import Link from "next/link";

const SubHeader = ({ totalElements, result }: SubHeaderProps) => (
  <Grid container>
    <Grid item xs={12} sx={{ pt: 0 }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalElements} />

          <Link href="/cust-reg">
            <ContainedButton buttonName="고객 등록" size="small" />
          </Link>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
          <Filter />
          <KeywordSearch />
        </Stack>
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
