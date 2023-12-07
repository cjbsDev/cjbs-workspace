"use client";

import React from "react";
import { DataTableBase } from "cjbsDSTM";
import { Typography, Box, Stack } from "@mui/material";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../NoDataView";
import { useUnifiedLogList } from "./useUnifiedLogList"; // 새로운 hook을 import

interface LogProps {
  uKey: string;
  apiName: string;
  logTitle: string;
  ebcShow?: boolean;
  subUkey?: string;
  type?: string;
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

interface LogDisplayComponentProps {
  logData: {
    updateLogList: any;
  };
  logTitle: string;
}

interface LogDataComponentProps {
  type: string;
  apiName: string;
  uKey: string;
  subUkey?: string;
  logTitle: string;
}

const LogDisplayComponent: React.FC<LogDisplayComponentProps> = ({
  logData,
  logTitle,
}) => {
  const modifyLogList = logData.updateLogList;

  const columns = [
    {
      name: "변경일",
      selector: (row: { modifiedAt: any }) => row.modifiedAt,
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
    },
    {
      name: "컬럼",
      selector: (row: { targetColVal: any }) => row.targetColVal,
      width: "10%",
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
      width: "30%",
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
      width: "30%",
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

const LogDataComponent: React.FC<LogDataComponentProps> = ({
  type,
  apiName,
  uKey,
  subUkey,
  logTitle,
}) => {
  const logDataProps = useUnifiedLogList(type, apiName, uKey, subUkey);

  return (
    <LogDisplayComponent logData={logDataProps.logData} logTitle={logTitle} />
  );
};

const LogTable = (props: LogProps) => {
  const { uKey, apiName, logTitle, ebcShow, type, subUkey } = props;

  return (
    <>
      <LogDataComponent
        type={type}
        apiName={apiName}
        uKey={uKey}
        subUkey={subUkey}
        logTitle={logTitle}
      />
    </>
  );
};

export default LogTable;
