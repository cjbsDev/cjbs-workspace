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
  handleSampleAddModalOpen?: () => void;
  handleAnalDtlModalOpen?: () => void;
  handleSampleBatchModalOpen?: () => void;
  handleExPrgrsPhsOpen?: () => void;
  handleClear?: () => void;
  onFilter: any;
}

const SubHeader = (props: SubHeaderProps) => {
  const {
    filterText,
    totalCount,
    exportUrl,
    handleSampleAddModalOpen,
    handleAnalDtlModalOpen,
    handleSampleBatchModalOpen,
    handleExPrgrsPhsOpen,
    handleClear,
    onFilter,
  } = props;

  console.log("exportUrl", exportUrl);

  return (
    <Grid container>
      <Grid item xs={5} sx={{ pt: 0 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {/* <DataCountResultInfo totalCount={totalCount} /> */}
          <ContainedButton
            buttonName="샘플 추가"
            size="small"
            onClick={handleSampleAddModalOpen}
            disabled={totalCount === 0}
          />
          <ContainedButton
            buttonName="분석 내역 보기"
            size="small"
            onClick={handleAnalDtlModalOpen}
            // disabled={true}
          />
          <OutlinedButton
            buttonName="샘플 정보 일괄 변경"
            size="small"
            color="secondary"
            sx={{ color: "black" }}
            onClick={handleSampleBatchModalOpen}
          />
          <OutlinedButton
            buttonName="실험 진행 단계 변경"
            size="small"
            color="secondary"
            sx={{ color: "black" }}
            onClick={handleExPrgrsPhsOpen}
          />
          <FileDownloadBtn exportUrl={exportUrl} iconName="xls3" />
        </Stack>
      </Grid>
      {/* <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }} alignItems="center">
          <FileDownloadBtn exportUrl={exportUrl} iconName="xls3" />

          <DataTableFilter
            onFilter={onFilter}
            onClear={handleClear}
            filterText={filterText}
          />
        </Stack>
      </Grid> */}
    </Grid>
  );
};

export default SubHeader;
