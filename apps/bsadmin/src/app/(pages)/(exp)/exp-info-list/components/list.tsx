"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import useSWR from "swr";
import { fetcher } from "api";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { Box, CircularProgress } from "@mui/material";
import { Columns } from "./columns";
import SubHeader from "./SubHeader";
import { useRouter } from "next-nprogress-bar";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";
import { usePathname } from "next/navigation";

const base = "/expt/info/list";

const List = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  const [loading, setLoading] = useState(false);
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [resultObject, result] = useResultObject();
  const height = useCalculatedHeight(268);
  const router = useRouter();
  const currentPath = usePathname();

  // console.log("resultOBJ", resultObject);
  // console.log("result", result);

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
  // console.log("EXPT INFO LIST DATA", data?.exptInfoList);

  // useEffect(() => {
  //   console.log("RRRRRRRRRRRR");
  //   setLoading(true);
  // }, [result]);

  // const { exptInfoList, pageInfo } = data;
  // const totalElements = pageInfo.totalElements;

  const columns = useMemo(() => Columns(), []);

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={data?.pageInfo?.totalElements}
        result={result}
      />
    ),
    [data?.pageInfo?.totalElements, result],
  );

  const goDetailPage = (row: any) => {
    // const path = row.runUkey;
    const { orderUkey } = row;
    router.push("/order-list/" + orderUkey);
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

  // if (result === "") {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
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
          title={<Title1 titleName="실험정보" />}
          data={data?.exptInfoList}
          columns={columns}
          onRowClicked={goDetailPage}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          fixedHeader={true}
          fixedHeaderScrollHeight={`${height}px`}
          // paginationResetDefaultPage={resetPaginationToggle}
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
    </>
  );
};

export default List;
