"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Stack, Typography } from "@mui/material";
import { getColumns } from "./components/Columns";
import SubHeader from "./components/SubHeader";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { useRouter } from "next-nprogress-bar";
import Expanded from "./components/Expanded";
import dayjs from "dayjs";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  invcStartMonthAtom,
  invcStartYearAtom,
  invcEndYearAtom,
  invcEndMonthAtom,
} from "./atom";

const ListTax = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);

  const startYear = useRecoilValue(invcStartYearAtom);
  const startMonth = useRecoilValue(invcStartMonthAtom);
  const endYear = useRecoilValue(invcEndYearAtom);
  const endMonth = useRecoilValue(invcEndMonthAtom);

  const [resultObject, result] = useResultObject();
  const router = useRouter();

  const url = useMemo(() => {
    const base = "/invc/list";
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
  console.log("TAX Data ==>>", data);
  const listData = data.invcList;
  const totalElements = data.pageInfo.totalElements;

  const columns = useMemo(() => getColumns(totalElements), [totalElements]);

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
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

  const goDetailPage = useCallback((row: any) => {
    const { invcUkey } = row;
    console.log("INVOICE UKEY ==>>", invcUkey);
    router.push("/ledger-tax-invoice-list/" + invcUkey);
  }, []);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="세금계산서" />}
        data={listData}
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
        // sortServer
        // onSort={handleSort}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        expandableRows
        expandOnRowClicked={false}
        expandableRowsComponent={Expanded}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
      />
    </Box>
  );
};

export default ListTax;
