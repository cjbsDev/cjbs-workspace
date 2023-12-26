"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import SubHeader from "./SubHeader";
import { getColumns } from "./Columns";

const ListMachine = () => {
  const router = useRouter();
  const enumMngrCode = "MCHN_KIT";
  let apiUrl = `/mngr/list?enumMngrCode=${enumMngrCode}`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  //console.log("MCHN_KIT ", data);
  const totalElements = data.length;

  const goDetailPage = useCallback(
    (topCodeMc: string, midCodeMc: string) => {
      router.push("/machine-kit-list/" + topCodeMc + "?midCodeMc=" + midCodeMc);
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
        title={<Title1 titleName="장비 Kit 분류 관리" />}
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

export default ListMachine;
