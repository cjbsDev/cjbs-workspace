"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  AlertModal,
  Checkbox,
  ContainedButton,
  LinkButton,
  Form,
  Radio,
  SelectBox,
  OutlinedButton,
  InputValidation,
  ResetButton,
  XlargeButton,
} from "cjbsDSTM";
// import { useRouter } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { Box, DialogContent, Divider, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ShowBox from "./ShowBox";

const ListDashboardPage = () => {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string>("Send Form Value...");

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setLog(data);

    // setFormData(data);
  };

  const defaultValues = {
    radioTest: "in",
    checkTest: "Y",
    inputTest: "defaultTextValue",
    gender: "user623719",
  };

  return (
    <Box>
      <Typography variant={"title1"}>Dashboard Page.</Typography>
      <Stack direction={"row"} spacing={1}>
        <Link href="/cust/cust-list">고객관리</Link>
        <Link href="/cust/agnc-pi-add">거래처(PI) 등록</Link>
        <LinkButton
          buttonName="고객관리"
          onClick={() => router.push("/cust/cust-list")}
        />
        <LinkButton
          buttonName="주문"
          onClick={() => router.push("/order/order-list")}
        />
        <LinkButton
          buttonName="거래처(PI) 등록"
          onClick={() => router.push("/cust/agnc-pi-add")}
        />
      </Stack>
      <Divider sx={{ mb: 5, mt: 5 }} />

      <Box sx={{ "& button": { m: 1 } }}>
        <Box>
          <OutlinedButton buttonName="Small" size="small" />
          <OutlinedButton buttonName="Medium" />
          <OutlinedButton buttonName="Large" size="large" color="neutral" />
          <XlargeButton buttonName="Xlarge" variant="outlined" color="error" />
        </Box>
        <Box>
          <ContainedButton buttonName="Small" size="small" color="neutral" />
          <ContainedButton buttonName="Medium" color="danger" />
          <ContainedButton buttonName="Large" size="large" />
          <XlargeButton buttonName="Xlarge" variant="contained" />
        </Box>
        <Box>
          <LinkButton buttonName="Small" size="small" />
          <LinkButton buttonName="Medium" />
          <LinkButton buttonName="Large" size="large" />
          <XlargeButton buttonName="Xlarge" variant="text" />
        </Box>
      </Box>

      <Divider sx={{ mb: 5, mt: 5 }} />

      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Typography sx={{ mb: 1 }}>Form Test</Typography>
        <Checkbox inputName="checkTest" labelText="체크박스1" value="Y" />
        <Checkbox inputName="checkTest" labelText="체크박스2" value="N" />
        <ShowBox />
        <br />
        <br />
        <Radio inputName="radioTest" labelText="국내" value="in" />
        <Radio inputName="radioTest" labelText="해외" value="out" />
        <br />
        <br />
        <InputValidation inputName="inputTest" errorMessage={false} />
        <br />
        <br />
        <InputValidation
          inputName="agncNm"
          errorMessage="거래처(PI)를 입력해 주세요."
        />

        <br />
        <br />
        <SelectBox
          inputName="gender"
          options={[
            { value: "user656014", optionName: "키웨스트" },
            { value: "user483349", optionName: "라이언" },
            { value: "user369596", optionName: "모씨" },
            { value: "user809094", optionName: "LINK" },
            { value: "user623719", optionName: "코로그" },
          ]}
        />
        <br />
        <br />
        <Stack direction="row" spacing={1}>
          <OutlinedButton buttonName="Send" type="submit" />
          <ResetButton buttonName="Reset" variant="contained" />
          {/* defaultValues가 있으면 defaultValues로 reset됨! */}
        </Stack>
      </Form>
      <div>{JSON.stringify(log)}</div>

      <Divider sx={{ mb: 5, mt: 5 }} />
      <ContainedButton
        buttonName="Alert"
        onClick={handleAlertOpen}
        color="error"
      />
      <AlertModal
        alertBtnName="삭제"
        alertMainFunc={handleAlertClose}
        onClose={handleAlertClose}
        open={alertModalOpen}
        mainMessage={
          "거래처(PI)를 삭제하면 거래처(PI) 구성원에서도 제외됩니다."
        }
        subMessage={"삭제를 진행하시겠습니까?"}
      />
    </Box>
  );
};

export default ListDashboardPage;
