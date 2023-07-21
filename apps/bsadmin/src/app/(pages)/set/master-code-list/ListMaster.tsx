"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  OutlinedButton,
} from "cjbsDSTM";
import { Stack, Grid } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListMaster = () => {
  const router = useRouter();

  const goDetailPage = (row: { uniqueCode: string }) => {
    router.push("/set/master-code-list/" + row.uniqueCode);
  };

  const columns = useMemo(
    () => [
      {
        name: "코드 ID",
        selector: (row: { uniqueCode: string }) => row.uniqueCode,
      },
      {
        name: "코드명(국문)",
        selector: (row: { codeNm: string }) => row.codeNm,
      },
      {
        name: "코드명(영문)",
        selector: (row: { codeValue: string }) => row.codeValue,
      },

      {
        name: "상태 코드",
        cell: (row: { isRls: string; uniqueCode: string }) => {
          return (
            row.isRls == "Y" && (
              <OutlinedButton
                buttonName="관리"
                size="small"
                onClick={() => goDetailPage(row)}
              />
            )
          );
        },
      },
    ],
    []
  );
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let tempUrl =
    "http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr/masterCode";
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
            <DataCountResultInfo totalCount={data.data.length} />
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
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTableBase
      title={<Title1 titleName="마스터 코드" />}
      data={data.data}
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

export default ListMaster;
