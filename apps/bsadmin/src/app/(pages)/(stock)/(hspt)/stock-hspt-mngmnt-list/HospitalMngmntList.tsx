"use client";
import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { Box } from "@mui/material";
import { getColumns } from "./Columns";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import SubHeader from "./SubHeader";
import { useRouter } from "next-nprogress-bar";

const HospitalMngmntList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [resultObject, result] = useResultObject();
  const router = useRouter();

  const url = useMemo(() => {
    const base = "/stock/hspt/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  const { stockHsptList, pageInfo } = data;
  const { totalElements } = pageInfo;

  console.log("Hospital Data List ==>>", stockHsptList);

  const columns = useMemo(() => getColumns(totalElements), [totalElements]);

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
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

  const goDetailPage = (row: any) => {
    const { stockHsptUkey } = row;
    router.push(`/stock-hspt-mngmnt-list/${stockHsptUkey}`);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="병원 거래처 관리" />}
        data={stockHsptList}
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
        noDataComponent={<NoDataView resetPath={"/order-list"} />}
        // defaultSortFieldId={1}
        // defaultSortAsc={false}
      />
    </Box>
  );
};

export default HospitalMngmntList;
