"use client";
import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { Box, Stack } from "@mui/material";
import { DataTableBase, Title1 } from "cjbsDSTM";
import dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";

const MngmntList = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [startYear, setStartYear] = useState(dayjs().year());
  const [startMonth, setStartMonth] = useState(
    dayjs().month(0).get("month") + 1,
  );
  const [endYear, setEndYear] = useState(dayjs().year());
  const [endMonth, setEndMonth] = useState(dayjs().month() + 1);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/stock/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`
        : `?page=${page}&size=${size}&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`;
    return `${base}${params}`;
  }, [
    resultObject,
    result,
    page,
    size,
    startYear,
    startMonth,
    endYear,
    endMonth,
  ]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  const { stockList, pageInfo } = data;
  const { totalElements } = pageInfo;

  console.log("Stock Data List ==>>", stockList);

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

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={totalElements}
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
    [totalElements, result, startYear, startMonth, endYear, endMonth],
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

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="재고 관리" />}
        data={stockList}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
      />
    </Box>
  );
};

export default MngmntList;
