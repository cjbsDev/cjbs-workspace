"use client";

import React, { useCallback, useMemo } from "react";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { usePathname, useSearchParams } from "next/navigation";
import NoDataView from "../../../components/NoDataView";
import { useResultObject } from "../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

const base = "/sample/list";

const ListSample = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const currentPath = usePathname();
  const pathname = usePathname();
  const url = useMemo(() => {
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);
  const { data, isLoading } = useSWR(url, fetcher, {
    // suspense: true,
    keepPreviousData: true,
  });

  console.log("SAMPLE LIST DATA", data);
  // const runListData = data.sampleList;
  // const totalElements = data.pageInfo.totalElements;
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <SubHeader
        totalElements={data?.pageInfo?.totalElements}
        result={result}
      />
    );
  }, [result, data?.pageInfo?.totalElements]);

  const goDetailPage = useCallback(
    (row: any) => {
      const path = row.orderUkey;
      router.push("/order-list/" + path + `?from=${pathname}&tabIndex=3`);

      // href={`/order-list/${orderUkey}?from=/exp-sample-list&tabIndex=3`}
    },
    [pathname, router],
  );

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
        title={<Title1 titleName="All Samples" />}
        data={data?.sampleList}
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
          data === undefined ? null : <NoDataView resetPath={currentPath} />
        }
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400]}
      />
    </Box>
  );
};

export default ListSample;
