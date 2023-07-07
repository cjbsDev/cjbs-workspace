"use client";

import React, { useMemo, useState, useEffect } from "react";
import { DataTableBase } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataComponent from "./component/NoDataComponent";
import { useLogList } from "./useLogList";

interface LogProps {
  uKey: string;
  apiName: string;
  ebcShow?: boolean;
}

const LogTable = (props: LogProps) => {
  const { uKey, apiName, ebcShow } = props;
  const { logData } = useLogList(apiName, uKey);

  const custModifyLogList = logData.data.updateLogList;

  const columns = [
    {
      name: "변경일",
      selector: (row: { modifiedAt: any }) => row.modifiedAt,
      width: "20%",
    },
    {
      name: "변경자",
      cell: (row: { updatedByNm: any; updatedByEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={0.4}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.updatedByNm}</Box>
            <Box>( {row.updatedByEmail} )</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
      width: "20%",
    },

    {
      name: "컬럼",
      selector: (row: { targetColNm: any }) => row.targetColNm,
      width: "20%",
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
      width: "20%",
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
      width: "20%",
    },
  ];

  return (
    <DataTableBase
      data={custModifyLogList}
      columns={columns}
      selectableRows={false}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
      customStyles={dataTableCustomStyles2}
      noDataComponent={<NoDataComponent />}
    />
  );
};

export default LogTable;
