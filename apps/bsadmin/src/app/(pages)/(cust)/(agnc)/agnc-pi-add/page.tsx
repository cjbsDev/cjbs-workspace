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
  CheckboxSV,
} from "cjbsDSTM";
import {
  Typography,
  Box,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { POST } from "api";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import LoadingWhiteSvg from "../../../../components/LoadingWhiteSvg";

const LazyMemberTable = dynamic(
  () => import("../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  }
);

const LazyAgncSearchModal = dynamic(() => import("./AgncSearchModal"), {
  ssr: false,
});

// 고객 검색
const LazyCustSearchModal = dynamic(
  () => import("../../../../components/CustSearchModal"),
  {
    ssr: false,
  }
);

// 영업 담당자
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

/**
 * Cust 와 Member
 * Cust 는 전체 고객을 나타내고,
 * Member 는 거래처안의 멤버(구성원)을 나타낸다.
 */

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
}

const AgncAdd = () => {
  // init
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // [기관 검색] 모달
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    useState<boolean>(false);

  // [영업 담당자]  selectbox 제어
  //  - user656014 초기값 향후 List api 개발시 1번째 값으로 변경예정
  // const [selectedValue, setSelectedValue] = useState<string | "">("user656014");

  const methods = useForm();
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  // [멤버 관리] 멤버 저장
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = () => {
    setCustSearchModalOpen(false);
  };

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

  // Common
  // [ 등록 ]
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const saveMemberList = selectedMembers
      .filter((member) => member.custUkey !== data.custUkey)
      .map(({ custUkey }) => ({
        custUkey,
      }));

    let saveObj = {
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      zip: data.zip ?? "",
      agncNm: data.agncNm,
      bsnsMngrUkey: data.bsnsMngrUkey,
      custDetailList: saveMemberList,
      custUkey: data.custUkey,
      instUkey: data.instUkey,
      isSpecialMng: data.isSpecialMng == true ? "Y" : "N",
      memo: data.memo,
    };

    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `/agnc`; // Replace with your API URL

    await POST(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response.success);
        setIsLoading(false);
        if (response.success) {
          router.push("/agnc-pi-list");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("request failed:", error);
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
                    sx={{ width: 600 }}
                    inputName="instNm"
                    required={true}
                    errorMessage="기관을 검색 선택해 주세요."
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputValidation
                    disabled={true}
                    sx={{ display: "none" }}
                    inputName="instUkey"
                    InputProps={{
                      readOnly: true,
                    }}
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
                    sx={{ width: 600 }}
                    required={true}
                    errorMessage={
                      "거래처 이름을 한글 또는 영문으로 10자리 이내로 입력해주세요."
                    }
                    pattern={/^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s()-]*$/}
                    patternErrMsg="거래처 이름을 한글 또는 영문으로 10자리 이내로 입력해주세요."
                    maxLength={10}
                    maxLengthErrMsg="거래처 이름은 10자 이내로 입력해주세요."
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
                      inputName="zip"
                      placeholder="우편번호"
                      sx={{ width: 77 }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addr"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      sx={{ width: 600 }}
                      inputName="addrDetail"
                      maxLength={50}
                      maxLengthErrMsg="50자 이내로 입력해주세요."
                      placeholder="상세주소"
                    />
                  </Stack>
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>연구책임자 아이디</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    disabled={true}
                    inputName="ebcEmail"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                    required={true}
                  />

                  <InputValidation
                    disabled={true}
                    sx={{ display: "none" }}
                    inputName="custUkey"
                  />

                  <OutlinedButton
                    size="small"
                    buttonName="아이디 검색"
                    onClick={handleCustSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>연구책임자 이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    disabled={true}
                    required={true}
                    inputName="custNm"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyMemberTable
          selectMemberCallbak={handleMemberSelection}
          memberSearchModalFlag={true}
        />
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
                <CheckboxSV
                  inputName="isSpecialMng"
                  labelText="특별 관리(SP)하는 거래처 입니다."
                  value=""
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <LazySalesManagerSelctbox />
                </ErrorContainer>
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
                  placeholder="메모"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 고객 검색 모달*/}
      <LazyCustSearchModal
        onClose={handleCustSearchModalClose}
        open={custSearchModalOpen}
        modalWidth={800}
        type="agnc"
      />

      {/* 기관 검색 모달 */}
      <LazyAgncSearchModal
        onClose={agncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={1000}
      />

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/agnc-pi-list")}
        />

        <ContainedButton
          type="submit"
          buttonName="저장"
          endIcon={isLoading ? <LoadingWhiteSvg /> : null}
        />
      </Stack>
    </Form>
  );
};

export default AgncAdd;
