import React, {useRef, useState} from "react";

import {
  ContainedButton,
  OutlinedButton,
  ModalAction,
  ModalContainer,
  ModalTitle,
  InputValidation,
  Form,
} from "cjbsDSTM";
import {
  DialogContent, Stack, Typography,
} from "@mui/material";
import TSPreview from "./components/TSPreview";
import ReactToPrint from "react-to-print";
import {useForm} from "react-hook-form";
import MyIcon from "icon/MyIcon";
import dayjs from "dayjs";

const PreviewModal = (props: any) => {
  const { open, onClose, modalWidth } = props;
  const ref = useRef();
  const methods = useForm();
  const {
    getValues,
    getFieldState,
    watch,
    formState: { errors, isDirty },
  } = methods;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Submit
  const onSubmit = async (data: any) => {
    console.log("data", data);

    const bodyData = {
      tdstTypeCc: data.tdstTypeCc, // 유형
      agncUkey: data.agncUkey,
      conm: data.conm,
      nm: data.nm,
      tel: data.tel,
      memo: data.memo,
      wdtDate: dayjs(data.wdtDate).format("YYYY-MM-DD"),
      bsnsMngrUkey: data.bsnsMngrUkey,
    };

    // const apiUrl: string = `/tdst`;
    // await POST(apiUrl, bodyData)
    //   .then((response) => {
    //     console.log("POST request successful:", response);
    //     if (response.success) {
    //       toast("등록 되었습니다.");
    //       setIsLoading(false);
    //       mutate(apiUrl);
    //       router.push("/ledger-ts-list");
    //     } else {
    //       toast(response.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("POST request failed:", error);
    //     // toast(error.)
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래명세서 발송</ModalTitle>
      <DialogContent sx={{p:0, borderBottom: '1px #000000 solid', borderTop: '1px #000000 solid'}}>
        <Stack direction="row" spacing={0} alignItems="flex-start" justifyContent="center">
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            <TSPreview ref={ref}/>
          </Stack>
          <Stack
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              width:'400px',
              height: '844px',
              backgroundColor: '#FFFFFF',
              border: 0,
              borderLeft: '1px #000000 solid',
              p: '16px'
            }}
          >
            <ReactToPrint
              trigger={() => <OutlinedButton buttonName="인쇄" startIcon={<MyIcon icon="printer" size={20} />}/>}
              content={() => ref.current}
            />
            <Form onSubmit={onSubmit}>
              <Stack spacing={1} alignItems="flex-start" justifyContent="center">
                <Typography variant="subtitle2">이메일 발송</Typography>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                  <Stack spacing={1} alignItems="center" justifyContent="center">
                    <InputValidation
                      inputName="email1"
                      fullWidth={true}
                      required={true}
                      errorMessage="이메일을 입력해 주세요."
                      placeholder="이메일을 입력해 주세요."
                      pattern={
                        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                      }
                      patternErrMsg="이메일 형식이 아닙니다."
                      sx={{width:'280px'}}
                    />
                    <InputValidation
                      inputName="email1"
                      fullWidth={true}
                      required={true}
                      errorMessage="이메일을 입력해 주세요."
                      placeholder="이메일을 입력해 주세요."
                      pattern={
                        /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
                      }
                      sx={{width:'280px'}}
                    />
                  </Stack>
                  <ContainedButton
                    buttonName="발송"
                    onClick={onClose}
                    sx={{height: '60px'}}
                    startIcon={<MyIcon icon="mail" size={20} />}
                  />
                </Stack>
                <Typography variant="subtitle2">거래명세서 다운로드</Typography>
                <ContainedButton
                  buttonName="거래명세서 다운로드"
                  color={"info"}
                  onClick={onClose}
                  fullWidth={true}
                  startIcon={<MyIcon icon="download" size={20} />}
                />
                <Typography variant="subtitle2">발송 상태로 변경</Typography>
                <ContainedButton
                  buttonName="발송 상태로 변경"
                  color={"success"}
                  onClick={onClose}
                  fullWidth={true}
                  startIcon={<MyIcon icon="lock" size={20} />}
                />
              </Stack>
            </Form>
          </Stack>
        </Stack>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default PreviewModal;