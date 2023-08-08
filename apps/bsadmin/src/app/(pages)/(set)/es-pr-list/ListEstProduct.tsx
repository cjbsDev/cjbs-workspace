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
import { Chip, Stack, Grid, Box, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ListEstProduct = () => {
  const router = useRouter();
  const goModifyPage = (esPrMngUkey: string) => {
    router.push("/es-pr-modify?esPrMngUkey=" + esPrMngUkey);
  };

  const goDetailPage = (row: { esPrMngUkey: string }) => {
    router.push("/es-pr-list/" + row.esPrMngUkey);
  };

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/esPrMng`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });

  console.log("SRVC_CTGR ", data.data);

  const columns = useMemo(
    () => [
      {
        name: "",
        cell: (row: any, index: number) => {
          return index + 1;
        },
        width: "5%",
      },
      {
        name: "분석종류",
        selector: (row: { anlsTypeMcVal: string }) => row.anlsTypeMcVal,
        width: "15%",
      },
      {
        name: "품명",
        selector: (row: { prNm: string }) => row.prNm,
        width: "20%",
      },
      {
        name: "포함 사항",
        selector: (row: { inclInfo: string }) => row.inclInfo,
        width: "50%",
        wrap: true,
        cell: (row: { inclInfo: string }) => (
          <div style={{ whiteSpace: "pre-line" }}>
            {row.inclInfo ? (
              row.inclInfo.split("\n").map((item, index) => (
                <React.Fragment key={index}>
                  {item}
                  <br />
                </React.Fragment>
              ))
            ) : (
              <span>-</span>
            )}
          </div>
        ),
      },
      {
        name: "관리",
        cell: (row: { esPrMngUkey: string }) => {
          return (
            <OutlinedButton
              buttonName="관리"
              size="small"
              onClick={() => goModifyPage(row.esPrMngUkey)}
            />
          );
        },
        width: "10%",
      },
    ],
    []
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
      title={<Title1 titleName="견적 품명 관리" />}
      data={data.data}
      columns={columns}
      onRowClicked={goDetailPage}
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
    />
  );
};

export default ListEstProduct;
