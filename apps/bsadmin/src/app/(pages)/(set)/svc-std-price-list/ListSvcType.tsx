"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  Title1,
  OutlinedButton,
  ContainedButton,
} from "cjbsDSTM";

import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { Stack, Grid, Box, Container } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LazySvcStdPrice = () => {
  const router = useRouter();

  const goDetailPage = (srvcType: string, anlsType: string) => {
    router.push("/mngr/stndPrice/srvcType/" + srvcType + "/" + anlsType);
  };

  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice/list`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  console.log("stndPrice ", data.data);

  /*{ 
    "stndPriceMpngUkey": "447397",
    "stndTypeCode": "2011403",
    "srvcTypeMc": "BS_0100005002",
    "srvcTypeMcVal": "License",
    "anlsTypeMc": "BS_0100006001",
    "anlsTypeMcVal": "CG​",
    "anlsMtMc": "BS_0100008014",
    "anlsMtMcVal": "GRIIS Composition Pacbio  Sequel 16S",
    "prdcSizeMc": "BS_0100010003",
    "prdcSizeMcVal": "5G",
    "stndPriceDetailCnt": 4
  },*/

  const columns = useMemo(
    () => [
      {
        name: "서비스 분류 코드",
        selector: (row: { stndTypeCode: string }) => row.stndTypeCode,
        width: "10%",
      },
      {
        name: "분류",
        selector: (row: { srvcTypeMcVal: string }) => row.srvcTypeMcVal,
        width: "15%",
      },
      {
        name: "분석종류",
        selector: (row: { anlsTypeMcVal: string }) => row.anlsTypeMcVal,
        width: "10%",
      },
      {
        name: "플랫폼",
        selector: (row: { anlsMtMcVal: string }) => row.anlsMtMcVal,
        width: "25%",
      },
      {
        name: "생산량",
        selector: (row: { prdcSizeMcVal: string }) => row.prdcSizeMcVal,
        width: "10%",
      },
      {
        name: "세부 기준가 개수",
        selector: (row: { stndPriceDetailCnt: string }) =>
          row.stndPriceDetailCnt,
        width: "10%",
      },

      {
        name: "관리",
        cell: (row: { srvcTypeMc: string; anlsTypeMc: string }) => {
          return (
            <OutlinedButton
              buttonName="관리"
              size="small"
              onClick={() => goDetailPage(row.srvcTypeMc, row.anlsTypeMc)}
            />
          );
        },
        width: "10%",
      },
    ],
    []
  );

  const defaultValues = {};

  const methods = useForm({
    defaultValues, // Pass the default values when calling useForm
  });

  const {
    getValues,
    formState: { errors, isDirty },
    handleSubmit,
  } = methods;

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
  };

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
            <Link href="/svc-std-price-add">
              <ContainedButton buttonName="기준가 등록" size="small" />{" "}
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
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTableBase
      title={<Title1 titleName="서비스 기준가 관리" />}
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

export default LazySvcStdPrice;
