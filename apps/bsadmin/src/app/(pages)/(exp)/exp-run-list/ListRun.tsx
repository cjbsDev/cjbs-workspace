"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
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

const ListRun = () => {
  const [showRunAddModal, setShowRunAddModal] = useState(false);
  // const [showBIReqModal, setShowBIReqModal] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const currentPath = usePathname();

  const key = useMemo(() => {
    const base = "/run/list";
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

  console.log("data ==??", data);

  // if (error) return <div>failed to load</div>;
  // if (isLoading) return <div>loading...</div>;

  // console.log("RUN LIST DATA", data);
  // const { runDetailList, pageInfo } = data;
  // const { totalElements } = pageInfo;
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = useMemo(() => {
    const handleRunAddModalOpen = () => {
      setShowRunAddModal(true);
    };
    return (
      <SubHeader
        totalElements={data?.pageInfo?.totalElements}
        result={result}
        handleRunAddModalOpen={handleRunAddModalOpen}
      />
    );
  }, [data?.pageInfo?.totalElements, result]);

  const goDetailPage = (row: any) => {
    const path = row.runUkey;
    router.push("/exp-run-list/" + path);
  };

  const handleRunAddModalClose = () => {
    setShowRunAddModal(false);
  };

  const handlePageChange = useCallback((page: number) => {
    // console.log("Page", page);
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: number, page: number) => {
      // console.log("Row change.....", newPerPage, page);
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
          position: "relative",
          // height: height,
        }}
      >
        {isLoading && (
          // <CircularProgress
          //   color="success"
          //   size={30}
          //   sx={{
          //     position: "absolute",
          //     top: "50%",
          //     left: "50%",
          //     transform: "translate(-50%, -50%)",
          //     zIndex: 9999,
          //   }}
          // />
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              // position: "absolute",
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" size={30} />
          </Backdrop>
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
          subHeaderComponent={subHeaderComponentMemo}
          fixedHeader={true}
          fixedHeaderScrollHeight={`${height}px`}
          paginationResetDefaultPage={resetPaginationToggle}
          selectableRows={false}
          pagination
          paginationServer
          paginationTotalRows={data?.pageInfo?.totalElements}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          noDataComponent={
            data === undefined ? (
              <Typography variant="body1">Loading...</Typography>
            ) : (
              <NoDataView resetPath={currentPath} />
            )
          }
          paginationPerPage={100}
          paginationRowsPerPageOptions={[100, 200, 300, 400]}
          // progressPending={isLoading}
          // progressComponent={<CircularProgress size={30} />}
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
