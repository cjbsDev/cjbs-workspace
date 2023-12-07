import React from "react";
import { Grid, Stack } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  DataTableFilter,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";

interface SubHeaderProps {
  filterText: string;
  totalCount: number;
  exportUrl?: string;
  // sampleUkeyList: string[];
  handleFileUploadModalOpen?: () => void;
  // handleSampleBatchModalOpen?: () => void;
  // handleExPrgrsPhsOpen?: () => void;
  handleClear?: () => void;
  onFilter: any;
}

const SubHeader = (props: SubHeaderProps) => {
  const {
    filterText,
    totalCount,
    exportUrl,
    handleFileUploadModalOpen,
    handleClear,
    onFilter,
  } = props;

  return (
    <Grid container>
      <Grid item xs={5} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DataCountResultInfo totalCount={totalCount} />
          <ContainedButton
            buttonName="파일 업로드"
            size="small"
            onClick={handleFileUploadModalOpen}
          />
        </Stack>
      </Grid>
      <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          {/*<FileDownloadBtn exportUrl={exportUrl} iconName="xls3" />*/}

          <DataTableFilter
            onFilter={onFilter}
            onClear={handleClear}
            filterText={filterText}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
