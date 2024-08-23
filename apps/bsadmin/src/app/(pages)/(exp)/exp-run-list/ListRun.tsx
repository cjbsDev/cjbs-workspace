"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, CircularProgress, Typography } from "@mui/material";
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
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";
import { usePathname } from "next/navigation";

const LazyRunAddModal = dynamic(() => import("./RunAddModal"), {
  ssr: false,
});

const base = "/run/list";

const ListRun = () => {
  const [showRunAddModal, setShowRunAddModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const currentPath = usePathname();
  const router = useRouter();

  const key = useMemo(() => {
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data, isLoading } = useSWR(key, fetcher, {
    // suspense: true,
    keepPreviousData: true,
  });

  // console.log("data ==??", data);

  // const { runDetailList, pageInfo } = data;
  // const { totalElements } = pageInfo;

  const columns = useMemo(() => getColumns(), []);

  const handleRunAddModalOpen = () => {
    setShowRunAddModal(true);
  };

  const handleRunAddModalClose = () => {
    setShowRunAddModal(false);
  };

  // const subHeaderComponentMemo = useMemo(() => {
  //   const handleRunAddModalOpen = () => {
  //     setShowRunAddModal(true);
  //   };
  //   return (
  //     <SubHeader
  //       totalElements={data?.pageInfo?.totalElements}
  //       result={result}
  //       handleRunAddModalOpen={handleRunAddModalOpen}
  //     />
  //   );
  // }, [data?.pageInfo?.totalElements, result]);

  const goDetailPage = useCallback(
    (row: any) => {
      router.push(`/exp-run-list/${row.runUkey}`);
    },
    [router],
  );

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: number, page: number) => {
      setPage(page);
      setSize(newPerPage);
    },
    [],
  );

  return (
    <>
      <Box
        sx={{
          display: "grid",
        }}
      >
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
          title={<Title1 titleName="All RUN" />}
          data={data?.runDetailList}
          columns={columns}
          onRowClicked={goDetailPage}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          // subHeaderComponent={subHeaderComponentMemo}
          subHeaderComponent={
            <SubHeader
              totalElements={data?.pageInfo?.totalElements}
              result={result}
              handleRunAddModalOpen={handleRunAddModalOpen}
            />
          }
          fixedHeader
          fixedHeaderScrollHeight={`${height}px`}
          selectableRows={false}
          pagination
          paginationServer
          paginationTotalRows={data?.pageInfo?.totalElements}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          noDataComponent={
            data === undefined ? null : <NoDataView resetPath={currentPath} />
          }
          paginationPerPage={100}
          paginationRowsPerPageOptions={[100, 200, 300, 400]}
        />
      </Box>

      {showRunAddModal && (
        <LazyRunAddModal
          onClose={handleRunAddModalClose}
          open={showRunAddModal}
          modalWidth={600}
        />
      )}
    </>
  );
};

export default ListRun;
