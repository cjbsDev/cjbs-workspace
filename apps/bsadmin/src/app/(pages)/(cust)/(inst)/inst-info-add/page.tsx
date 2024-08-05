"use client";
import React from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  InputValidation,
  PostCodeBtn,
  SelectBox,
  RadioGV,
  Form,
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
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import BusinessNumber from "../../../../components/NumberFormat/BusinessNumber";
import Link from "next/link";
import { POST } from "api";
import InstAddRow from "./components/InstAddRow";
import { toast } from "react-toastify";

// 거래처에서 기관 모달과 다름
// const LazyInstAddSearchModal = dynamic(() => import("../InstAddSearchModal"), {
//   ssr: false,
// });

const LazyRegion1 = dynamic(
  () => import("../../../../components/Region/Region1"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const dataRadioGVstatusCodeCc = [
  { value: "BS_0602001", optionName: "운영" },
  { value: "BS_0602002", optionName: "폐업" },
];

// 기관 등록
const InstAddPage = () => {
  const router = useRouter();
  const defaultValues = {
    region1Gc: "11000", // 서울
    statusCodeCc: "BS_0602001", // 운영
  };

  // [기관 검색] 모달
  // const [showAgncSearchModal, setShowAgncSearchModal] =
  //   useState<boolean>(false);

  // [ 기관 검색 ] 모달 오픈
  // const agncSearchModalOpen = () => {
  //   setShowAgncSearchModal(true);
  // };

  // [ 기관 검색 ] 모달 닫기
  // const agncSearchModalClose = () => {
  //   setShowAgncSearchModal(false);
  // };

  // Common
  // [ 등록 ]
  const onSubmit = async (data: any) => {
    let saveObj = {
      ...data,
      zip: data.zip ?? "",
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      itbsns: data.itbsns ?? "",
      tpbsns: data.tpbsns ?? "",
      lctnTypeCc: "BS_0200002", // 국내

      // brno: data.brno,
      // ftr: data.ftr,
      // instTypeCc: data.instTypeCc,
      // instUniqueCodeMc: data.instUniqueCodeMc,
      // region1Gc: data.region1Gc,
      // region2Gc: data.region2Gc,
      // rprsNm: data.rprsNm,
      // statusCodeCc: data.statusCodeCc,
    };

    console.log("SAVE ==>>", saveObj);
    // console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `/inst`; // Replace with your API URL

    try {
      const response = await POST(apiUrl, saveObj); // API 요청
      // setIsLoading(false);
      if (response.success) {
        router.push("/inst-info-list");
      } else {
        toast(response.message);
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    } finally {
    }

    // await POST(apiUrl, saveObj)
    //   .then((response) => {
    //     console.log("등록 successful:", response.data);
    //     if (response.data.success) {
    //       router.push("/inst-info-list");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("등록 failed:", error);
    //   });

    // axios
    //   .post(apiUrl, saveObj)
    //   .then((response) => {
    //     console.log("등록 successful:", response.data);
    //     if (response.data.success) {
    //       router.push("/inst-info-list");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("등록 failed:", error);
    //   });
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="기관 등록" />
      </Box>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>위치</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                국내
              </TD>
            </TableRow>

            <InstAddRow />

            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>기관명</TH>*/}
            {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
            {/*    <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
            {/*      <InputValidation*/}
            {/*        inputName="instNm"*/}
            {/*        disabled={true}*/}
            {/*        required={true}*/}
            {/*        errorMessage="소속기관을 선택해 주세요."*/}
            {/*        placeholder="기관명"*/}
            {/*        sx={{ width: 600 }}*/}
            {/*      />*/}

            {/*      <OutlinedButton*/}
            {/*        size="small"*/}
            {/*        buttonName="기관 검색"*/}
            {/*        // onClick={agncSearchModalOpen}*/}
            {/*        onClick={openPopup}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            <TableRow>
              <TH sx={{ width: "15%" }}>사업자 등록번호</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <Box sx={{ width: 113 }}>
                    <BusinessNumber />
                  </Box>
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>대표자</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="rprsNm"
                    required={true}
                    pattern={/^[A-Za-z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s()-]*$/}
                    patternErrMsg="이름은 한글 또는 영문으로 20자리 이내로 입력해주세요."
                    errorMessage="대표자명은 필수 입력입니다."
                    minLength={2}
                    minLengthErrMsg="최소 2자 이상 입력해주세요."
                    maxLength={50}
                    maxLengthErrMsg="50자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>업태 [선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="itbsns"
                    maxLength={50}
                    maxLengthErrMsg="50자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>업종 [선택]</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="tpbsns"
                    maxLength={20}
                    maxLengthErrMsg="20자 이내로 입력해주세요."
                    sx={{ width: 600 }}
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
                      placeholder="우편번호"
                      sx={{ width: 147 }}
                    />
                    <PostCodeBtn />
                  </Stack>
                  <Stack direction="row" spacing={0.5}>
                    <InputValidation
                      disabled={true}
                      sx={{ width: 600 }}
                      inputName="addr"
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
              <TH sx={{ width: "15%" }}>지역</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <LazyRegion1 />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>분류</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <SelectBox
                    inputName="instTypeCc"
                    options={[
                      { value: "BS_0600004", optionName: "기관" },
                      { value: "BS_0600001", optionName: "학교" },
                      { value: "BS_0600002", optionName: "병원" },
                      { value: "BS_0600003", optionName: "기업" },
                      { value: "BS_0600005", optionName: "기타" },
                    ]}
                    defaultOption={false}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>특성</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="ftr"
                    // required={true}
                    // errorMessage="특성은 필수 값입니다."
                    maxLength={20}
                    maxLengthErrMsg="20자 이내로 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {/* 운영, 폐업 */}
                <RadioGV
                  data={dataRadioGVstatusCodeCc}
                  inputName="statusCodeCc"
                  required={true}
                  errorMessage="필수 선택입니다."
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/inst-info-list">
          <OutlinedButton buttonName="목록" />
        </Link>

        <ContainedButton type="submit" buttonName="저장" />
      </Stack>
    </Form>
  );
};

export default InstAddPage;
