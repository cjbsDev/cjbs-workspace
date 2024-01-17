import React, { useState } from "react";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import { useParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";
import { PUT } from "api";
import { toast } from "react-toastify";
import {
  Form,
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
import AccountStatementInput from "../AccountStatementInput";
import { LoadingButton } from "@mui/lab";
import { useSWRConfig } from "swr";

const AdminPublishInfoModifyModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const router = useRouter();
  const invcUkey = params.slug;
  const { mutate } = useSWRConfig();

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const bodyData = {
      ...data,
      issuDttm: dayjs(data.issuDttm).format("YYYY-MM-DD"),
      invcUkey: invcUkey?.toString(),
    };

    console.log("PUT BODYDATA ==>>", bodyData);

    try {
      const res = await PUT(`/invc/issuedInfo`, bodyData);

      if (res.success) {
        console.log("SUCCESS", res);
        // router.push("/tax-invoice-list");
        mutate(`/invc/${invcUkey}`);
        onClose();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("폼 제출 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer
      onClose={onClose}
      open={open}
      modalWidth={modalWidth}
      overflowY="visible"
    >
      <ModalTitle onClose={onClose}>계산서 발행 정보 변경</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={undefined}
          id="accountStatementForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "35%" }}>발행일</TH>
                  <TD>
                    <SingleDatePicker
                      inputName="issuDttm"
                      required={true}
                      textAlign="end"
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>세금계산서 번호</TH>
                  <TD>
                    <AccountStatementInput />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Alert severity="error">
            세금계산서 발행 후에는 요청 내용을 수정할 수 없습니다. 발행 전에
            다시 한번 확인해 주세요.
          </Alert>
        </Form>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="accountStatementForm"
        >
          수정
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default AdminPublishInfoModifyModal;
