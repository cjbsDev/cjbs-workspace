"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import NoDataView from "../../../components/NoDataView";
import dynamic from "next/dynamic";
import { useResultObject } from "../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";

const LazyRunAddModal = dynamic(() => import("./RunAddModal"), {
  ssr: false,
});

const ListRun = () => {
  const [showRunAddModal, setShowRunAddModal] = useState(false);
  // const [showBIReqModal, setShowBIReqModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/run/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  console.log("RUN LIST DATA", data);
  const runListData = data.runDetailList;
  const totalElements = data.pageInfo.totalElements;
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = useMemo(() => {
    const handleRunAddModalOpen = () => {
      setShowRunAddModal(true);
    };
    return (
      <SubHeader
        totalElements={totalElements}
        result={result}
        handleRunAddModalOpen={handleRunAddModalOpen}
      />
    );
  }, [totalElements, result]);

  const goDetailPage = (row: any) => {
    const path = row.runUkey;
    router.push("/exp-run-list/" + path);
  };

  const handleRunAddModalClose = () => {
    setShowRunAddModal(false);
  };

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
          title={<Title1 titleName="All RUN" />}
          data={runListData}
          columns={columns}
          onRowClicked={goDetailPage}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationResetDefaultPage={resetPaginationToggle}
          selectableRows={false}
          pagination
          paginationServer
          paginationTotalRows={totalElements}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          noDataComponent={<NoDataView />}
          paginationPerPage={100}
          paginationRowsPerPageOptions={[50, 100, 200, 300, 400]}
        />
      </Box>

      {showRunAddModal && (
        <LazyRunAddModal
          onClose={handleRunAddModalClose}
          open={showRunAddModal}
          modalWidth={800}
        />
      )}
    </>
  );
};

export default ListRun;
