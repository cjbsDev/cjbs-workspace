"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { useRouter } from "next-nprogress-bar";
import useSWR from "swr";
import { fetcher } from "api";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import { Box } from "@mui/material";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";

const MngmntList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [resultObject, result] = useResultObject();
  const router = useRouter();

  const url = useMemo(() => {
    const base = "/stock/inout/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  const { inOutDetailList, pageInfo } = data;
  const { totalElements } = pageInfo;

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

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="입출고부" />}
        data={inOutDetailList}
        columns={columns}
        // onRowClicked={goDetailPage}
        // pointerOnHover
        // highlightOnHover
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
      />
    </Box>
  );
};

export default MngmntList;
