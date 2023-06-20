"use client";

import React from "react";
import { DataTableBase } from "cjbsDSTM";
import { TableColumn } from "react-data-table-component";
import { Box, Stack } from "@mui/material";

import useSWR from "swr";
import axios from "axios";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustModifyLogProps {
  slug: string;
  ebcShow: boolean;
}

const CustModifyLog: React.FC<CustModifyLogProps> = ({ slug }) => {
  const { data: custModifyLogTemp, error: custModifyLogError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}/hstr?page=0&size=50`,
    fetcher
  );

  if (!custModifyLogTemp) {
    return <div>Cust Modify log Loading...</div>;
  }

  const custModifyLogList = custModifyLogTemp.data.hstrList;

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
      paginationPerPage={50}
      paginationRowsPerPageOptions={[20, 50, 100]}
      customStyles={dataTableCustomStyles2}
    />
  );
};

export default CustModifyLog;
