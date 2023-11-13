"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  OutlinedButton,
  ContainedButton,
} from "cjbsDSTM";
import { Stack, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import Link from "next/link";
import { fetcher } from "api";

const ListProject = () => {
  const router = useRouter();

  const goDetailPage = useCallback(
    (prjcUkey: string) => {
      router.push("/project-list/" + prjcUkey);
    },
    [router]
  );

  /*
  {
    "prjcUniqueCode": "BS_0100002003",
    "douzone": "0R22-0LN01-RD",
    "prjcUkey": "063103",
    "prjcNm": "항암 후보 개발(CJRB-101)",
    "prjcMngrId": 12,
    "prjcMngrNm": "NGS anal three",
    "departCodeMc": "BS_0100003011",
    "departCodeMcVal": "NGS분석팀",
    "isPrjcDetailUse": "N",
    "prjcDetailCnt": 0
  },
  */
  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { prjcUkey: string }) => row.prjcUkey,
      },
      {
        name: "과제명",
        selector: (row: { prjcNm: string }) => row.prjcNm,
      },
      {
        name: "과제 담당자",
        selector: (row: { prjcMngrNm: string }) => row.prjcMngrNm,
      },
      {
        name: "수행부서",
        selector: (row: { departCodeMcVal: string }) => row.departCodeMcVal,
      },
      {
        name: "사용중인 세부연구",
        selector: (row: { prjcDetailCnt: string }) => row.prjcDetailCnt,
      },
      {
        name: "관리",
        cell: (row: { prjcUkey: string }) => {
          return (
            <OutlinedButton
              buttonName="관리"
              size="small"
              onClick={() => goDetailPage(row.prjcUkey)}
            />
          );
        },
      },
    ],
    [goDetailPage]
  );
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let tempUrl = `/mngr/prjc/list`;
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

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
            <DataCountResultInfo
              totalCount={data.prjcListResDetailList.length}
            />
            <Link href="/project-add">
              <ContainedButton buttonName="과제 등록" size="small" />{" "}
            </Link>
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
  }, [filterText, resetPaginationToggle, data.prjcListResDetailList.length]);

  return (
    <DataTableBase
      title={<Title1 titleName="과제 관리" />}
      data={data.prjcListResDetailList}
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

export default ListProject;
