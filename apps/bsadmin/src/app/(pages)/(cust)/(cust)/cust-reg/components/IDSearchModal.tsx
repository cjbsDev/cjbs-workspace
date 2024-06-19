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
import {
  Box,
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { GET } from "api";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const IdSearchModal = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  const { setValue } = useFormContext();
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

  const handleSetValues = (emailData) => {
    setValue("ebcUid", emailData.ebcUid);
    setValue("ebcEmail", emailData.ebcEmail);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>계정 검색</ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} id="emailSearchForm">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">EzBioCloud 계정 검색</Typography>
            <InputValidation
              inputName="email"
              required={true}
              errorMessage="이메일 형식이 아닙니다."
              placeholder="계정을 입력하세요."
            />
            {/*<ContainedButton*/}
            {/*  buttonName="검색"*/}
            {/*  size="small"*/}
            {/*  onClick={handleEmailSearch}*/}
            {/*/>*/}
          </Stack>
        </Form>

        <Typography>검색결과</Typography>

        {emailData !== "NO_DATA" ? (
          <Box>
            <TableContainer>
              <Table size="small" dense>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>이름</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography>{emailData.ebcEmail}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{emailData.ebcFullNm}</Typography>
                    </TableCell>
                    <TableCell>
                      <ContainedButton
                        buttonName="선택"
                        size="small"
                        onClick={() => handleSetValues(emailData)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Stack direction="row" spacing={1} alignItems="center"></Stack>
          </Box>
        ) : (
          <Box>{JSON.stringify(emailData)}</Box>
        )}
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
