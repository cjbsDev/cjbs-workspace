"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import {
  DataCountResultInfo,
  DataTableBase,
  Title1,
  ContainedButton,
} from "cjbsDSTM";
import { Stack, Grid, Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";

const ListSvcCate = () => {
  const router = useRouter();
  const enumMngrCode = "SRVC_CTGR";
  let apiUrl = `/mngr/list?enumMngrCode=${enumMngrCode}`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });

  const totalElements = data.length;

  const goDetailPage = useCallback(
    (topCodeMc: string, midCodeMc: string) => {
      router.push("/svc-cate-list/" + topCodeMc + "?midCodeMc=" + midCodeMc);
    },
    [router],
  );

  const columns = useMemo(() => getColumns(goDetailPage), [goDetailPage]);

  const subHeader = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="서비스 분류 관리" />}
        data={data}
        columns={columns}
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeader}
        selectableRows={false}
      />
    </Box>
  );
};

export default ListSvcCate;
