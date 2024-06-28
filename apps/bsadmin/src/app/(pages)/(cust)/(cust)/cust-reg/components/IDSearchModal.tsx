import React, { useState } from "react";
import {
  ContainedButton,
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent, Stack, Typography } from "@mui/material";
import { GET } from "api";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import ResultView from "./ResultView";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const IdSearchModal = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  const { setValue, clearErrors } = useFormContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailData, setEmailData] = useState({});

  const onSubmit = async (data) => {
    // console.log("계정찾기 값 ==>>", data);
    const { email } = data;
    setIsLoading(true);
    try {
      const response = await GET(`/cust/ebc/user/info/detail?email=${email}`); // API 요청
      console.log(response);
      if (response.success) {
        setEmailData(response.data);
        // setValue("ebcUid", response.data.ebcUid);
      } else if (!response.success) {
        setEmailData(response.data);
      } else {
        toast(response.message);
        // toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>계정 검색</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          id="emailSearchForm"
          defaultValues={undefined}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Typography variant="body2">EzBioCloud 계정 검색</Typography>
            <InputValidation
              inputName="email"
              required={true}
              errorMessage="이메일 형식이 아닙니다."
              placeholder="계정을 입력해주세요."
            />
          </Stack>
        </Form>

        <ResultView data={emailData} onClose={onClose} />
      </DialogContent>
      <ModalAction>
        <OutlinedButton
          buttonName="취소"
          onClick={handleClose}
          color="secondary"
          size="small"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="emailSearchForm"
          size="small"
        >
          찾기
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default IdSearchModal;
