"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
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
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import { Box, DialogContent, Divider, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

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
    gender: "user369596",
  };

  return (
    <Box>
      <Typography variant={"title1"}>Dashboard Page.</Typography>
      <Stack direction={"row"} spacing={1}>
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

        {/*<Input name="testInput" />*/}
      </Stack>
      <Divider sx={{ mb: 5, mt: 5 }} />

      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <Typography sx={{ mb: 1 }}>Form Test</Typography>
        <Checkbox inputName="checkTest" labelText="체크박스" defaultValue="Y" />
        <br />
        <br />
        <Radio inputName="radioTest" labelText="국내" defaultValue="in" />
        <Radio inputName="radioTest" labelText="해외" defaultValue="out" />
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
