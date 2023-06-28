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
} from "cjbsDSTM";
import {
  Typography,
  Container,
  Box,
  Stack,
  Table,
  TableRow,
  TableBody,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  TableContainer,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useDaumPostcodePopup } from "react-daum-postcode";

import axios from "axios";

const LazyMemberTable = dynamic(() => import("./MemberDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

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
  const [selectedValue, setSelectedValue] = useState<string | "">("user656014");

  const methods = useForm();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = methods;

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
  };

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

  // [주소 찾기] 기능 시작
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  // [주소 찾기] 에서 완료했을 때 callback
  const handlePostAddressComplete = (data) => {
    //console.log("Post code data ==>>", data);
    let fullAddress = data.address;
    let zip = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // console.log("fullAddress", fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setValue("zip", zip);
    setValue("addr", fullAddress);
  };
  // [주소 찾기] 열기
  const handlePostAddressClick = () => {
    open({ onComplete: handlePostAddressComplete });
  };
  // [주소 찾기] 기능 종료

  // [ 영업 담당자 ] 담당자 선택
  const handleSelectChangeBSMng = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedValue(event.target.value as string);
  };

  //console.log("main ", selectedMembers);

  // Common
  // [ 등록 ]
  const onSubmit = (data: any) => {
    let saveMemberList = selectedMembers.map(({ custUkey, isLeader }) => ({
      custUkey,
      isLeader,
    }));
    let isSpecialMngFlag = getValues("isSpecialMng");
    let bsnsManagedByUkey = getValues("bsnsManagedByUkey");

    let saveObj = {
      addr: data.addr,
      addrDetail: data.addrDetail,
      agncNm: data.agncNm,
      bsnsManagedByUkey,
      custDetailList: saveMemberList,
      instUkey: data.instUkey,
      zip: data.zip,
      isSpecialMng: isSpecialMngFlag == true ? "Y" : "N",
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

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="거래처(PI) 등록" />
          </Box>

          {/*<Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>*/}
          {/*  <ContainedButton buttonName="멤버 관리" onClick={handleOpenModal} />*/}
          {/*</Stack>*/}

          <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>소속 기관</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        error={errors.instNm ? true : false}
                        helperText={errors.instNm?.message ?? null}
                        register={register}
                        inputName="instNm"
                        errorMessage="소속기관을 입력해 주세요."
                      />

                      <InputValidation
                        disabled={true}
                        sx={{ display: "none" }}
                        register={register}
                        inputName="instUkey"
                        error={errors.instUkey ? true : false}
                        helperText={errors.instUkey?.message ?? null}
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
                        error={errors.agncNm ? true : false}
                        helperText={errors.agncNm?.message ?? null}
                        register={register}
                        inputName="agncNm"
                        errorMessage={
                          errors.agncNm
                            ? "중복된 거래처명이 있습니다."
                            : "거래처(PI)를 입력해 주세요."
                        }
                      />

                      <OutlinedButton
                        size="small"
                        buttonName="중복 확인"
                        onClick={getAgncDuplicate}
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
                          register={register}
                          inputName="zip"
                          errorMessage={false}
                          placeholder="zip code"
                        />
                        <OutlinedButton
                          size="small"
                          buttonName="우편번호 찾기"
                          onClick={handlePostAddressClick}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          sx={{ width: 450 }}
                          register={register}
                          inputName="addr"
                          errorMessage={false}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          sx={{ width: 450 }}
                          register={register}
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
                    <FormControlLabel
                      label="특별 관리(SP)하는 거래처 입니다"
                      control={
                        <Checkbox size="small" {...register("isSpecialMng")} />
                      }
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>영업 담당자</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Select
                      {...register("bsnsManagedByUkey")}
                      size="small"
                      sx={{ width: 200 }}
                      value={selectedValue}
                      onChange={handleSelectChangeBSMng}
                    >
                      <MenuItem value={"user656014"}>키웨스트</MenuItem>
                      <MenuItem value={"user483349"}>라이언</MenuItem>
                      <MenuItem value={"user369596"}>모씨</MenuItem>
                      <MenuItem value={"user809094"}>LINK</MenuItem>
                      <MenuItem value={"user623719"}>코로그</MenuItem>
                    </Select>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>메모</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={4}
                      register={register}
                      inputName="memo"
                      errorMessage={false}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* 기관 검색 모달 */}
          {showAgncSearchModal && (
            <LazyAgncSearchModal
              onClose={agncSearchModalClose}
              open={showAgncSearchModal}
              modalWidth={800}
            />
          )}

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/agnc-pi-list")}
            />
            <ContainedButton type="submit" buttonName="저장" />
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
};

export default AgncAdd;
