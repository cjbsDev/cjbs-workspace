import React, { useState } from "react";
import {
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Alert,
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { POST, PUT } from "api";
import { toast } from "react-toastify";

const Index = ({ onClose, open, modalWidth }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const defaultValues = undefined;

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const reqBody = {};

    // try {
    //   const res = await PUT(`/invc/${invcUkey}/report`, reqBody);
    //
    //   if (res.success) {
    //     console.log("SUCCESS", res);
    //     onClose();
    //     router.push("/ledger-tax-invoice-list");
    //   } else {
    //     toast.error(res.message);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form", error);
    //   toast.error("발행 중 오류가 발생했습니다.");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <ModalContainer
      onClose={onClose}
      open={open}
      modalWidth={modalWidth}
      overflowY="visible"
    >
      <ModalTitle onClose={onClose}>보고서</ModalTitle>
      <DialogContent>
        {/*<ErrorContainer FallbackComponent={Fallback}>*/}
        {/*  <LazyAccountStatementForm onSubmit={onSubmit} />*/}
        {/*</ErrorContainer>*/}
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="reportModifyForm"
        >
          <TableContainer sx={{ mb: 1 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "35%" }}>보고서</TH>
                  <TD>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={4}
                      inputName="memo"
                      placeholder="메모"
                      maxLength={500}
                      maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="reportModifyForm"
        >
          수정
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
