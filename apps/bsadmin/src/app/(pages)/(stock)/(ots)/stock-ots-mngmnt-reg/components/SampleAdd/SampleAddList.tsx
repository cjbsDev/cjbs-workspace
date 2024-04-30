"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import useSWR, { mutate } from "swr";
import { fetcher, GET } from "api";
import {
  cjbsTheme,
  DataTableBase,
  ErrorContainer,
  Fallback,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../components/NoDataView";
import { Box, Stack, Typography } from "@mui/material";
import SubHeader from "./SubHeader";
import { useRecoilState } from "recoil";
import { sampleAddAtom } from "./sampleAddAtom";
import useCenteredPopup from "../../../../../../hooks/useNewCenteredPopup";
import dynamic from "next/dynamic";

const LazyReinaDataTable = dynamic(() => import("./ReinaDataTable"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const SampleAddList = ({ openPopup }) => {
  const { getValues, setValue, watch } = useFormContext();
  const [smpAdd, setSmpAdd] = useRecoilState(sampleAddAtom);

  const sampleUkeyList = watch("sampleUkeyList");
  console.log("TYTYTYTYTY", sampleUkeyList);

  if (sampleUkeyList === undefined) {
    return (
      <Stack
        sx={{ backgroundColor: cjbsTheme.palette.grey["200"], py: 5, mb: 1 }}
        spacing={0.5}
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>버튼을 클릭하면 샘플을 추가 할 수 있습니다.</Typography>
        <OutlinedButton
          buttonName="샘플 추가"
          size="small"
          onClick={openPopup}
        />
      </Stack>
    );
  }

  // const { data } = useSWR(
  //   sampleUkeyList !== undefined
  //     ? `/ots/sample/detail?sampleUkeyList=${sampleUkeyList.toString()}`
  //     : null,
  //   fetcher,
  //   {
  //     suspense: true,
  //   },
  // );
  //
  // console.log("1111111", data);
  // //
  // // console.log("????????????", sampleUkeyList);
  //
  // const { sampleList, orderInfo, sampleInfo } = data;

  // setValue("orderInfo", orderInfo);
  // setValue("sampleInfo", sampleInfo);
  //
  // console.log("^&^^&^&^&^&^ ==>>", sampleList);

  // const columns = useMemo(
  //   () => [
  //     {
  //       name: "샘플 번호",
  //       center: true,
  //       allowOverflow: true,
  //       // width: "80px",
  //       // sortable: true,
  //       selector: (row) => row.sampleId,
  //     },
  //     {
  //       name: "샘플명",
  //       center: true,
  //       allowOverflow: true,
  //       selector: (row) => row.sampleNm,
  //     },
  //     {
  //       name: "샘플종류",
  //       center: true,
  //       allowOverflow: true,
  //       // width: "80px",
  //       // sortable: true,
  //       selector: (row) => row.sampleTypeVal,
  //     },
  //     {
  //       name: "Source",
  //       allowOverflow: true,
  //       center: true,
  //       selector: (row) => row.source,
  //     },
  //     {
  //       name: "Depth(GB)",
  //       center: true,
  //       selector: (row) => row.depthVal,
  //     },
  //     {
  //       name: "Taxon",
  //       center: true,
  //       allowOverflow: true,
  //       selector: (row) => row.taxonVal,
  //     },
  //     {
  //       name: "오더 번호",
  //       center: true,
  //       selector: (row) => row.orderId,
  //     },
  //     {
  //       name: "서비스 타입",
  //       center: true,
  //       selector: (row) => row.srvcTypeVal,
  //     },
  //   ],
  //   [],
  // );

  const handleSelectedRowChange = ({ selectedRows }) => {
    console.log("EERERERERERE", selectedRows);
    const filteredSampleUkeyList = selectedRows.map((item) => item.sampleUkey);
    console.log("filteredSampleUkeyList ==>>", filteredSampleUkeyList);
    setSmpAdd(filteredSampleUkeyList);
    setValue("sampleUkeyList", filteredSampleUkeyList);
  };

  // const getData = async () => {
  //   const res = await GET(`/ots/sample/detail?sampleUkeyList=${smpAdd}`);
  // };

  // if (smpAdd.length === 0) {
  //   return <Typography>No datatat</Typography>;
  // }

  // console.log(smpAdd.length);
  //

  // const subHeaderComponentMemo = useMemo(
  //   () => <SubHeader totalElements={sampleList.length} />,
  //   [sampleList],
  // );

  return (
    <Box sx={{ display: "grid", mb: 1.5 }}>
      {JSON.stringify(sampleUkeyList)}

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyReinaDataTable openPopup={openPopup} />
      </ErrorContainer>

      {/*<DataTableBase*/}
      {/*  data={sampleList}*/}
      {/*  columns={columns}*/}
      {/*  customStyles={dataTableCustomStyles3}*/}
      {/*  subHeader*/}
      {/*  subHeaderComponent={subHeaderComponentMemo}*/}
      {/*  selectableRows*/}
      {/*  // selectableRowSelected={rowSelectCritera}*/}
      {/*  // selectableRowDisabled={rowSelectCritera}*/}
      {/*  onSelectedRowsChange={handleSelectedRowChange}*/}
      {/*  // clearSelectedRows={toggledClearRows}*/}
      {/*  pagination={false}*/}
      {/*  noDataComponent={<NoDataView />}*/}
      {/*/>*/}
    </Box>
  );
};

export default SampleAddList;
