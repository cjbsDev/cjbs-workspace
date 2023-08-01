"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  AlertModal,
  CheckboxSV,
  CheckboxGV,
  ContainedButton,
  LinkButton,
  Form,
  RadioGV,
  SelectBox,
  OutlinedButton,
  InputValidation,
  ResetButton,
  XlargeButton,
  cjbsTheme,
} from "cjbsDSTM";
// Color
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import { useRouter } from "next-nprogress-bar";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import ShowBox from "./ShowBox";
import ColorBox from "./ColorBox";
import MyIcon from "icon/myIcon";

const dataRadioGVTest = [
  { value: "Y", optionName: "요청함" },
  { value: "N", optionName: "요청안함" },
];

const CodeBoxPage = () => {
  const router = useRouter();
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [log, setLog] = useState<string>("Send Form Value...");
  const { register, setValue } = useForm();

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
    // radioTest: "in",
    // checkTest: ["Y", "Nbb"],
    // inputTest: "defaultTextValue",
    // gender: "user623719",
    testRadioGV: "Y",
  };

  return (
    <Box>
      <Typography variant="h1">Component Review</Typography>
      <br />
      <br />
      <Typography variant="h1">H1</Typography>
      <Typography variant="h2">H2</Typography>
      <Typography variant="h3">H3</Typography>
      <Typography variant="h4">H4</Typography>
      <Typography variant="h5">H5</Typography>
      <Typography variant="h6">H6</Typography>
      <Typography variant="subtitle1">Subtitle1</Typography>
      <Typography variant="subtitle2">Subtitle2</Typography>
      <Typography variant="body1">Body1</Typography>
      <Typography variant="body2">Body2</Typography>

      <Divider sx={{ mb: 5, mt: 5 }} />

      <Typography variant="h4">Link & Router</Typography>
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

      <Typography variant="h4">Button</Typography>
      <Box sx={{ "& button": { m: 1 } }}>
        <Box>
          <OutlinedButton
            buttonName="Small"
            size="small"
            sx={{ color: blue[400] }}
          />
          <OutlinedButton buttonName="Medium" />
          <OutlinedButton buttonName="Large" size="large" />
          <XlargeButton buttonName="Xlarge" variant="outlined" />
        </Box>
        <Box>
          <ContainedButton buttonName="Small" size="small" />
          <ContainedButton buttonName="Medium" />
          <ContainedButton
            buttonName="Large"
            size="large"
            sx={{ backgroundColor: cjbsTheme.palette.text.primary }}
          />
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

      <ColorBox />
      <Divider sx={{ mb: 5, mt: 5 }} />
      {/*
        <Form key={formKey} 페이지가 다른 기본 값(defaultValues)으로 여러 번 구동 될 때 데이터가 제대로 다시 렌더링 안될 때 key prop 활용가능
        이 키는 기본값이 변경될 때마다 업데이트 필요.
        키를 업데이트하면 React는 키를 다른 구성 요소 인스턴스로 인식하고 다시 렌더링을 트리거하여 새 기본값을 효과적으로 적용합니다.
      */}
      <Typography sx={{ mb: 1, color: blue["800"] }} variant="h4">
        Form & Validation
      </Typography>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>
        <CheckboxSV inputName="checkTest" labelText="체크박스1" value="Y" />
        <CheckboxSV inputName="checkTest" labelText="체크박스2" value="Naa" />
        <CheckboxSV inputName="checkTest" labelText="체크박스3" value="Nbb" />
        <CheckboxSV inputName="checkTest" labelText="체크박스4" value="Ycc" />
        <ShowBox />
        <br />
        <br />
        <CheckboxGV
          data={dataRadioGVTest}
          inputName="checkGVTest"
          required={true}
          errorMessage="checkbox requied!!"
        />
        <br />
        <br />
        {/*/!*Deprecated*!/*/}
        {/*<Typography variant="subtitle1" sx={{ color: red["600"] }}>*/}
        {/*  !Deprecated*/}
        {/*</Typography>*/}
        {/*<RadioSV inputName="radioTest" labelText="국내" value="in" />*/}
        {/*<RadioSV inputName="radioTest" labelText="해외" value="out" />*/}
        {/*<br />*/}
        {/*<br />*/}
        <Typography variant="subtitle1" sx={{ color: green["200"] }}>
          !New RadioGV(Group Validation)
        </Typography>
        <RadioGV
          data={dataRadioGVTest}
          inputName="testRadioGV"
          required={true}
          errorMessage="에러메세지는 여기에"
        />
        <br />
        <br />
        <Typography variant="body1">height 40</Typography>
        <InputValidation
          required={true}
          inputName="sampleCnt"
          errorMessage="샘플개수를 입력하세요."
          pattern={/^[0-9]+$/}
          patternErrMsg="숫자만 입력 하세요."
          sx={{ width: 100 }}
          inputProps={{
            style: {
              height: 40,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2" sx={{ color: "black" }}>
                  개
                </Typography>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <InputValidation inputName="agncNm" sx={{ width: 100 }} />
        <br />
        <br />
        <InputValidation
          inputName="agncNm"
          sx={{ width: 100 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MyIcon icon="share-fill" size={18} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <MyIcon icon="eye-fill" size={18} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <br />
        <br />
        <SelectBox
          required={true}
          errorMessage="값을 선택해 주세요."
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
      <Typography sx={{ mb: 1, color: blue["800"] }} variant="h4">
        Modal
      </Typography>
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

export default CodeBoxPage;
