"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import { Box } from "@mui/material";

const ListMaster = () => {
  const router = useRouter();
  let tempUrl = `/mngr/masterCode`;
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });
  const totalElements = data.length;

  // const goDetailPage = useCallback(
  //   (uniqueCode: string) => {
  //     return router.push("/master-code-list/" + uniqueCode);
  //   },
  //   [router],
  // );

  const handleOnRowClicked = (row) => {
    console.log("@#@#$@#@#@@#", row);
    const { uniqueCode } = row;
    router.push("/master-code-list/" + uniqueCode);
  };

  const columns = useMemo(() => getColumns(), []);

  const subHeader = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        title={<Title1 titleName="마스터 코드" />}
        data={data}
        columns={columns}
        onRowClicked={handleOnRowClicked}
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeader}
        selectableRows={false}
        pagination={false}
      />
    </Box>
  );
};

export default ListMaster;
