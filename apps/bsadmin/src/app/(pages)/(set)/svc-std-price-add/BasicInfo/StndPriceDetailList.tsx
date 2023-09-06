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
import MyIcon from "icon/myIcon";

import { fetcher } from "api";

// 세부 기준가 관리
const StndPriceDetailList = () => {
  const {
    data: msCodeDetailTempData,
    error,
    isLoading,
  } = useSWR(
    `/mngr/masterCode/detail/BS_0100001`,
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

  // 세부 기준가 추가
  const handleAddRow = () => {
    console.log("handleAddRow");
  };
  const handleDeleteRow = () => {
    console.log("handleDeleteRow");
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">
            세부 기준가 ( 총 {msCodeDetail.length} 건 )
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
              <TH sx={{ width: "7%" }}>기준가 코드</TH>
              <TH sx={{ width: "20%" }}>수량</TH>
              <TH sx={{ width: "10%" }}>기준 할인율(%)</TH>
              <TH sx={{ width: "10%" }}>Prep</TH>
              <TH sx={{ width: "10%" }}>QC</TH>
              <TH sx={{ width: "10%" }}>Lib</TH>
              <TH sx={{ width: "10%" }}>Seq</TH>
              <TH sx={{ width: "10%" }}>BI</TH>
              <TH sx={{ width: "13%" }}>사용여부</TH>
            </TableRow>
          </TableHead>

          <TableBody>
            {/** TableRow 를 append 하는 방식으로 변경 */}
            <TableRow>
              <TD>
                <OutlinedButton
                  buttonName="수정"
                  onClick={() => handleDeleteRow}
                />
              </TD>

              <TD>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <InputValidation
                    inputName="minCnt"
                    disabled={false}
                    required={true}
                    errorMessage="필수 입력값입니다."
                    placeholder="최소 수량"
                    sx={{ width: 100, mr: 1 }}
                  />
                  -
                  <InputValidation
                    inputName="maxCnt"
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
                  inputName="aaa"
                  disabled={false}
                  required={true}
                  errorMessage="필수 입력값입니다."
                  placeholder="0"
                  sx={{ width: 100, ml: 1 }}
                />
              </TD>
              <TD>
                <InputValidation
                  inputName="aaa"
                  disabled={false}
                  required={true}
                  errorMessage="필수 입력값입니다."
                  placeholder="0"
                  sx={{ width: 100, ml: 1 }}
                />
              </TD>
              <TD>
                <InputValidation
                  inputName="aaa"
                  disabled={false}
                  required={true}
                  errorMessage="필수 입력값입니다."
                  placeholder="0"
                  sx={{ width: 100, ml: 1 }}
                />
              </TD>
              <TD>
                <InputValidation
                  inputName="aaa"
                  disabled={false}
                  required={true}
                  errorMessage="필수 입력값입니다."
                  placeholder="0"
                  sx={{ width: 100, ml: 1 }}
                />
              </TD>
              <TD>
                <InputValidation
                  inputName="aaa"
                  disabled={false}
                  required={true}
                  errorMessage="필수 입력값입니다."
                  placeholder="0"
                  sx={{ width: 100, ml: 1 }}
                />
              </TD>
              <TD>
                <InputValidation
                  inputName="aaa"
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
                    inputName="isRls"
                    options={[
                      { value: "Y", optionName: "사용" },
                      { value: "N", optionName: "사용안함" },
                    ]}
                    defaultOption={false}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>

          {/* 
              "stndPriceDetailList": [
                  {
                    "bi": 0,
                    "isUse": "사용여부",
                    "lib": 0,
                    "prep": 0,
                    "qc": 0,
                    "sampleSizeEnd": 0,
                    "sampleSizeStart": 0,
                    "seq": 0,
                    "stndDscntPctg": 0
                  }
                ]      
            */}
        </Table>
      </TableContainer>
    </>
  );
};

export default StndPriceDetailList;
