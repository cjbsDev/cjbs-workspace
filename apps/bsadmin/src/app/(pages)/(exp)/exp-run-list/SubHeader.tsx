import React from "react";
import { Stack, Grid } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
} from "cjbsDSTM";
import KeywordSearch from "../../../components/KeywordSearch";
import { SubHeaderProps } from "../../../types/subHeader-props";

interface SubHeaderExtndProps extends SubHeaderProps {
  handleRunAddModalOpen: () => void;
}

const SubHeader = ({
  totalElements,
  result,
  handleRunAddModalOpen,
}: SubHeaderExtndProps) => (
  <Grid container>
    <Grid item xs={5} sx={{ pt: 0 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <DataCountResultInfo totalCount={totalElements} />
        <ContainedButton
          buttonName="RUN 등록"
          size="small"
          onClick={handleRunAddModalOpen}
        />
      </Stack>
    </Grid>
    <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
        <FileDownloadBtn
          exportUrl={`/run/list/download${result}`}
          iconName="xls3"
        />

        <KeywordSearch />
      </Stack>
    </Grid>
  </Grid>
);

export default SubHeader;
