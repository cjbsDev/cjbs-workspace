"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import NoDataView from "../../../components/NoDataView";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

const ListEstProduct = () => {
  const height = useCalculatedHeight(268);
  const router = useRouter();
  const apiUrl = `/mngr/esPrMng`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });

  const totalElements = data.length;

  console.log("SRVC_CTGR ", data);

  const goModifyPage = useCallback(
    (esPrMngUkey: string) => {
      router.push("/es-pr-modify?esPrMngUkey=" + esPrMngUkey);
    },
    [router],
  );

  const goDetailPage = useCallback((row: { esPrMngUkey: string }) => {
    router.push("/es-pr-list/" + row.esPrMngUkey);
  }, []);

  const columns = useMemo(() => getColumns(goModifyPage), [goModifyPage]);

  const subHeader = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="견적 품명 관리" />}
        data={data}
        columns={columns}
        onRowClicked={goDetailPage}
        highlightOnHover
        pointerOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeader}
        fixedHeader={true}
        fixedHeaderScrollHeight={`${height}px`}
        selectableRows={false}
        noDataComponent={<NoDataView />}
      />
    </Box>
  );
};

export default ListEstProduct;
