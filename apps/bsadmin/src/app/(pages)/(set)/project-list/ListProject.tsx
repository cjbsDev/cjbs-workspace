"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";

const ListProject = () => {
  const router = useRouter();
  const tempUrl = `/mngr/prjc/list`;
  const { data } = useSWR(tempUrl, fetcher, {
    suspense: true,
  });

  const totalElements = data.prjcListResDetailList.length;

  const goDetailPage = useCallback(
    (prjcUkey: string) => {
      router.push("/project-list/" + prjcUkey);
    },
    [router],
  );

  const columns = useMemo(() => getColumns(goDetailPage), [goDetailPage]);

  const subHeader = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <DataTableBase
      title={<Title1 titleName="과제 관리" />}
      data={data.prjcListResDetailList}
      columns={columns}
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeader}
      selectableRows={false}
    />
  );
};

export default ListProject;
