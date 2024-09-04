"use client";

import React, { useState, useEffect } from "react";
import {
  TH,
  TD,
  OutlinedButton,
  ContainedButton,
  Title1,
  ErrorContainer,
  Fallback,
  InputValidation,
  Form,
} from "cjbsDSTM";
import useSWR, { mutate } from "swr";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
} from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";
import { fetcher } from "api";
import { useParams } from "next/navigation";

const LazyDataTable = dynamic(() => import("./MCDetailDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={400} />,
});

// const LazyMCCodeModifyModal = dynamic(() => import("./MCItemAddModifyModal"), {
//   ssr: false,
// });
//
// interface MCDetailListProps {
//   slug: string;
// }

interface DataItem {
  detailUniqueCode: string;
  douzoneCode: string;
  codeNm: string;
  codeValue: string;
  isExpsOrsh: string;
  isRls: string;
}

const MCDetailList = () => {
  const params = useParams();
  const { slug } = params;
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  // const { data: msCodeDetailTempData } = useSWR(
  //   `/mngr/masterCode/detail/${slug}`,
  //   fetcher,
  //   {
  //     suspense: true,
  //   },
  // );

  // const msCodeDetail = msCodeDetailTempData?.masterCodeDetailList || [];
  //
  // console.log("hhhhh", msCodeDetailTempData);

  // const renderList = () => {
  //   mutate(`/mngr/masterCode/detail/${slug}`);
  // };

  // [ 코드 추가 ] 모달 오픈
  // const handleAddRow = () => {
  //   const tempObj = {
  //     detailUniqueCode: "",
  //     douzoneCode: "",
  //     codeNm: "",
  //     codeValue: "",
  //     isExpsOrsh: "",
  //     isRls: "",
  //   };
  //   setSelectItem(tempObj);
  //   setMcCodeModifyModal(true);
  // };
  // // [ 마스터 코드 ] 모달 오픈
  // const mcItemModifyModalOpen = (item: DataItem) => {
  //   console.log("SSSSSSSSS", item);
  //
  //   setSelectItem(item);
  //   setMcCodeModifyModal(true);
  // };
  //
  // // [ 마스터 코드 ] 모달 닫기
  // const mcItemModifyModalClose = () => {
  //   setMcCodeModifyModal(false);
  // };

  return (
    <>
      {/* 마스터 코드 - 코드 관리 컴포넌트 */}
      {/*<Grid container>*/}
      {/*  <Grid item xs={7} sx={{ display: "flex" }}>*/}
      {/*    <Typography variant="subtitle1">*/}
      {/*      코드 ( {msCodeDetail.length} 건 )*/}
      {/*    </Typography>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={5} sx={{ pt: 0, textAlign: "right", mb: 1 }}>*/}
      {/*    <ContainedButton*/}
      {/*      buttonName="코드 추가"*/}
      {/*      size="small"*/}
      {/*      startIcon={<MyIcon icon="plus" size={16} />}*/}
      {/*      onClick={handleAddRow}*/}
      {/*    />*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyDataTable />
      </ErrorContainer>

      {/*/!* 코드 수정 모달  *!/*/}
      {/*{selectItem && (*/}
      {/*  <LazyMCCodeModifyModal*/}
      {/*    onClose={mcItemModifyModalClose}*/}
      {/*    open={mcCodeModifyModal}*/}
      {/*    modalWidth={800}*/}
      {/*    selectItem={selectItem}*/}
      {/*    uniqueCode={slug}*/}
      {/*    renderList={renderList}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};

export default MCDetailList;
