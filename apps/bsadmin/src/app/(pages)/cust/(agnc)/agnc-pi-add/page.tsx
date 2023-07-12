"use client";
import React, { useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  InputValidation,
  Form,
  PostCodeBtn,
  Checkbox,
  SelectBox,
} from "cjbsDSTM";
import {
  Typography,
  Container,
  Box,
  Stack,
  Table,
  TableRow,
  TableBody,
  FormControlLabel,
  MenuItem,
  TableContainer,
} from "@mui/material";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../components/SkeletonLoading";

import axios from "axios";

const LazyMemberTable = dynamic(
  () => import("../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  }
);

const LazyAgncSearchModal = dynamic(() => import("./InstSearchModal"), {
  ssr: false,
});

/**
 * Cust 와 Member
 * Cust 는 전체 고객을 나타내고,
 * Member 는 거래처안의 멤버(구성원)을 나타낸다.
 */

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  isAcs: string;
  isLeader: boolean;
}

const AgncAdd = () => {
  // init
  const router = useRouter();

  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [영업 담당자]  selectbox 제어
  //  - user656014 초기값 향후 List api 개발시 1번째 값으로 변경예정
  // const [selectedValue, setSelectedValue] = useState<string | "">("user656014");

  const methods = useForm({
    mode: "onChange",
  });
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  const ddd = watch("instNm");

  // [멤버 관리] 멤버 저장
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const handleMemberSelection = (selectedMembers: Member[]) => {
    setSelectedMembers(selectedMembers);
  };

  // [ 기관 검색 ] 모달 오픈
  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  // [ 기관 검색 ] 모달 닫기
  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
    console.log("getInstNm", getValues("instNm"));
    console.log("getAgncNm", getValues("agncNm"));
  };

  /*
  // [ 거래처 ] 중복 확인
  const getAgncDuplicate = async () => {
    let getAgncNm = getValues("agncNm");
    console.log("getAgncNm", getAgncNm);
    if (getAgncNm) {
      const apiUrl =
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/duplicate/` +
        getAgncNm; // Replace with your API URL

      try {
        const getAgncDuplicateData = await axios.get(apiUrl);
        console.log(getAgncDuplicateData.data);
      } catch (error) {
        console.info("거래처 중복확인 Error", error);
      }
      // 문제 없다는 리턴 혹은 메세지 해줘야 하고, check set true 필요
      // 혹은 이미 같은 이름으로 저장된 거래처 명이 있다는 것을 알려줘야 하고, check set false 필요
      return true;
    } else {
      // 중복 체크할 거래처명이 없다는 것을 리턴해야함.
      console.info("거래처명을 입력해주세요.");
      return false;
    }
  };
  */

  // Common
  // [ 등록 ]
  const onSubmit = (data: any) => {
    let saveMemberList = selectedMembers.map(({ custUkey, isLeader }) => ({
      custUkey,
      isLeader,
    }));

    console.log("data", data);

    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      agncNm: data.agncNm,
      bsnsManagedByUkey: data.bsnsManagedByUkey,
      custDetailList: saveMemberList,
      instUkey: data.instUkey,
      zip: data.zip,
      isSpecialMng: data.isSpecialMng == true ? "Y" : "N",
      memo: data.memo,
    };
    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc`; // Replace with your API URL

    axios
      .post(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          //router.push("/cust/cust-list/" + slug);
          router.push("/cust/agnc-pi-list");
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };

  const defaultValues = undefined;

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="거래처(PI) 등록" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
        기본 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>소속 기관</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    inputName="instNm"
                    errorMessage="소속기관을 입력해 주세요."
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputValidation
                    disabled={true}
                    sx={{ display: "none" }}
                    inputName="instUkey"
                    errorMessage="필수 값입니다."
                  />

                  <OutlinedButton
                    size="small"
                    buttonName="기관 검색"
                    onClick={agncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="agncNm"
                    errorMessage={
                      errors.agncNm
                        ? "중복된 거래처명이 있습니다."
                        : "거래처(PI)를 입력해 주세요."
                    }
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>주소 [선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      disabled={true}
                      inputName="zip"
                      errorMessage={false}
                      placeholder="zip code"
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      disabled={true}
                      sx={{ width: 450 }}
                      inputName="addr"
                      errorMessage={false}
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 450 }}
                      inputName="addrDetail"
                      errorMessage={false}
                      placeholder="상세주소"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyMemberTable selectMemberCallbak={handleMemberSelection} />
      </ErrorContainer>

      <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
        운영 관리 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Checkbox
                  inputName="isSpecialMng"
                  labelText="특별 관리(SP)하는 거래처 입니다."
                  value=""
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <SelectBox
                  inputName="bsnsManagedByUkey"
                  options={[
                    { value: "user656014", optionName: "키웨스트" },
                    { value: "user483349", optionName: "라이언" },
                    { value: "user369596", optionName: "모씨" },
                    { value: "user809094", optionName: "LINK" },
                    { value: "user623719", optionName: "코로그" },
                  ]}
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>메모</TH>

              <TD sx={{ width: "85%" }} colSpan={5}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  errorMessage={false}
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 기관 검색 모달 */}
      <LazyAgncSearchModal
        onClose={agncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/agnc-pi-list")}
        />

        <ContainedButton type="submit" buttonName="저장" />
      </Stack>
    </Form>
  );
};

export default AgncAdd;
