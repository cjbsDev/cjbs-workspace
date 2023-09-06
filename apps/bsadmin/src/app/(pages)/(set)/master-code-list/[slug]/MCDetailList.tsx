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
const LazyMCCodeModifyModal = dynamic(() => import("./MCItemAddModifyModal"), {
  ssr: false,
});

interface MCDetailListProps {
  slug: string;
}

interface DataItem {
  detailUniqueCode: string;
  douzoneCode: string;
  codeNm: string;
  codeValue: string;
  isExpsOrsh: string;
  isRls: string;
}

const MCDetailList: React.FC<MCDetailListProps> = ({ slug }) => {
  // [마스터 코드] 수정 모달
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  const {
    data: msCodeDetailTempData,
    error,
    isLoading,
  } = useSWR(
    `/mngr/masterCode/detail/${slug}`,
    fetcher
    //{ revalidateOnFocus: true }
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }
  if (error) {
    console.log("api err", error);
    return;
  }
  const msCodeDetail = msCodeDetailTempData?.masterCodeDetailList || [];

  const renderList = () => {
    mutate(`/mngr/masterCode/detail/${slug}`);
  };

  // [ 코드 추가 ] 모달 오픈
  const handleAddRow = () => {
    const tempObj = {
      detailUniqueCode: "",
      douzoneCode: "",
      codeNm: "",
      codeValue: "",
      isExpsOrsh: "",
      isRls: "",
    };
    setSelectItem(tempObj);
    setMcCodeModifyModal(true);
  };
  // [ 마스터 코드 ] 모달 오픈
  const mcItemModifyModalOpen = (item: DataItem) => {
    setSelectItem(item);
    setMcCodeModifyModal(true);
  };

  // [ 마스터 코드 ] 모달 닫기
  const mcItemModifyModalClose = () => {
    setMcCodeModifyModal(false);
  };

  return (
    <>
      {/* 마스터 코드 - 코드 관리 컴포넌트 */}
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">
            코드 ( {msCodeDetail.length} 건 )
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right", mb: 1 }}>
          <ContainedButton
            buttonName="코드 추가"
            size="small"
            startIcon={<MyIcon icon="plus" size={16} />}
            onClick={handleAddRow}
          />
        </Grid>
      </Grid>

      <TableContainer component={Box} sx={{ mb: 5 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TH sx={{ width: "5%" }}></TH>
              <TH sx={{ width: "15" }}>상세코드 ID</TH>
              <TH sx={{ width: "22.5%" }}>상세코드명(국문)</TH>
              <TH sx={{ width: "22.5%" }}>상세코드명(영문)</TH>
              <TH sx={{ width: "10%" }}>주문서 노출</TH>
              <TH sx={{ width: "10%" }}>사용여부</TH>
              <TH sx={{ width: "10%" }}>수정</TH>
            </TableRow>
          </TableHead>

          <TableBody>
            {msCodeDetail.length === 0 ? (
              <TableRow>
                <TD colSpan={7}>
                  <Box sx={{ textAlign: "center" }}>
                    등록된 코드가 없습니다.
                  </Box>
                </TD>
              </TableRow>
            ) : (
              msCodeDetail.map((dataItem: DataItem, index: number) => (
                <TableRow key={dataItem.detailUniqueCode}>
                  <TD>{index + 1}</TD>
                  <TD>{dataItem.douzoneCode}</TD>
                  <TD>{dataItem.codeNm}</TD>
                  <TD>{dataItem.codeValue}</TD>
                  <TD>{dataItem.isExpsOrsh}</TD>
                  <TD>{dataItem.isRls}</TD>
                  <TD>
                    <OutlinedButton
                      buttonName="수정"
                      size="small"
                      onClick={() => mcItemModifyModalOpen(dataItem)}
                    />
                  </TD>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 코드 수정 모달  */}
      {selectItem && (
        <LazyMCCodeModifyModal
          onClose={mcItemModifyModalClose}
          open={mcCodeModifyModal}
          modalWidth={800}
          selectItem={selectItem}
          uniqueCode={slug}
          renderList={renderList}
        />
      )}
    </>
  );
};

export default MCDetailList;
