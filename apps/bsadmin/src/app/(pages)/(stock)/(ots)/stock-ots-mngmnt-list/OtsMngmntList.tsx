"use client";
import React, { useCallback, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "api";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { Box } from "@mui/material";
import { getColumns } from "./Columns";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../components/NoDataView";
import SubHeader from "./SubHeader";
import { useRouter } from "next-nprogress-bar";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";

const OtsMngmntList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [resultObject, result] = useResultObject();
  const router = useRouter();
  const height = useCalculatedHeight(268);
  const { mutate } = useSWRConfig();

  const url = useMemo(() => {
    const base = "/ots/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}`
        : `?page=${page}&size=${size}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  const { otsList, pageInfo } = data;
  const { totalElements } = pageInfo;

  console.log("Ots Data List ==>>", otsList);

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

  const goDetailPage = useCallback((row: any) => {
    const { otsUkey } = row;
    router.push(`/stock-ots-mngmnt-list/${otsUkey}`);
  }, []);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="아웃소싱 관리" />}
        data={otsList}
        columns={columns}
        onRowClicked={goDetailPage}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
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

export default OtsMngmntList;
