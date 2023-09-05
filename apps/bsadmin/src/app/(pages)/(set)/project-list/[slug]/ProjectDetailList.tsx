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

const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    if (res.status === 401) {
      // Handle the "401" error here
      throw new Error("Unauthorized"); // Throw an error to trigger the error state
    }
    return res.data;
  });

const LazyProjectDetailAddModifyModal = dynamic(
  () => import("./ProjectDetailAddModifyModal"),
  {
    ssr: false,
  }
);

interface ProjectDetailListProps {
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

const ProjectDetailList: React.FC<ProjectDetailListProps> = ({ slug }) => {
  // [연구 코드] 수정 모달
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  const {
    data: projectDetailTempData,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mngr/prjc/${slug}/list`,
    fetcher
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }
  if (error) {
    console.log("api err", error);
    return;
  }
  const masterCodeDetailList =
    projectDetailTempData?.data?.masterCodeDetailList || [];

  const projectDetail = masterCodeDetailList;

  const renderList = () => {
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/mngr/prjc/${slug}/list`);
  };

  // [ 연구 추가 ] 모달 오픈
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
  // [ 연구 코드 ] 모달 오픈
  const mcItemModifyModalOpen = (item: DataItem) => {
    setSelectItem(item);
    setMcCodeModifyModal(true);
  };

  // [ 연구 코드 ] 모달 닫기
  const mcItemModifyModalClose = () => {
    setMcCodeModifyModal(false);
  };

  return (
    <>
      {/* 연구 코드 - 코드 관리 컴포넌트 */}
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">
            세부 연구 ( {projectDetail.length} 건 )
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right", mb: 1 }}>
          <ContainedButton
            buttonName="연구 추가"
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
              <TH sx={{ width: "20%" }}>연구 코드</TH>
              <TH sx={{ width: "25%" }}>연구명(국문)</TH>
              <TH sx={{ width: "25%" }}>연구명(영문)</TH>
              <TH sx={{ width: "15%" }}>사용여부</TH>
              <TH sx={{ width: "10%" }}>수정</TH>
            </TableRow>
          </TableHead>

          <TableBody>
            {projectDetail.length === 0 ? (
              <TableRow>
                <TD colSpan={7}>
                  <Box sx={{ textAlign: "center" }}>
                    등록된 코드가 없습니다.
                  </Box>
                </TD>
              </TableRow>
            ) : (
              projectDetail.map((dataItem: DataItem, index: number) => (
                <TableRow key={dataItem.detailUniqueCode}>
                  <TD>{index + 1}</TD>
                  <TD>{dataItem.douzoneCode}</TD>
                  <TD>{dataItem.codeNm}</TD>
                  <TD>{dataItem.codeValue}</TD>
                  <TD>{dataItem.isRls == "Y" ? "사용" : "사용안함"}</TD>
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
        <LazyProjectDetailAddModifyModal
          onClose={mcItemModifyModalClose}
          open={mcCodeModifyModal}
          modalWidth={800}
          selectItem={selectItem}
          prjcUkey={slug}
          renderList={renderList}
        />
      )}
    </>
  );
};

export default ProjectDetailList;
