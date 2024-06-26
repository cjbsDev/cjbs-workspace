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
  SelectBox,
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

interface StndPriceDetailListProps {
  slug: string;
}

interface DataItem {
  stndPriceDetailId: string;
  stndPriceDetailUkey: string;
  sampleSizeStart: number;
  sampleSizeEnd: number;
  stndDscntPctg: number;
  prep: number;
  qc: number;
  lib: number;
  seq: number;
  bi: number;
  isUse: string;
}

const LazyMCCodeModifyModal = dynamic(() => import("./SvcStdAddModifyModal"), {
  ssr: false,
});

// 세부 기준가 관리
const StndPriceDetailList: React.FC<StndPriceDetailListProps> = ({ slug }) => {
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  const { data } = useSWR(
    `/mngr/stndPrice/${slug}/list`,
    fetcher,
    {
      suspense: true,
    },
    //{ revalidateOnFocus: true }
  );
  // if (isLoading) {
  //   return <SkeletonLoading />;
  // }
  // if (error) {
  //   console.log("api err", error);
  //   return;
  // }

  console.log("$$$$$$", data);

  const { stndPriceDetailList } = data;

  // const getDataList = tempData?.stndPriceDetailList || [];

  const renderList = () => {
    mutate(`/mngr/stndPrice/${slug}/list`);
  };

  // 세부 기준가 추가
  const handleDeleteRow = (key: string) => {
    console.log("handleDeleteRow", key);
  };

  // [ 코드 추가 ] 모달 오픈
  const handleAddRow = () => {
    const tempObj = {
      stndPriceDetailId: "",
      stndPriceDetailUkey: "",
      sampleSizeStart: 0,
      sampleSizeEnd: 0,
      stndDscntPctg: 0,
      prep: 0,
      qc: 0,
      lib: 0,
      seq: 0,
      bi: 0,
      isUse: "Y",
    };

    setSelectItem(tempObj);
    setMcCodeModifyModal(true);
  };
  // [ 아이템 수정 ] 모달 오픈
  const mcItemModifyModalOpen = (item: DataItem) => {
    setSelectItem(item);
    setMcCodeModifyModal(true);
  };

  // [ 아이템 수정 ] 모달 닫기
  const mcItemModifyModalClose = () => {
    setMcCodeModifyModal(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">
            세부 기준가 ( 총 {stndPriceDetailList.length} 건 )
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right", mb: 1 }}>
          <ContainedButton
            buttonName="세부 기준가 추가"
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
              <TH sx={{ width: "10%" }} align="center">
                기준가 코드
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                수량
              </TH>
              <TH sx={{ width: "14%" }} align="center">
                기준 할인율(%)
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                Prep
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                QC
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                Lib
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                Seq
              </TH>
              <TH sx={{ width: "10%" }} align="center">
                BI
              </TH>
              <TH sx={{ width: "8%" }} align="center">
                사용여부
              </TH>
              <TH sx={{ width: "8%" }} align="center">
                수정
              </TH>
            </TableRow>
          </TableHead>

          <TableBody>
            {stndPriceDetailList.length === 0 ? (
              <TableRow>
                <TD colSpan={10}>
                  <Box sx={{ textAlign: "center" }}>
                    등록된 코드가 없습니다.
                  </Box>
                </TD>
              </TableRow>
            ) : (
              stndPriceDetailList.map((dataItem: DataItem, index: number) => (
                <TableRow key={dataItem.stndPriceDetailUkey}>
                  <TD align="center">{dataItem.stndPriceDetailId}</TD>
                  <TD align="center">
                    {dataItem.sampleSizeStart} ~ {dataItem.sampleSizeEnd}
                  </TD>
                  <TD align="center">{dataItem.stndDscntPctg}</TD>
                  <TD align="center">{dataItem.prep}</TD>
                  <TD align="center">{dataItem.qc}</TD>
                  <TD align="center">{dataItem.lib}</TD>
                  <TD align="center">{dataItem.seq}</TD>
                  <TD align="center">{dataItem.bi}</TD>
                  <TD align="center">{dataItem.isUse}</TD>
                  <TD align="center">
                    <OutlinedButton
                      buttonName="수정"
                      size="small"
                      onClick={() => mcItemModifyModalOpen(dataItem)}
                      sx={{ mr: 1 }}
                    />
                    {/*         

                    <OutlinedButton
                      buttonName="삭제"
                      size="small"
                      color="error"
                      // endIcon={<MyIcon icon="trash" size={16} />}
                      onClick={() =>
                        handleDeleteRow(dataItem.stndPriceDetailUkey)
                      }
                    /> */}
                  </TD>
                  {/* 
                  <TD>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <InputValidation
                        inputName="sampleSizeStart"
                        disabled={false}
                        required={true}
                        errorMessage="필수 입력값입니다."
                        placeholder="최소 수량"
                        sx={{ width: 100, mr: 1 }}
                      />
                      -
                      <InputValidation
                        inputName="sampleSizeEnd"
                        disabled={false}
                        required={true}
                        errorMessage="필수 입력값입니다."
                        placeholder="최대 수량"
                        sx={{ width: 100, ml: 1 }}
                      />
                    </Stack>
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="stndDscntPctg"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="prep"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="qc"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="lib"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="seq"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName="bi"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="0"
                      sx={{ width: 100, ml: 1 }}
                    />
                  </TD>
                  <TD>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SelectBox
                        inputName="isUse"
                        options={[
                          { value: "Y", optionName: "사용" },
                          { value: "N", optionName: "사용안함" },
                        ]}
                        defaultOption={false}
                      />
                    </Stack>
                  </TD>
*/}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 코드 수정 모달 */}
      {selectItem && (
        <LazyMCCodeModifyModal
          onClose={mcItemModifyModalClose}
          open={mcCodeModifyModal}
          modalWidth={800}
          selectItem={selectItem}
          stndPriceMpngUkey={slug}
          renderList={renderList}
        />
      )}
    </>
  );
};

export default StndPriceDetailList;
