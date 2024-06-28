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

const ListProject = () => {
  const router = useRouter();
  const tempUrl = `/mngr/prjt/list`;
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  console.log("Project list data ==>>", data);

  const { prjtListResDetailList, pageInfo } = data;
  const { totalElements } = pageInfo;

  const goDetailPage = useCallback(
    (prjtUkey: string) => {
      router.push("/project-list/" + prjtUkey);
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
        title={<Title1 titleName="과제 관리" />}
        data={prjtListResDetailList}
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

export default ListProject;
