"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  CheckboxSV,
  TD,
  TH,
  Title1,
  PostCodeBtn,
  Form,
} from "cjbsDSTM";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { fetcher, PUT } from "api";
import { toast } from "react-toastify";
import useSWR from "swr";
import RsrchDirector from "./RsrchDirector";
import { useState } from "react";

const LazyAgncModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

const LazyMemberTable = dynamic(
  () => import("../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  },
);

// 고객 검색
const LazyCustSearchModal = dynamic(
  () => import("../../../../components/CustSearchModal"),
  {
    ssr: false,
  },
);

// 영업 담당자
const LazySalesManagerSelctbox = dynamic(
  () => import("../../../../components/SalesManagerSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

interface FormData {
  agncNm?: string;
  agncUkey?: string;
  addr?: string;
  addrDetail?: string;
  zip?: string;
  bsnsMngrUkey?: string;
  custDetail?: string[];
  isSpecialMng?: any;
  isSpecialMngFlag?: boolean;
  memo?: string;
}

interface Member {
  custUkey: string;
  ebcEmail: string;
  custNm: string;
}

const AgncPiModify = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("agncUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data } = useSWR(`/agnc/${uKey}`, fetcher, {
    suspense: true,
  });

  console.log("HJHJHJHJHJ", data);

  const defaultValues = {
    ...data,
    addr: data.addr ?? "",
    addrDetail: data.addrDetail ?? "",
    zip: data.zip ?? "",
    isSpecialMng: data.isSpecialMng === "Y" ? true : false,
    // instNm: data.instNm,
    // agncId: data.agncId,
    // agncNm: data.agncNm,
    // agncUkey: data.agncUkey,
    // bsnsMngrNm: data.bsnsMngrNm,
    // bsnsMngrUkey: data.bsnsMngrUkey,
    // custDetail: data.custDetail,
    // isSpecialMng: data.isSpecialMng,
    // memo: data.memo,
    // pymnPrice: data.pymnPrice,
    // ebcEmail: data.ebcEmail,
    // custNm: data.custNm,
    // custUkey: data.custUkey,
  };

  // [멤버 관리] 멤버 저장
  const [selectedMembers, setSelectedMembers] = React.useState<Member[]>([]);

  const handleMemberSelection = (selectedMembers: Member[]) => {
    setSelectedMembers(selectedMembers);
  };

  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    React.useState<boolean>(false);

  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = () => {
    setCustSearchModalOpen(false);
  };

  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);

    const saveMemberList = selectedMembers
      .filter((member) => member.custUkey !== data.custUkey)
      .map(({ custUkey }) => ({
        custUkey,
      }));

    const saveObj = {
      ...data,
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      custDetailList: saveMemberList,
      isSpecialMng: data.isSpecialMng ? "Y" : "N",
      zip: data.zip ?? "",
      // agncNm: data.agncNm,
      // agncUkey: data.agncUkey,
      // bsnsMngrUkey: data.bsnsMngrUkey,
      // memo: data.memo,
      // custUkey: data.custUkey,
    };
    // console.log("==modify", saveObj);
    // console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `/agnc`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      // console.log(response);
      if (response.success) {
        router.push("/agnc-pi-list/" + uKey);
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast(response.message + "$$$$$$$$$$");
        // toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast(error?.message);
    } finally {
    }
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="거래처(PI) 수정" />
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 5 }}>
          기본 정보
        </Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>기관명</TH>
                <TD sx={{ width: "85%" }}>
                  <InputValidation
                    inputName="instNm"
                    disabled={true}
                    required={true}
                    sx={{ width: 600 }}
                  />
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)명</TH>

                <TD sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <InputValidation
                      inputName="agncNm"
                      sx={{ width: 600 }}
                      required={true}
                      errorMessage={"거래처(PI)를 입력해 주세요."}
                      pattern={/^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s()-]*$/}
                      patternErrMsg="거래처 이름은 한글 또는 영문으로 10자리 이내로 입력해주세요."
                      maxLength={10}
                      maxLengthErrMsg="거래처 이름은 10자 이내로 입력해주세요."
                    />
                    {/*<OutlinedButton*/}
                    {/*  size="small"*/}
                    {/*  buttonName="중복 확인"*/}
                    {/*  // onClick={getAgncDuplicate}*/}
                    {/*/>*/}
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
                        placeholder="우편번호"
                      />
                      <PostCodeBtn />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <InputValidation
                        disabled={true}
                        inputName="addr"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <InputValidation
                        inputName="addrDetail"
                        maxLength={50}
                        maxLengthErrMsg="50자 이내로 입력해주세요."
                        placeholder="상세주소"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </Stack>
                </TD>
              </TableRow>

              <RsrchDirector />

              {/*<TableRow>*/}
              {/*  <TH sx={{ width: "15%" }}>연구책임자 아이디</TH>*/}
              {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
              {/*    <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
              {/*      <InputValidation*/}
              {/*        disabled={true}*/}
              {/*        inputName="ebcEmail"*/}
              {/*        errorMessage="연구책임자를 선택해주세요."*/}
              {/*        sx={{ width: 600 }}*/}
              {/*        required={true}*/}
              {/*      />*/}

              {/*      <InputValidation*/}
              {/*        disabled={true}*/}
              {/*        sx={{ display: "none" }}*/}
              {/*        inputName="custUkey"*/}
              {/*      />*/}

              {/*      <OutlinedButton*/}
              {/*        size="small"*/}
              {/*        buttonName="아이디 검색"*/}
              {/*        onClick={handleCustSearchModalOpen}*/}
              {/*      />*/}
              {/*    </Stack>*/}
              {/*  </TD>*/}
              {/*</TableRow>*/}
              {/*<TableRow>*/}
              {/*  <TH sx={{ width: "15%" }}>연구책임자 이름</TH>*/}
              {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
              {/*    <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
              {/*      <InputValidation*/}
              {/*        disabled={true}*/}
              {/*        required={true}*/}
              {/*        inputName="custNm"*/}
              {/*        errorMessage="연구책임자를 선택해주세요."*/}
              {/*        sx={{ width: 600 }}*/}
              {/*      />*/}
              {/*    </Stack>*/}
              {/*  </TD>*/}
              {/*</TableRow>*/}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 소속 연구원 */}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyMemberTable
            selectMemberCallbak={handleMemberSelection}
            // memberData={selectedMembers}
            memberData={data.custDetail}
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
                    labelText="특별 관리(SP)하는 거래처 입니다"
                    value=""
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>영업 담당자</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <LazySalesManagerSelctbox />
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

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("/agnc-pi-list")}
          />
          <ContainedButton buttonName="수정" type="submit" />
        </Stack>
      </Form>
      {/*<Box*/}
      {/*  component="form"*/}
      {/*  noValidate*/}
      {/*  autoComplete="off"*/}
      {/*  onSubmit={handleSubmit(onSubmit)}*/}
      {/*>*/}
      {/*  */}
      {/*</Box>*/}

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncModifyLog uKey={uKey} apiName="agnc" logTitle="거래처(PI)" />
        </ErrorContainer>
      </Box>
    </Container>
  );
};

export default AgncPiModify;
