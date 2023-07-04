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
import React, { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  NativeSelect,
  Select,
  MenuItem,
  FormControlLabel,
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
  Checkbox,
  TD,
  TH,
  Title1,
  PostCodeBtn,
} from "cjbsDSTM";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import axios from "axios";

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

interface FormData {
  agncNm?: string;
  agncUkey?: string;
  addr?: string;
  addrDetail?: string;
  zip?: string;
  bsnsManagedByUkey?: string;
  custDetail?: string[];
  isSpecialMng?: any;
  isSpecialMngFlag?: boolean;
  memo?: string;
}

/*
interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  isAcs: string;
  isLeader: boolean;
}
*/

interface Member {
  isLeader: string;
  custUkey: string;
  ebcEmail: string;
  custNm: string;
  isAcs: string;
  isLeaderFlag: boolean;
}

export default function AgncPIModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("agncUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/${uKey}`
      )
        .then((res) => res.json())
        .then((getData) => {
          const data = getData.data;

          // isLeader 가 Y 면 true, N 면 false 로 세팅한다.
          const updatedCustDetailData = data.custDetail.map((row: Member) => {
            return {
              ...row,
              isLeaderFlag: row.isLeader === "Y",
            };
          });
          //console.log("updatedCustDetailData", updatedCustDetailData);
          setSelectedMembers(updatedCustDetailData);
          setIsLoading(false);

          return {
            instNm: data.instNm,
            agncId: data.agncId,
            agncNm: data.agncNm,
            agncUkey: data.agncUkey,
            addr: data.addr,
            addrDetail: data.addrDetail,
            bsnsManagedByNm: data.bsnsManagedByNm,
            bsnsManagedByUkey: data.bsnsManagedByUkey,
            custDetail: updatedCustDetailData,
            zip: data.zip,
            isSpecialMng: data.isSpecialMng,
            isSpecialMngFlag: data.isSpecialMng === "Y",
            memo: data.memo,
            pymnPrice: data.pymnPrice,
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
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const handleMemberSelection = (selectedMembers: Member[]) => {
    setSelectedMembers(selectedMembers);
  };

  // [영업 담당자]  selectbox 제어
  //  - user656014 초기값 향후 List api 개발시 1번째 값으로 변경예정
  //const [selectedValue, setSelectedValue] = useState<string | "">("user656014");
  const [selectedValue, setSelectedValue] = useState<string | "">("user656014");

  // [ 영업 담당자 ] 담당자 선택
  const handleSelectChangeBSMng = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedValue(event.target.value as string);
  };

  // [ 수정 ]
  const onSubmit = (data: any) => {
    //console.log("selectedMembers", selectedMembers);

    let saveMemberList = selectedMembers.map(({ custUkey, isLeader }) => ({
      custUkey,
      isLeader,
    }));
    let isSpecialMngFlag = getValues("isSpecialMngFlag");
    let bsnsManagedByUkey = getValues("bsnsManagedByUkey");

    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      agncNm: data.agncNm,
      agncUkey: data.agncUkey, // 수정에서 생김
      bsnsManagedByUkey,
      custDetailList: saveMemberList,
      zip: data.zip,
      isSpecialMng: isSpecialMngFlag == true ? "Y" : "N",
      memo: data.memo,
    };
    //console.log("==modify", saveObj);
    //console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          //router.push("/cust/cust-list/" + slug);
          router.push("/cust/agnc-pi-list/" + uKey);
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
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
                      errorMessage={false}
                      disabled={true}
                    />
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)명</TH>

                  <TD sx={{ width: "85%" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={errors.agncNm ? true : false}
                        inputName="agncNm"
                        errorMessage={
                          errors.agncNm
                            ? "중복된 거래처명이 있습니다."
                            : "거래처(PI)를 입력해 주세요."
                        }
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

          {/* memberData={getValues("custDetail")} */}
          {!isLoading && (
            <ErrorContainer FallbackComponent={Fallback}>
              <LazyMemberTable
                selectMemberCallbak={handleMemberSelection}
                memberData={selectedMembers}
              />
            </ErrorContainer>
          )}

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
                      defaultValue="Y"
                      inputName="isSpecialMngFlag"
                      labelText="특별 관리(SP)하는 거래처 입니다"
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

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/agnc-pi-list")}
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
