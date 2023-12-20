"use client";

import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { useForm } from "react-hook-form";
import { useRouter } from "next-nprogress-bar";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";

const LazySvcStdPrice = () => {
  const router = useRouter();
  const apiUrl = `/mngr/stndPrice/list`;
  const { data } = useSWR(apiUrl, fetcher, {
    suspense: true,
  });
  console.log("stndPrice ", data);
  const totalElements = data.length;

  const defaultValues = {};

  const goDetailPage = useCallback(
    (stndPriceMpngUkey: string) => {
      router.push("/svc-std-price-list/" + stndPriceMpngUkey);
    },
    [router],
  );

  const columns = useMemo(() => getColumns(goDetailPage), [goDetailPage]);

  const methods = useForm({
    defaultValues, // Pass the default values when calling useForm
  });

  const {
    formState: { errors, isDirty },
  } = methods;

  const subHeader = useMemo(() => {
    return <SubHeader totalElements={totalElements} />;
  }, [totalElements]);

  return (
    <DataTableBase
      title={<Title1 titleName="서비스 기준가 관리" />}
      data={data}
      columns={columns}
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeader}
      selectableRows={false}
    />
  );
};

export default LazySvcStdPrice;
