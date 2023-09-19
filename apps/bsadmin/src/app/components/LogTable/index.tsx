"use client";

import React from "react";
import { DataTableBase } from "cjbsDSTM";
import { Typography, Box, Stack } from "@mui/material";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../NoDataView";
import { useLogList } from "./useLogList";
import { mngrLogList } from "./mngrLogList";
import { topMidTypeLogList } from "./topMidTypeLogList";

interface LogProps {
  uKey: string;
  apiName: string;
  logTitle: string;
  ebcShow?: boolean;
  subUkey?: string;
  type?: string;
}

// topCodeMc: string, -> uKey
// midCodeMc: string, -> subUkey
// enumMngrCode: string -> apiName

interface LogDataProps {
  logData: {
    updateLogList: any;
  };
}

interface LogUpdateTitleProps {
  logTitle: string;
}
const LogUpdateTitle = ({ logTitle }: LogUpdateTitleProps) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mt: 5 }}>
        {logTitle} 수정 로그
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {logTitle} 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난 로그는
        자동으로 삭제됩니다.
      </Typography>
    </>
  );
};

const LogTable = (props: LogProps) => {
  // 비구조화 할당
  const { uKey, apiName, logTitle, ebcShow, type, subUkey } = props;

  let logDataProps;

  if (type === "mngr") {
    logDataProps = mngrLogList(apiName, uKey);
  } else if (type === "topMid") {
    // topCodeMc: string, -> uKey
    // midCodeMc: string, -> subUkey
    // enumMngrCode: string -> apiName
    logDataProps = topMidTypeLogList(uKey, apiName, subUkey);
  } else {
    logDataProps = useLogList(apiName, uKey);
  }
  const { logData }: LogDataProps = logDataProps;
  // const { logData }: LogDataProps = useLogList(apiName, uKey);

  const modifyLogList = logData.updateLogList;

  const columns = [
    {
      name: "변경일",
      selector: (row: { modifiedAt: any }) => row.modifiedAt,
      // maxWidth: "250px",
      width: "15%",
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
      width: "15%",
      // minWidth: "150px",
      // maxWidth: "300px",
    },

    {
      name: "컬럼",
      selector: (row: { targetColVal: any }) => row.targetColVal,
      width: "10%",
      // maxWidth: "250px",
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
      width: "30%",
      // maxWidth: "300px",
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
      width: "30%",
      // maxWidth: "300px",
    },
  ];

  return (
    <>
      <LogUpdateTitle logTitle={logTitle} />
      <DataTableBase
        data={modifyLogList}
        columns={columns}
        selectableRows={false}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 20]}
        customStyles={dataTableCustomStyles2}
        noDataComponent={<NoDataView />}
      />
    </>
  );
};

export default LogTable;
