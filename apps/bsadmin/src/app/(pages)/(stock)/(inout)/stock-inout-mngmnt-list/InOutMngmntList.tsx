"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { useRouter } from "next-nprogress-bar";
import useSWR from "swr";
import { fetcher } from "api";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { Box, CircularProgress } from "@mui/material";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";
import { usePathname } from "next/navigation";

const base = "/stock/inout/list";

const InOutMngmntList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(100);
  // const [sort, setSort] = useState<string>("stockId,DESC");
  const currentPath = usePathname();
  const [resultObject, result] = useResultObject();
  const router = useRouter();
  const height = useCalculatedHeight(268);

  const url = useMemo(() => {
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data, isLoading } = useSWR(url, fetcher, { keepPreviousData: true });

  // const { inOutDetailList, pageInfo } = data;
  // const { totalElements } = pageInfo;
  console.log("fgfgfg", data);

  const columns = useMemo(
    () => getColumns(data?.pageInfo?.totalElements),
    [data?.pageInfo?.totalElements],
  );

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={data?.pageInfo?.totalElements}
        result={result}
      />
    ),
    [data?.pageInfo?.totalElements, result],
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

  // const handleSort = useCallback(
  //   (selectedColumn: { sortField: any }, sortDirection: string) => {
  //     const sortValue = `${
  //       selectedColumn.sortField
  //     },${sortDirection.toUpperCase()}`;
  //     setSort(sortValue);
  //   },
  //   [],
  // );

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
        title={<Title1 titleName="입출고부" />}
        data={data?.inOutDetailList}
        columns={columns}
        // onRowClicked={goDetailPage}
        // pointerOnHover
        // highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        selectableRows={false}
        pagination
        paginationServer
        paginationTotalRows={data?.pageInfo?.totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        noDataComponent={data ? <NoDataView resetPath={currentPath} /> : null}
        // sortServer
        // onSort={handleSort}
        // defaultSortFieldId={1}
        // defaultSortAsc={false}
        paginationPerPage={100}
        paginationRowsPerPageOptions={[100, 200, 300, 400]}
      />
    </Box>
  );
};

export default InOutMngmntList;
