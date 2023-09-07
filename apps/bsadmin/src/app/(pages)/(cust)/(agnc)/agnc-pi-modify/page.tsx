/**
 * 거래처(PI) 수정
 * 1. 해당 페이지 기능들 파악
 *  - 수정
 *    거래처명 : agncNm
 *    거래처 Ukey : agncUkey
 *    주소 : addr
 *    주소 자세히 : addrDetail
 *    우편 번호 : zip
 *    멤버 정보 : custDetail[]
 *    특별 관리 : isSpecialMng
 *    메모 : memo
 *
 */

"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams, usePathname } from "next/navigation";
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
import LogUpdateTitle from "../../../../components/LogUpdateTitle";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  SelectBox,
  CheckboxSV,
  TD,
  TH,
  Title1,
  PostCodeBtn,
} from "cjbsDSTM";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { PUT } from "api";
import { toast } from "react-toastify";

const LazyAgncModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);

const LazyMemberTable = dynamic(
  () => import("../../../../components/MemberMng"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={270} />,
  }
);

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

export default function AgncPIModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("agncUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/agnc/${uKey}`)
        .then((res) => res.json())
        .then((getData) => {
          const data = getData.data;
          console.log("in AgncPIModifyPage data", data);
          if (!data) {
            console.log("데이터가 없습니다. 메세지 보이고 페이지 이동");
            router.push("/agnc-pi-list");
            return;
          }

          setSelectedMembers(data.custDetail);
          setIsLoading(false);

          return {
            instNm: data.instNm,
            agncId: data.agncId,
            agncNm: data.agncNm,
            agncUkey: data.agncUkey,
            addr: data.addr ?? "",
            addrDetail: data.addrDetail ?? "",
            zip: data.zip ?? "",
            bsnsMngrNm: data.bsnsMngrNm,

            bsnsMngrUkey: data.bsnsMngrUkey,
            custDetail: data.custDetail,
            isSpecialMng: data.isSpecialMng,
            isSpecialMngFlag: data.isSpecialMng === "Y",
            memo: data.memo,
            pymnPrice: data.pymnPrice,
            ebcEmail: data.ebcEmail,
            custNm: data.custNm,
            custUkey: data.custUkey,
          };
        });
    },
  });
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

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

  // [ 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in onSubmit");
    //console.log("selectedMembers", selectedMembers);

    const saveMemberList = selectedMembers
      .filter((member) => member.custUkey !== data.custUkey)
      .map(({ custUkey }) => ({
        custUkey,
      }));

    let isSpecialMngFlag = getValues("isSpecialMngFlag");
    let bsnsMngrUkey = getValues("bsnsMngrUkey");

    let saveObj = {
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      zip: data.zip ?? "",
      agncNm: data.agncNm,
      agncUkey: data.agncUkey, // 수정에서 생김
      bsnsMngrUkey,
      custDetailList: saveMemberList,
      isSpecialMng: isSpecialMngFlag == true ? "Y" : "N",
      memo: data.memo,
      //custUkey: data.custUkey,
    };
    console.log("==modify", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `/agnc`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        router.push("/agnc-pi-list/" + uKey);
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
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

                <TableRow>
                  <TH sx={{ width: "15%" }}>연구책임자 아이디</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        required={true}
                        inputName="ebcEmail"
                        sx={{ width: 600 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>연구책임자 이름</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        required={true}
                        inputName="custNm"
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
              memberData={selectedMembers}
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
                      inputName="isSpecialMngFlag"
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
        </Box>

        <Box sx={{ mb: 5 }}>
          <LogUpdateTitle logTitle="거래처(PI)" />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyAgncModifyLog apiName="agnc" uKey={uKey} />
          </ErrorContainer>
        </Box>
      </Container>
    </FormProvider>
  );
}
