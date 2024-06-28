"use client";
import * as React from "react";
import { useMemo } from "react";
import { DataTableBase } from "cjbsDSTM";
import { Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";
import NoDataView from "../../../../../components/NoDataView";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./components/Columns/CustPayListColumns";
import SubHeader from "./components/SubHeader/CustPayListSubHeader";

const CustPayList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const router = useRouter();

  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/agnc/pymt/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  console.log("결제 현황 Data ==>>", data);
  const { agncPymtList, rmnPrice, totalAnlsPrice, totalPymtPrice, pageInfo } =
    data;
  const { totalElements } = pageInfo;

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={totalElements}
        result={result}
        rmnPrice={rmnPrice}
        totalPymtPrice={totalPymtPrice}
        totalAnlsPrice={totalAnlsPrice}
      />
    ),
    [totalElements, result, rmnPrice, totalPymtPrice, totalAnlsPrice],
  );

  const goDetailPage = (row: any) => {
    const agncUkey = row.agncUkey;
    router.push("/ledger-cust-pay-list/" + agncUkey);
  };

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setSize(newPerPage);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={agncPymtList}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={<NoDataView />}
        // expandOnRowDoubleClicked={true}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
      />
    </Box>
  );
};

export default CustPayList;
