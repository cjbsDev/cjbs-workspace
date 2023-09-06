import React from "react";
import { Grid, Stack } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";

interface SubHeaderProps {
  totalCount: number;
  exportUrl?: string;
  // sampleUkeyList: string[];
  handleSampleAddModalOpen?: () => void;
  handleSampleBatchModalOpen?: () => void;
  handleExPrgrsPhsOpen?: () => void;
}

const SubHeader = (props: SubHeaderProps) => {
  const {
    totalCount,
    exportUrl,
    handleSampleAddModalOpen,
    handleSampleBatchModalOpen,
    handleExPrgrsPhsOpen,
  } = props;

  return (
    <Grid container>
      <Grid item xs={5} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalCount} />
          <ContainedButton
            buttonName="파일 업로드"
            size="small"
            // onClick={handleSampleAddModalOpen}
          />
        </Stack>
      </Grid>
      <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          <FileDownloadBtn exportUrl={exportUrl} iconName="xls3" />

          {/*<DataTableFilter*/}
          {/*  onFilter={(e: {*/}
          {/*    target: { value: React.SetStateAction<string> };*/}
          {/*  }) => setFilterText(e.target.value)}*/}
          {/*  onClear={handleClear}*/}
          {/*  filterText={filterText}*/}
          {/*/>*/}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
