"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { POST } from "api";
import { toast } from "react-toastify";
import {
  ContainedButton,
  Form,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  RadioGV,
  SelectBox,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";
import BusinessNumberRow from "./BusinessNumberRow";
import InstAddRow from "./InstAddRow";
import AddressRow from "./AddressRow";
import RegionRow from "./RegionRow";

// const LazyRegion1 = dynamic(
//   () => import("../../../../../components/Region/Region1"),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// );

const dataRadioGVstatusCodeCc = [
  { value: "BS_0602001", optionName: "운영" },
  { value: "BS_0602002", optionName: "폐업" },
];
const dataRadioGVlctnTypeCcCodeCc = [
  { value: "BS_0200002", optionName: "국내" },
  { value: "BS_0200001", optionName: "해외" },
];

const RegForm = () => {
  const router = useRouter();
  const defaultValues = {
    lctnTypeCc: "BS_0200002", // 국내
    region1Gc: "11000", // 서울
    region1GcOverseas: "",
    statusCodeCc: "BS_0602001", // 운영
  };

  const onSubmit = async (data: any) => {
    let saveObj = {
      ...data,
      zip: data.zip ?? "",
      addr: data.addr ?? "",
      addrDetail: data.addrDetail ?? "",
      itbsns: data.itbsns ?? "",
      tpbsns: data.tpbsns ?? "",
      region1Gc:
        data.lctnTypeCc === "BS_0200001"
          ? data.region1GcOverseas
          : data.region1Gc,
      region2Gc: data.lctnTypeCc === "BS_0200001" ? null : data.lctnTypeCc,
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
      toast(error?.message);
    } finally {
    }
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
                {/*국내,해외*/}
                <RadioGV
                  data={dataRadioGVlctnTypeCcCodeCc}
                  inputName="lctnTypeCc"
                  required={true}
                  errorMessage="필수 선택입니다."
                />
              </TD>
            </TableRow>

            <InstAddRow />

            <BusinessNumberRow />

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
              <TH sx={{ width: "15%" }}>
                업태<NotRequired>[선택]</NotRequired>
              </TH>
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
              <TH sx={{ width: "15%" }}>
                업종<NotRequired>[선택]</NotRequired>
              </TH>
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

            <AddressRow />

            <RegionRow />

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
              <TH sx={{ width: "15%" }}>
                특성<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="ftr"
                    // required={true}
                    // errorMessage="특성은 필수 값입니다."
                    placeholder="20자 이내로 입력해주세요."
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
          <OutlinedButton buttonName="목록" size="small" />
        </Link>

        <ContainedButton type="submit" buttonName="저장" size="small" />
      </Stack>
    </Form>
  );
};

export default RegForm;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));