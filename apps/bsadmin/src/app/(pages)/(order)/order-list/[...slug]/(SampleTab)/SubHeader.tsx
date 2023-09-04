import React from "react";
import { Grid, Stack } from "@mui/material";
import {
  ContainedButton,
  DataCountResultInfo,
  DataTableFilter,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";
import { toast } from "react-toastify";

interface SubHeaderProps {
  totalCount: number;
  exportUrl: string;
  // sampleUkeyList: string[];
  handleSampleAddModalOpen: () => void;
  handleSampleBatchModalOpen: () => void;
  handleExPrgrsPhsOpen: () => void;
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
            buttonName="샘플 추가"
            size="small"
            onClick={handleSampleAddModalOpen}
          />
          {/* 개발 예정(10월 중순...) */}
          {/*<ContainedButton buttonName="분석 내역 보기" size="small" />*/}
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
