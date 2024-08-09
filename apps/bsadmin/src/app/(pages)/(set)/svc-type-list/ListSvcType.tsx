"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import useCalculatedHeight from "../../../hooks/useCalculatedHeight";

const ListSvcType = () => {
  const height = useCalculatedHeight(268);
  const router = useRouter();
  const enumMngrCode = "SRVC_TYPE";
  let apiUrl = `/mngr/list?enumMngrCode=${enumMngrCode}`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  console.log("SRVC_TYPE ", data);

  const totalElements = data.length;

  const goDetailPage = useCallback(
    (topCodeMc: string) => {
      return router.push("/svc-type-list/" + topCodeMc);
    },
    [router],
  );

  const columns = useMemo(() => getColumns(goDetailPage), [goDetailPage]);

  const subHeaderComponent = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <DataTableBase
      title={<Title1 titleName="서비스 타입 관리" />}
      data={data}
      columns={columns}
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponent}
      fixedHeader={true}
      fixedHeaderScrollHeight={`${height}px`}
      selectableRows={false}
    />
  );
};

export default ListSvcType;
