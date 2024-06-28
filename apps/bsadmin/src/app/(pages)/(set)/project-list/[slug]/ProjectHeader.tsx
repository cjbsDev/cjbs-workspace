"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { TH, TD, OutlinedButton } from "cjbsDSTM";
import useSWR, { mutate } from "swr";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  Stack,
  Grid,
} from "@mui/material";

import SkeletonLoading from "../../../../components/SkeletonLoading";

import { fetcher } from "api";

interface ProjectHeaderProps {
  slug: string;
}

const LazyProjectAddModifyModal = dynamic(
  () => import("./ProjectModifyModal"),
  {
    ssr: false,
  },
);

interface DataItem {
  departCodeMc: string;
  departCodeMcVal: string;
  prjtMngrNm: string;
  prjtMngrUkey: string;
  prjtNm: string;
  prjtUkey: string;
  prjtUniqueCode: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ slug }) => {
  const [projectModifyModal, setProjectModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  // load
  const {
    data: projectData,
    error,
    isLoading,
  } = useSWR(`/mngr/prjt/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const renderList = () => {
    mutate(`/mngr/prjt/${slug}`);
  };

  const defaultValues = {
    prjtUniqueCode: projectData.prjtUniqueCode,
    prjtUkey: projectData.prjtUkey,
    prjtNm: projectData.prjtNm,
    departCodeMc: projectData.departCodeMc,
    departCodeMcVal: projectData.departCodeMcVal,
    prjtMngrUkey: projectData.prjtMngrUkey,
    prjtMngrNm: projectData.prjtMngrNm,
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

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>과제</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  {projectData.prjtNm ?? ""}
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>수행부서</TH>{" "}
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {projectData.departCodeMcVal ?? ""}
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>과제 담당자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {projectData.prjtMngrNm ?? ""}
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 코드 수정 모달 */}
      {selectItem && (
        <LazyProjectAddModifyModal
          onClose={projectModifyModalClose}
          open={projectModifyModal}
          modalWidth={800}
          selectItem={selectItem}
          prjtUkey={slug}
          renderList={renderList}
        />
      )}
    </>
  );
};

export default ProjectHeader;
