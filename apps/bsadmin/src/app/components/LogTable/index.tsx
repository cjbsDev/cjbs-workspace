"use client";

import React from "react";
import { DataTableBase } from "cjbsDSTM";
import { Typography, Box, Stack } from "@mui/material";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../NoDataView";
import { useUnifiedLogList } from "./useUnifiedLogList";
import { useParams } from "next/navigation"; // 새로운 hook을 import

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
      width: "180px",
      right: true,
    },
    {
      name: "변경자",
      width: "220px",
      center: true,
      cell: (row: { updatedByNm: any; updatedByEmail: any }) => (
        <>
          <Stack
            // direction="row"
            // spacing={0.4}
            // alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.updatedByNm}</Box>
            <Box>({row.updatedByEmail})</Box>
          </Stack>
        </>
      ),
    },
    {
      name: "컬럼",
      width: "180px",
      center: true,
      selector: (row: { targetColVal: any }) => row.targetColVal,
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
    },
  ];

  return (
    <Box sx={{ display: "grid" }}>
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
    </Box>
  );
};

const LogDataComponent: React.FC<LogDataComponentProps> = ({
  type,
  apiName,
  // uKey,
  subUkey,
  logTitle,
}) => {
  const params = useParams();
  const { slug } = params;
  const logDataProps = useUnifiedLogList(type, apiName, slug, subUkey);

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
        // uKey={uKey}
        subUkey={subUkey}
        logTitle={logTitle}
      />
    </>
  );
};

export default LogTable;
