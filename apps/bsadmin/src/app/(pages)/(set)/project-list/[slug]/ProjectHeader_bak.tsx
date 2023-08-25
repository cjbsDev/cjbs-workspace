"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import {
  TH,
  TD,
  InputValidation,
  OutlinedButton,
  SelectBox,
  Form,
} from "cjbsDSTM";
import useSWR, { mutate } from "swr";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Container,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

import SkeletonLoading from "../../../../components/SkeletonLoading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface ProjectHeaderProps {
  slug: string;
}

const LazySelectDept = dynamic(() => import("../../DeptMng/SelectDept"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySelectDeptMng = dynamic(() => import("../../DeptMng/SelectDeptMng"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const LazyProjectAddModifyModal = dynamic(
  () => import("./ProjectModifyModal"),
  {
    ssr: false,
  }
);

interface DataItem {
  departCodeMc: string;
  departCodeMcVal: string;
  prjcMngrNm: string;
  prjcMngrUkey: string;
  prjcNm: string;
  prjcUkey: string;
  prjcUniqueCode: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ slug }) => {
  const [projectModifyModal, setProjectModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  // load
  const {
    data: getData,
    error,
    isLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/mngr/prjc/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const projectData = getData.data;
  console.log("projectData", projectData);

  const renderList = () => {
    mutate(`${process.env.NEXT_PUBLIC_API_URL}/mngr/prjc/${slug}/list`);
  };

  const defaultValues = {
    prjcUniqueCode: projectData.prjcUniqueCode,
    prjcUkey: projectData.prjcUkey,
    prjcNm: projectData.prjcNm,
    departCodeMc: projectData.departCodeMc,
    departCodeMcVal: projectData.departCodeMcVal,
    prjcMngrUkey: projectData.prjcMngrUkey,
    prjcMngrNm: projectData.prjcMngrNm,
  };

  // [ 프로젝트 수정 ] 모달 오픈
  const projectModifyModalOpen = (item: DataItem) => {
    setSelectItem(item);
    setProjectModifyModal(true);
  };

  // [ 프로젝트 수정 ] 모달 닫기
  const projectModifyModalClose = () => {
    setProjectModifyModal(false);
  };

  const onSubmit = (data: any) => {
    console.log("onSubmit", data);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">기본 정보</Typography>
        </Grid>
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right", mb: 1 }}>
          <OutlinedButton
            buttonName="수정"
            onClick={() => projectModifyModalOpen(projectData)}
          />
        </Grid>
      </Grid>

      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>과제</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="flex-start">
                    <InputValidation
                      inputName="prjcUniqueCode"
                      disabled={true}
                      required={true}
                      errorMessage="과제를 검색 & 선택해주세요."
                      placeholder="과제 코드"
                      sx={{ width: 200 }}
                    />
                    <InputValidation
                      inputName="prjcNm"
                      disabled={true}
                      required={true}
                      errorMessage="과제를 검색 & 선택해주세요."
                      placeholder="과제명"
                      sx={{ width: 600 }}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>수행부서</TH>{" "}
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {/*
                    <LazySelectDept />
                     */}
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>과제 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    {/*
                    <LazySelectDeptMng />
                    */}
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* 코드 수정 모달 
        {selectItem && (
          <LazyProjectAddModifyModal
            onClose={projectModifyModalClose}
            open={projectModifyModal}
            modalWidth={800}
            selectItem={selectItem}
            uniqueCode={slug}
            renderList={renderList}
          />
        )}
         */}
      </Form>
    </>
  );
};

export default ProjectHeader;
