import React from "react";
import { Stack, Grid, Link, Typography, Box } from "@mui/material";
import {
  DataCountResultInfo,
  ContainedButton,
  FileDownloadBtn,
  ErrorContainer,
  Fallback,
  SelectBox3,
} from "cjbsDSTM";
import KeywordSearch from "../../../../../components/KeywordSearch";
// import ResultInSearch from "./ResultInSearch";
import { SubHeaderProps } from "../../../../../types/subHeader-props";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import InvcReqFilterBtn from "./InvcReqFilterBtn";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../../data/inputDataLists";
import { useRecoilState } from "recoil";
import {
  endMonthAtom,
  endYearAtom,
  startMonthAtom,
  startYearAtom,
} from "../atom";
const LazyTotalTaxPrice = dynamic(() => import("./TotalTaxPrice"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

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
  // startMonth,
  // startYear,
  // endYear,
  // endMonth,
  // handleStartMonth,
  // handleStartYear,
  // handleEndMonth,
  // handleEndYear,
}: ExtentSubHeaderProps) => {
  const [startYear, setStartYear] = useRecoilState(startYearAtom);
  const [startMonth, setStartMonth] = useRecoilState(startMonthAtom);
  const [endYear, setEndYear] = useRecoilState(endYearAtom);
  const [endMonth, setEndMonth] = useRecoilState(endMonthAtom);

  const handleStartYear = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setStartYear(value);
  };

  const handleStartMonth = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setStartMonth(value);
  };

  const handleEndYear = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setEndYear(value);
  };

  const handleEndMonth = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setEndMonth(value);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
            <Link href="./ledger-tax-invoice-reg">
              <ContainedButton buttonName="세금계산서 등록" size="small" />
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

          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <Stack direction="row">
              <InvcReqFilterBtn />
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <FileDownloadBtn
                exportUrl={`/invc/list/download`}
                iconName="xls3"
              />
              <KeywordSearch />
              {/*<ResultInSearch />*/}
            </Stack>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyTotalTaxPrice />
        </ErrorContainer>
      </Grid>
    </Grid>
  );
};

export default SubHeader;
