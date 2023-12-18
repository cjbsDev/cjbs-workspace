"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  OutlinedButton,
} from "cjbsDSTM";
import { Chip, Stack, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

import { fetcher } from "api";

const ListSvcType = () => {
  const router = useRouter();

  const goDetailPage = useCallback(
    (topCodeMc: string) => {
      router.push("/svc-type-list/" + topCodeMc);
    },
    [router],
  );

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const enumMngrCode = "SRVC_TYPE";
  let apiUrl = `/mngr/list?enumMngrCode=${enumMngrCode}`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  console.log("SRVC_TYPE ", data);

  const columns = useMemo(
    () => [
      {
        name: "No",
        center: true,
        cell: (row: any, index: number) => {
          return index + 1;
        },
        width: "80px",
      },
      {
        name: "서비스 타입",
        selector: (row: { topValue: string }) => row.topValue,
      },
      {
        name: "분석 단계",
        cell: (row: { btmValueList: any }) => {
          return row.btmValueList.length > 0
            ? row.btmValueList.map((item: any) => (
                <Chip
                  key={item.btmCodeMc}
                  label={item.btmCodeVal}
                  size="small"
                  sx={{
                    border: "1px solid #ADB5BD",
                    backgroundColor: "#FFFFFF",
                    color: "#000000",
                    mr: "8px",
                  }}
                />
              ))
            : "등록된 분석 단계가 없습니다.";
        },
      },
      {
        name: "관리",
        cell: (row: { topCodeMc: string }) => {
          return (
            <OutlinedButton
              buttonName="관리"
              size="small"
              onClick={() => goDetailPage(row.topCodeMc)}
            />
          );
        },
        width: "80px",
        center: true,
        button: true,
      },
    ],
    [goDetailPage],
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={data.length} />
          </Stack>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, data.length]);

  return (
    <DataTableBase
      title={<Title1 titleName="서비스 타입 관리" />}
      data={data}
      columns={columns}
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
    />
  );
};

export default ListSvcType;
