"use client";
import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { Box, CircularProgress, Stack } from "@mui/material";
import { DataTableBase, grey, Title1 } from "cjbsDSTM";
import dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import StockCtgryRadio from "./components/StockCtgryRadio";
import { useRecoilValue } from "recoil";
import { stockCategoryAtom } from "./atom";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";
import { gray } from "next/dist/lib/picocolors";
import { lightBlue } from "@mui/material/colors";

const base = `/stock/list`;

const MngmntList = () => {
  const router = useRouter();
  const height = useCalculatedHeight(268);
  const currentPath = usePathname();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [sort, setSort] = useState<string>("stockId,DESC");
  const [startYear, setStartYear] = useState(dayjs().year());
  const [startMonth, setStartMonth] = useState(
    dayjs().month(0).get("month") + 1,
  );
  const [endYear, setEndYear] = useState(dayjs().year());
  const [endMonth, setEndMonth] = useState(dayjs().month() + 1);
  const [resultObject, result] = useResultObject();
  const getStockCategoryVal = useRecoilValue(stockCategoryAtom);

  const url = useMemo(() => {
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&stockCtgrCc=${getStockCategoryVal}&page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}&sort=${sort}`
        : `?stockCtgrCc=${getStockCategoryVal}&page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}&sort=${sort}`;
    return `${base}${params}`;
  }, [
    resultObject,
    result,
    page,
    size,
    startYear,
    startMonth,
    sort,
    endYear,
    endMonth,
    getStockCategoryVal,
  ]);

  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  // const { stockList, pageInfo } = data;
  // const { totalElements } = pageInfo;
  console.log("Stock Data List ==>>", data);

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

  const columns = useMemo(
    () => getColumns(getStockCategoryVal),
    [getStockCategoryVal],
  );

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={data?.pageInfo.totalElements}
        result={result}
        startMonth={startMonth}
        startYear={startYear}
        endMonth={endMonth}
        endYear={endYear}
        handleEndMonth={handleEndMonth}
        handleEndYear={handleEndYear}
        handleStartMonth={handleStartMonth}
        handleStartYear={handleStartYear}
      />
    ),
    [
      data?.pageInfo.totalElements,
      result,
      startYear,
      startMonth,
      endYear,
      endMonth,
    ],
  );

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );

  const goDetailPage = (row) => {
    const { stockUkey } = row;
    router.push(`${currentPath}/${stockUkey}`);
  };

  const handleSort = useCallback(
    (selectedColumn: { sortField: any }, sortDirection: string) => {
      const sortValue = `${
        selectedColumn.sortField
      },${sortDirection.toUpperCase()}`;
      setSort(sortValue);
    },
    [],
  );


  return (
    <Box sx={{ display: "grid" }}>
      {isLoading && (
        <CircularProgress
          color="success"
          size={30}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        />
      )}
      <DataTableBase
        title={<StockCtgryRadio />}
        data={data?.stockList}
        columns={columns}
        onRowClicked={goDetailPage}
     //   pointerOnHover
        highlightOnHover
        
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={data?.pageInfo.totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={
          data === undefined ? null : <NoDataView resetPath={currentPath} />
        }
        sortServer
        onSort={handleSort}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400]}
        customStyles={dataTableCustomStyles}
      />
    </Box>
  );
};

export default MngmntList;
