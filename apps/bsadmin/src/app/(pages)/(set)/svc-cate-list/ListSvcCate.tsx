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
import { usePathname } from "next/navigation";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

const ListSvcCate = () => {
  const height = useCalculatedHeight(268);
  const router = useRouter();
  const currentUrl = usePathname();
  const enumMngrCode = "SRVC_CTGR";
  let apiUrl = `/mngr/list?enumMngrCode=${enumMngrCode}`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });

  console.log(data);

  const totalElements = data.length;

  const goDetailPage = useCallback(() => {
    console.log("tytytytymnbnmbmnnn");

    // router.push("/svc-cate-list/" + topCodeMc + "?midCodeMc=" + midCodeMc);
  }, [router]);

  const handleOnRowClicked = (row) => {
    console.log("CCLCLLCLCLC");
    const { topCodeMc, midCodeMc } = row;
    router.push(`${currentUrl}/${topCodeMc}?midCodeMc=${midCodeMc}`);
  };

  const columns = useMemo(() => getColumns(), []);

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
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        selectableRows={false}
        onRowClicked={handleOnRowClicked}
      />
    </Box>
  );
};

export default ListSvcCate;
