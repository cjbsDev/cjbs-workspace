"use client";

import dynamic from "next/dynamic";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  Form,
  InputValidation,
  OutlinedButton,
  PostCodeBtn,
  TD,
  TH,
  Title1,
  // Checkbox,
} from "cjbsDSTM";
import * as React from "react";
import { useForm } from "react-hook-form";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";

const LazyCustSearchModal = dynamic(
  () => import("../../../components/CustSearchModal"),
  {
    ssr: false,
  }
);
export default function Page() {
  const router = useRouter();
  // [고객 검색] 모달
  const [custSearchModalOpen, setCustSearchModalOpen] =
    React.useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = undefined;
  const methods = useForm();
  const {
    setValue,
    formState: { errors },
  } = methods;

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("<><><>", event.target.checked);
    setChecked(event.target.checked);
    const chk = event.target.checked;

    setValue("ordrRcpnNm", "testNm");
    // setValue("ordrRcpnEmail", "sdfsdf@test.com");
    // setValue("ordrRcpnTel", "01078785454");

    // chk ? quickInfo() : null;
    quickInfo();
  };

  const quickInfo = () => {
    console.log("$%$%$%$%$%");
    setValue("ordrRcpnNm", "testNm");
    // setValue("ordrRcpnEmail", "sdfsdf@test.com");
    // setValue("ordrRcpnTel", "01078785454");
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Submit Data ==>>", data);

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/order/extr`; // Replace with your API URL

    const bodyData = {
      addEmailList: "string",
      agncUkey: "string",
      anlsTypeMc: "string",
      custUkey: data.custUkey,
      isAgncLeaderRcpn: "N",
      isCheck16s: "N",
      isEtcRcpn: "N",
      isFastTrack: "N",
      isOrdrRcpn: "N",
      isReqReturnDna: "N",
      isReqReturnSample: "N",
      memo: "string",
      orderTypeCc: "string",
      ordrRcpnEmail: "string",
      ordrRcpnNm: "string",
      ordrRcpnTel: "string",
      platformMc: "string",
      price: 0,
      sampleCnt: 0,
      srvcTypeMc: "string",
      taxonACnt: 0,
      taxonBCnt: 0,
      taxonECnt: 0,
      userUkey: "string",
    };

    // await axios
    //   .post(apiUrl, bodyData)
    //   .then((response) => {
    //     console.log("PUT request successful:", response.data);
    //     if (response.data.success) {
    //       router.push("/order/order-list");
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("POST request failed:", error);
    //   });
  };
  // [ 고객 검색 ] 모달 오픈
  const handleCustSearchModalOpen = () => {
    setCustSearchModalOpen(true);
  };
  // [ 고객 검색 ] 모달 닫기
  const handleCustSearchModalClose = () => {
    setCustSearchModalOpen(false);
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="오더 등록" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
        연구책임자 정보
      </Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디(이메일)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    inputName="ebcEmail"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <InputValidation
                    // disabled={true}
                    sx={{ display: "none" }}
                    inputName="custUkey"
                    errorMessage="필수 값입니다."
                    InputProps={{
                      readOnly: true,
                    }}
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
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    inputName="custNm"
                    errorMessage="연구책임자를 선택해주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>소속 거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <InputValidation
                    inputName="agncNm"
                    errorMessage="거래처(PI)를 입력해 주세요."
                    sx={{ width: 600 }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1" sx={{ mt: 5, mb: 1 }}>
        신청인 정보
      </Typography>

      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Label"
      />

      <ContainedButton
        buttonName="sssss"
        onClick={() => setValue("ordrRcpnNm", "sssdfsdfjj")}
      />
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                <Stack direction="row" spacing={0.5} alignItems="flex-start">
                  <InputValidation
                    // disabled={true}
                    inputName="ordrRcpnNm"
                    errorMessage="이름을 입력해주세요."
                    sx={{ width: 600 }}
                  />
                </Stack>
              </TD>
            </TableRow>
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>이메일</TH>*/}
            {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
            {/*    <Stack direction="row" spacing={0.5} alignItems="flex-start">*/}
            {/*      <InputValidation*/}
            {/*        inputName="ordrRcpnEmail"*/}
            {/*        errorMessage="연구책임자를 선택해주세요."*/}
            {/*        sx={{ width: 600 }}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
            {/*<TableRow>*/}
            {/*  <TH sx={{ width: "15%" }}>연락처</TH>*/}
            {/*  <TD sx={{ width: "85%" }} colSpan={5}>*/}
            {/*    <Stack direction="row" spacing={0.5} alignItems="center">*/}
            {/*      <InputValidation*/}
            {/*        inputName="ordrRcpnTel"*/}
            {/*        errorMessage="거래처(PI)를 입력해 주세요."*/}
            {/*        sx={{ width: 600 }}*/}
            {/*      />*/}
            {/*    </Stack>*/}
            {/*  </TD>*/}
            {/*</TableRow>*/}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/agnc-pi-list")}
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

      {/* 고객 검색 모달*/}
      <LazyCustSearchModal
        onClose={handleCustSearchModalClose}
        open={custSearchModalOpen}
        modalWidth={800}
      />
    </Form>
  );
}
