/*
  230623 PLAN 

  1. 기본 정보 세팅  // 완료
    - 소속 기관 
    - 거래처 중복 확인 /agnc/duplicate/{agncNm}
    - 등록전 기본 정보 확인
    - 등록하기 ( 소속기관,거래처,우편번호 포함 주소 + 다른 값들은 상수 값 ) 
    
  2. 멤버 정보 세팅  // ~17시
    - Load ( 멤버 정보 ) 
    - 고객 -> 멤버 설정 ( 추가 ) 
    - 고객 -> 멤버 설정 ( 삭제 )
    - 고객 -> 멤버 설정 ( 리더 설정 - 디폴트 1번째 멤버 ) 
    - 고객 -> 멤버 설정 ( 리더 설정 - 라디오 버튼으로 변경 ) // 추후  
    - 등록하기 ( 기본 정보 + 멤버 정보 + 운영 상수값 )
  3. 운영 관리 정보 // 27일
    - 이벤트 설정 ( 상태, 영업 담당자, 메모 )
    - Load ( 기본 정보 + 운영 관리 + 멤버 정보 )
    - 등록하기 ( 전체 ) 
*/

"use client";
import React, { useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
  InputValidation,
  InputDefaultType,
  ModalContainer,
  ModalTitle,
} from "cjbsDSTM";
import {
  Typography,
  Container,
  Box,
  Button,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  TableContainer,
} from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useDaumPostcodePopup } from "react-daum-postcode";
import AgncSearchModal from "./InstSearchModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { memberManagementModalAtom } from "../../../../recoil/atoms/modalAtom";
import axios from "axios";

const LazyMemberTable = dynamic(() => import("./MemberDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});

const LazyAgncSearchModal = dynamic(() => import("./InstSearchModal"), {
  ssr: false,
});

const LazyMemberMngtModal = dynamic(() => import("./MemberMngtNewModal"), {
  ssr: false,
});

interface FormData {
  instUkey?: string;
  agncNm?: string;
  addr?: string;
  addrDetail?: string;
  zip?: string;
  custDetailList?: string[];
  isSpecialMng?: string;
  bsnsManagedByUkey?: string;
  memo?: string;
}

interface IData {
  data: FormData;
}

const AgncAdd = () => {
  // init
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [address, setAddress] = useState<string>("");
  const router = useRouter();
  const [memberManagementModalOpen, setMemberManagementModalOpen] =
    useRecoilState(memberManagementModalAtom);
  const getMemberManagementModalOpen = useRecoilValue(
    memberManagementModalAtom
  );
  const [selectedValue, setSelectedValue] = useState<number | "">(10);

  const methods = useForm();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = methods;

  // event

  const handlePostAddressComplete = (data) => {
    console.log("Post code data ==>>", data);
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

  const handlePostAddressClick = () => {
    open({ onComplete: handlePostAddressComplete });
  };

  // Open the member management modal
  const handleMemberOpenModal = (): void => {
    // setShowModal(true);
    setMemberManagementModalOpen(true);
  };

  // 멤버 관리 모달 닫기
  // Close the member management modal
  const handleMemberCloseModal = (): void => {
    // setShowModal(false);
    setMemberManagementModalOpen(false);
  };

  // Handle customer selection in the left table
  const handleCustomerSelect = (customerId: number): void => {
    const isSelected = selectedCustomers.includes(customerId);

    if (isSelected) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  // function

  const onSubmit = (data: any) => {
    console.log("Submit Click!!!!!");
    console.log("formData ==>> ", data);

    let saveObj = {
      instUkey: data.instUkey,
      agncNm: data.agncNm,
      addr: data.addr,
      addrDetail: data.addrDetail,
      zip: data.zip,
      custDetailList: [],
      isSpecialMng: "Y",
      bsnsManagedByUkey: "user656014",
      memo: data.memo,
    };
    console.log("==saveObj", saveObj);

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc`; // Replace with your API URL

    axios
      .post(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          //router.push("/cust/cust-list/" + slug);
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  const handleSelectChangeBSMng = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedValue(event.target.value as number);
  };

  // 거래처 중복 확인
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
                          sx={{ width: 550 }}
                          register={register}
                          inputName="addr"
                          errorMessage={false}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          sx={{ width: 550 }}
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
            <LazyMemberTable />
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
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
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

          {/* 멤버 관리 모달 */}
          {getMemberManagementModalOpen && (
            <LazyMemberMngtModal
              onClose={handleMemberCloseModal}
              open={getMemberManagementModalOpen}
              modalWidth={1006}
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
