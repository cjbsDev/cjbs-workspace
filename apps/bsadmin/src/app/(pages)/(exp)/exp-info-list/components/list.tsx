"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import useSWR from "swr";
import { fetcher } from "api";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { Box } from "@mui/material";
import { Columns } from "./columns";
import SubHeader from "./subHeader";

const List = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/expt/info/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });
  console.log("EXPT LIST DATA", data);
  const { exptInfoList, pageInfo } = data;
  const totalElements = pageInfo.totalElements;

  const columns = useMemo(() => Columns(), []);

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  const handlePageChange = useCallback((page: number) => {
    console.log("Page", page);
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: number, page: number) => {
      console.log("Row change.....", newPerPage, page);
      setPage(page);
      setSize(newPerPage);
    },
    [],
  );

  return (
    <>
      <Box sx={{ display: "grid" }}>
        <DataTableBase
          title={<Title1 titleName="실험정보" />}
          data={exptInfoList}
          columns={columns}
          // onRowClicked={goDetailPage}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
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
        />
      </Box>
    </>
  );
};

export default List;
