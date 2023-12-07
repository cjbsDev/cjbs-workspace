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
    data: projectData,
    error,
    isLoading,
  } = useSWR(`/mngr/prjc/${slug}`, fetcher);
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const renderList = () => {
    mutate(`/mngr/prjc/${slug}`);
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
                  {projectData.prjcNm ?? ""}
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
                  {projectData.prjcMngrNm ?? ""}
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
          prjcUkey={slug}
          renderList={renderList}
        />
      )}
    </>
  );
};

export default ProjectHeader;
