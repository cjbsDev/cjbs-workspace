import React, {useEffect, useRef, useState} from "react";

import {
  ContainedButton,
  OutlinedButton,
  ModalAction,
  ModalContainer,
  ModalTitle,
  InputValidation,
  Form, cjbsTheme, ConfirmModal,
} from "cjbsDSTM";
import {
  DialogContent, Stack, TextField, Typography,
} from "@mui/material";
import TSPreview from "./components/TSPreview";
import ReactToPrint from "react-to-print";
import {useFormContext} from "react-hook-form";
import MyIcon from "icon/MyIcon";
import dayjs from "dayjs";
import {PUT_MULTIPART, PUT_BLOB} from "api";
import {toast} from "react-toastify";
import {useSWRConfig} from "swr";
import {useParams} from "next/navigation";
import html2canvas from "html2canvas";
import FileSaver from "file-saver";
import {useRouter} from "next-nprogress-bar";
import TSImgPreview from "./components/TSImgPreview";
import InputAdornment from "@mui/material/InputAdornment";


const PreviewModal = (props: any) => {
  const { open, onClose, modalWidth, wdtDate, conm, nm, resendType } = props;
  const ref = useRef();
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const params = useParams();
  const { slug } = params;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email1ValidBoolean, setEmail1ValidBoolean] = useState(true);
  const [email2ValidBoolean, setEmail2ValidBoolean] = useState(true);
  const [email1, setEmail1] = useState<String>('');
  const [email2, setEmail2] = useState<String>('');
  const [btnType, setBtnType] = useState<String>('');
  const [confirmStr, setConfirmStr] = useState<String>('');
  const [confirmSubStr, setConfirmSubStr] = useState<String>('');
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  // console.log("resendType", resendType);
  console.log("email1ValidBoolean", email1ValidBoolean);
  console.log("email2ValidBoolean", email2ValidBoolean);
  console.log("file name ==>>", `견적서_[${conm}_(${nm})]_${wdtDate}.png`);

  const handleAlertOpen = (type: string) => {
    setBtnType(type);
    if(type === 'email') {
      setConfirmStr("입력하신 메일 주소로 견적서(이미지) 파일을 첨부하여 발송합니다.\n");
      setConfirmSubStr("메일로 견적서를 발송 하시겠습니까?\n");
    } else if (type === 'download') {
      setConfirmStr("견적서(이미지)를 다운로드하면 해당 견적서는 발송 처리 상태로 변경됩니다.");
      setConfirmSubStr(" 견적서(이미지)를 다운로드 하시겠습니까?\n");
    } else if (type === 'send') {
      setConfirmStr("견적서를 발송 처리 상태로 변경합니다.\n");
      setConfirmSubStr("견적서를 발송 처리하시겠습니까?\n");
    }
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const changeText1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setEmail1(event.target.value);
    console.log(emailValidCheck(event.target.value));
    setEmail1ValidBoolean(emailValidCheck(event.target.value));
  };
  const changeText2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setEmail2(event.target.value);
    console.log(emailValidCheck(event.target.value));
    setEmail2ValidBoolean(emailValidCheck(event.target.value));
  };

  const emailValidCheck = (textData:string) => {
    // console.log(textData);
    if(textData.trim() === '') {return true}
    const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(textData);
  }

  // Submit
  const onSubmit = async (sendType:string) => {
    handleAlertClose();
    setIsLoading(true);
    console.log("sendType ==>>", sendType);
    // console.log("wdtDate ==>>", wdtDate);


    // 버튼에 따른 apiurl 변경처리
    let apiUrl = '';
    if(sendType === 'email') {
      if(email1 === '') {
        toast("첫 번째 이메일은 필수 입니다.");

        return false;
      } else if (!email1ValidBoolean || !email2ValidBoolean) {
        toast("이메일 주소를 확인해 주세요!");
        return false;
      }
      const sendEmail1 = email1;
      const sendEmail2 = email2;
      let sendEmailList = sendEmail1;
      if(sendEmail2 !== undefined && sendEmail2 !== '') {
        sendEmailList = sendEmailList+","+sendEmail2;
      }
      apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/qttn/email/${slug}?tdstUkey=${slug}&rcvEmail=${sendEmailList}&from=yangkyu.choi@cj.net`;

    } else if (sendType === 'download') {
      apiUrl = `/qttn/download/intn/${slug}?tdstUkey=${slug}`;

    } else if (sendType === 'send') {
      apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/qttn/send/${slug}?tdstUkey=${slug}`;

    }
    console.log("apiUrl=" + apiUrl);
    const formData = new FormData();
    // 재발송일때는 이미지를 보내지 않는다.
    if(resendType === 'N') {
      // image capture 부분
      const canvas = await html2canvas(ref.current, {
        scale: 1,
        width: 773,
        height: 1094
      });
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL();
      // Create a Blob from the data URL
      const blob = await fetch(dataURL).then((res) => res.blob());
      // FileSaver.saveAs(blob, 'test.png');
      // console.log(typeof data.uploadFile);
      formData.append("file-data", blob, `견적서_${wdtDate}_${conm}_${nm}.png`);
      console.log("BODYDATAFORM ==>>", formData);
    }

    try {

      if(sendType === 'email' || sendType === 'send') { // 발송, 상태변경 버튼 클릭시
        const response = await PUT_MULTIPART(apiUrl, formData); // API 요청
        console.log("response", response);
        if (response.data.success) {
          mutate(`/qttn-list/${slug}`);
          router.push(`/qttn-list`);
          onClose();
          toast("발송 되었습니다.");
        } else if (response.data.code === "TRADING_STATEMENT_NOT_EXIST" || response.data.code === "TRADING_STATEMENT_PDF_NOT_EXIST") {
          toast(response.data.message);
        } else {
          toast("문제가 발생했습니다.");
        }

      } else if (sendType === 'download') { // 다운로드 버튼 클릭시
        const response = await PUT_BLOB(apiUrl, formData);
        if (response.status === 200) {
          console.log("response", response);
          const disposition = response.headers["content-disposition"];
          const resFileName = decodeURI(
            disposition
              .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
              .replace(/['"]/g, "")
          );
          console.log("resFileName", resFileName);
          FileSaver.saveAs(response.data, resFileName);
          mutate(`/qttn-list/${slug}`);
          router.push(`/qttn-list`);
          onClose();

        } else {
          throw new Error("File download failed");
        }
      }

    } catch (error) {
      console.error("request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>견적서 발송</ModalTitle>
      <DialogContent sx={{p:0, borderBottom: '1px #000000 solid', borderTop: '1px #000000 solid'}}>
        <Stack direction="row" spacing={0} alignItems="flex-start" justifyContent="center">
          <Stack
            spacing={1}
            alignItems="center"
            justifyContent="center"
          >
            {resendType === 'N' ? (
              <TSPreview ref={ref}/>
            ) : (
              <TSImgPreview ref={ref}/>
            )}

          </Stack>
          <Stack
            spacing={2}
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              width:'400px',
              height: '1094px',
              backgroundColor: '#FFFFFF',
              border: 0,
              borderLeft: '1px #000000 solid',
              p: '16px'
            }}
          >
            {resendType === 'Y' && (
              <ReactToPrint
                trigger={() => <OutlinedButton buttonName="인쇄" startIcon={<MyIcon icon="printer" size={20} />}/>}
                content={() => ref.current}
              />
            )}
            <Stack spacing={1} alignItems="flex-start" justifyContent="center">
              <Typography variant="subtitle2">이메일 발송</Typography>
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                <Stack spacing={1} alignItems="center" justifyContent="center">
                  <TextField
                    size="small"
                    sx={{width: '290px'}}
                    onKeyUp={changeText1}
                    error={ !email1ValidBoolean }
                  />
                  { !email1ValidBoolean && (
                    <Typography variant="body2" sx={{ color: cjbsTheme.palette.error.main }}>
                      이메일 형식이 아닙니다.
                    </Typography>
                  )}
                  <TextField
                    size="small"
                    sx={{width: '290px'}}
                    onKeyUp={changeText2}
                    error={ !email2ValidBoolean }
                  />
                  { !email2ValidBoolean && (
                      <Typography variant="body2" sx={{ color: cjbsTheme.palette.error.main }}>
                        이메일 형식이 아닙니다.
                      </Typography>
                  )}
                </Stack>
                <ContainedButton
                  buttonName="발송"
                  onClick={() => handleAlertOpen('email')}
                  sx={{height: '60px'}}
                  startIcon={<MyIcon icon="mail" size={20} />}
                />
              </Stack>
              <Typography variant="subtitle2">거래명세서 다운로드</Typography>
              <ContainedButton
                buttonName="거래명세서 다운로드"
                color={"info"}
                onClick={() => handleAlertOpen('download')}
                fullWidth={true}
                startIcon={<MyIcon icon="download" size={20} />}
              />
              {resendType === 'N' && (
                <>
                  <Typography variant="subtitle2">발송 상태로 변경</Typography>
                  <ContainedButton
                    buttonName="발송 상태로 변경"
                    color={"success"}
                    onClick={() => handleAlertOpen('send')}
                    fullWidth={true}
                    startIcon={<MyIcon icon="lock" size={20} />}
                  />
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
        <ConfirmModal
          alertBtnName="확인"
          alertMainFunc={() => {
            onSubmit(btnType);
          }}
          onClose={handleAlertClose}
          open={alertModalOpen}
          mainMessage={ confirmStr }
          subMessage={ confirmSubStr }
        />
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default PreviewModal;