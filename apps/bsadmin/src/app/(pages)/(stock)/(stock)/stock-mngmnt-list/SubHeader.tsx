import React from "react";
import { Stack, Grid, Link } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
  SelectBox3,
} from "cjbsDSTM";
import KeywordSearch from "../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
import IconDescBar from "../../../../components/IconDescBar";
import { SubHeaderProps } from "../../../../types/subHeader-props";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../data/inputDataLists";
import { useRecoilValue } from "recoil";
import { stockCategoryAtom } from "./atom";

interface ExtentSubHeaderProps extends SubHeaderProps {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
  handleStartYear: (event: { target: { value: any } }) => void;
  handleStartMonth: (event: { target: { value: any } }) => void;
  handleEndYear: (event: { target: { value: any } }) => void;
  handleEndMonth: (event: { target: { value: any } }) => void;
}

const SubHeader = ({
  totalElements,
  result,
  startMonth,
  startYear,
  endYear,
  endMonth,
  handleStartMonth,
  handleStartYear,
  handleEndMonth,
  handleEndYear,
}: ExtentSubHeaderProps) => {
  const getStockCategoryVal = useRecoilValue(stockCategoryAtom);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="/stock-mngmnt-reg">
              <ContainedButton buttonName="재고 등록" size="small" />
            </Link>

            <Stack direction="row" spacing={1}>
              <Stack direction="row" spacing={1}>
                <SelectBox3
                  options={dashboardYearData}
                  value={startYear}
                  onChange={handleStartYear}
                />
                <SelectBox3
                  options={dashboardMonthData}
                  value={startMonth}
                  onChange={handleStartMonth}
                />
              </Stack>

              <Stack direction="row" spacing={1}>
                <SelectBox3
                  options={dashboardYearData}
                  value={endYear}
                  onChange={handleEndYear}
                />
                <SelectBox3
                  options={dashboardMonthData}
                  value={endMonth}
                  onChange={handleEndMonth}
                />
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <FileDownloadBtn
              exportUrl={`/stock/list/download?stockCtgrCc=${getStockCategoryVal}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`}
              iconName="xls3"
            />
            <KeywordSearch />
            {/*<ResultInSearch />*/}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
