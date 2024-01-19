"use client";

import React, { useState } from "react";
import {
  TH,
  TD,
  OutlinedButton,
  InputValidation,
  Form,
  ContainedButton,
} from "cjbsDSTM";
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
import LoadingSvg from "../../../../../public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { PUT, POST } from "api";
import { toast } from "react-toastify";
import { fetcher } from "api";
import dynamic from "next/dynamic";

interface DataItem {
  departCodeMc: string;
  departCodeMcVal: string;
  prjcMngrNm: string;
  prjcMngrUkey: string;
  prjcNm: string;
  prjcUkey: string;
  prjcUniqueCode: string;
}

const LazyProjectSearchModal = dynamic(() => import("./ProjectSearchModal"), {
  ssr: false,
});

const LazySelectDept = dynamic(() => import("../DeptMng/SelectDept"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySelectDeptMng = dynamic(() => import("../DeptMng/SelectDeptMng"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ProjectHeader = () => {
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // [ 등록 ]
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    let saveObj = {
      departCodeMc: data.departCodeMc,
      isPrjcDetailUse: "Y",
      prjcMngrUkey: data.prjcMngrUkey,
      prjcUniqueCode: data.prjcUniqueCode,
    };
    // console.log("==saveObj", saveObj);
    // console.log("saveObj stringify", JSON.stringify(saveObj));
    const apiUrl = `/mngr/prjc/`; // Replace with your API URL

    try {
      const response = await POST(apiUrl, saveObj); // API 요청
      setIsLoading(false);
      if (response.success) {
        router.push("/project-list/" + response.data);
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }

    // 여기서 바로 조회로 넘어가야될듯.
  };

  // 과제 등록에서는 기본 데이터를 세팅
  const defaultValues = {
    departCodeMc: "BS_0100003012",
  };

  // // [프로젝트 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [ 프로젝트 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // // [ 프로젝트 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
          <Typography variant="subtitle1">기본 정보</Typography>
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

                    <OutlinedButton
                      size="small"
                      buttonName="과제 검색"
                      onClick={agncSearchModalOpen}
                    />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>수행부서</TH>{" "}
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LazySelectDept />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>과제 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LazySelectDeptMng />
                  </Stack>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("/project-list")}
          />
          <ContainedButton
            type="submit"
            buttonName="저장"
            endIcon={
              isLoading ? (
                <LoadingSvg stroke="white" width={20} height={20} />
              ) : null
            }
          />
        </Stack>

        {/* 프로젝트 검색 모달*/}
        <LazyProjectSearchModal
          onClose={agncSearchModalClose}
          open={showAgncSearchModal}
          modalWidth={800}
        />
      </Form>
    </>
  );
};

export default ProjectHeader;
