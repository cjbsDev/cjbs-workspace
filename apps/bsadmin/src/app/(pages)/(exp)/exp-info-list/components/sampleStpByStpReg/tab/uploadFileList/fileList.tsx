import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../../components/NoDataView";
import { Columns } from "./columns";
import DataTable from "./dataTable";
import { Box } from "@mui/material";

const FileList = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const { data } = useSWR(
    `/expt/info/file/list?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log(">>>>>>>>>>>>", data);

  const { exptInfoDetailList } = data;
  const { totalElements } = data.pageInfo;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setPage(page);
    setSize(newPerPage);
  };

  return (
    <Box sx={{ display: "grid" }}>
      <DataTable
        listData={exptInfoDetailList}
        totalElements={totalElements}
        handlePageChange={handlePageChange}
        handlePerRowsChange={handlePerRowsChange}
      />
    </Box>
  );
};

export default FileList;
