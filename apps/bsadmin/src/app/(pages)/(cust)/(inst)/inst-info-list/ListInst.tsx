"use client";

import React, { useMemo } from "react";
import useSWR from "swr";
import { DataTableBase, Title1 } from "cjbsDSTM";
import { Box, Stack, useTheme } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { fetcher } from "api";
import { formatBusinessRegNo } from "cjbsDSTM/commonFunc";
import NoDataView from "../../../../components/NoDataView";
import SubHeader from "./SubHeader";
import { useResultObject } from "../../../../components/KeywordSearch/useResultObject";
import { getColumns } from "./Columns";

interface InstData {
  instId?: any;
  brno?: number;
  ftr?: string;
  instNm?: string;
  instUkey?: string;
  region1Gc?: any;
  region2Gc?: any;
  rprsNm?: string;
  instTypeCc?: any;
  lctnTypeCc?: any;
  statusCodeCc?: any;
  instTypeCcNm?: any;
  lctnTypeCcNm?: any;
  statusCodeCcNm?: any;
  region1GcNm?: any;
  region2GcNm?: any;
}

const ListInst = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const [sort, setSort] = useState<string>("createdAt,DESC");
  const [hideDirector, setHideDirector] = useState<boolean>(true);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [resultObject, result] = useResultObject();

  const url = useMemo(() => {
    const base = "/inst/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=${page}&size=${size}&sort=${sort}`
        : `?page=${page}&size=${size}&sort=${sort}`;
    return `${base}${params}`;
  }, [resultObject, result, page, size, sort]);

  const { data } = useSWR(url, fetcher, { suspense: true });

  // console.log(data);
  const { instList, pageInfo } = data;
  const { totalElements } = pageInfo;

  // const columns = useMemo(
  //   () => [
  //     {
  //       name: "No",
  //       selector: (row: { instId: string }) => row.instId,
  //       center: true,
  //       width: "50px",
  //     },
  //     {
  //       name: "위치",
  //       center: true,
  //       selector: (row: { lctnTypeVal: string }) => row.lctnTypeVal,
  //       width: "80px",
  //     },
  //     {
  //       name: "기관명",
  //       selector: (row: { instNm: string }) => row.instNm,
  //     },
  //     {
  //       name: "사업자 등록번호",
  //       width: "150px",
  //       right: true,
  //       selector: (row: { brno: string }) => formatBusinessRegNo(row.brno),
  //     },
  //     {
  //       name: "대표자",
  //       center: true,
  //       selector: (row: { rprsNm: string }) => row.rprsNm,
  //     },
  //     {
  //       name: "지역(나라)",
  //       cell: (row: { region1Val: any; region2Val: any }) => (
  //         <Stack
  //           direction="row"
  //           spacing={0.5}
  //           alignItems="center"
  //           // useFlexGap
  //           // flexWrap="wrap"
  //         >
  //           <Box data-tag="allowRowEvents">
  //             {row.region1Val ?? ""} {row.region2Val ?? ""}{" "}
  //           </Box>
  //         </Stack>
  //       ),
  //       minWidth: "150px",
  //     },
  //
  //     {
  //       name: "분류",
  //       center: true,
  //       selector: (row: { instTypeVal: string }) => row.instTypeVal,
  //       width: "80px",
  //     },
  //     {
  //       name: "특성",
  //       selector: (row: { ftr: string }) => row.ftr,
  //     },
  //     {
  //       name: "상태",
  //       center: true,
  //       selector: (row: { statusCodeVal: string }) => row.statusCodeVal,
  //       width: "80px",
  //     },
  //   ],
  //   [],
  // );

  const columns = useMemo(
    () => getColumns(hideDirector, totalElements),
    [hideDirector, totalElements],
  );

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={totalElements} result={result} />,
    [totalElements, result],
  );

  // const subHeaderComponentMemo = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };
  //
  //   return (
  //     <Grid container>
  //       <Grid item xs={6} sx={{ pt: 0 }}>
  //         <Stack direction="row" spacing={2} alignItems="center">
  //           <DataCountResultInfo totalCount={data.pageInfo.totalElements} />
  //           <ContainedButton
  //             buttonName="기관 정보 등록"
  //             size="small"
  //             onClick={() => router.push("/inst-info-add")}
  //           />
  //         </Stack>
  //       </Grid>
  //       <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
  //         <Stack
  //           direction="row"
  //           spacing={1}
  //           sx={{ mb: 1.5 }}
  //           alignItems="center"
  //         >
  //           <DataTableFilter
  //             onFilter={(e: {
  //               target: { value: React.SetStateAction<string> };
  //             }) => setFilterText(e.target.value)}
  //             onClear={handleClear}
  //             filterText={filterText}
  //           />
  //         </Stack>
  //       </Grid>
  //     </Grid>
  //   );
  // }, [filterText, resetPaginationToggle, data.pageInfo.totalElements, router]);

  const goDetailPage = (row: { instUkey: string }) => {
    const path = row.instUkey;
    router.push("/inst-info-list/" + path);
  };

  return (
    <DataTableBase
      title={<Title1 titleName="기관 관리" />}
      data={instList}
      columns={columns}
      onRowClicked={goDetailPage}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      paginationResetDefaultPage={resetPaginationToggle}
      selectableRows={false}
      noDataComponent={<NoDataView />}
    />
  );
};

export default ListInst;
