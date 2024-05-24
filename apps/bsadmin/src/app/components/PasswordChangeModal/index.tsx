import React, { useState } from "react";
import {
  DataTableBase,
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
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../NoDataView";
import { LoadingButton } from "@mui/lab";
import { ModalContainerProps } from "../../types/modal-container-props";
import dayjs from "dayjs";
import { POST } from "api";

const Index = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("onSubmit DATA ==>", data);

    if (data.rcptDttm === undefined) {
      setIsLoading(false);
    }

    const convertedDate = dayjs(data.rcptDttm).format("YYYY-MM-DD");

    const reqBody = {
      // kitMc: data.kitMc,
      // machineMc: data.mcNmCc,
      // memo: data.memo,
      // runDttm: convertedDate,
      // runMngrUkey: data.runMngrUkey,
      // runType: data.runType,
      // seqAgncMc: data.prgrAgncNmCc,
    };

    console.log("BODYDATA ==>", reqBody);

    await POST(apiUrl, reqBody)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          // mutate(`/order/${orderUkey}`);
          mutate(`/run/list?page=1&size=20`);
          handleClose();
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      });
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>RUN 등록</ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} id="passwordChangeForm">
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH>RUN 타입</TH>
                  <TD></TD>
                </TableRow>
                <TableRow>
                  <TH>장비</TH>
                  <TD></TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Form>
      </DialogContent>
      <ModalAction>
        <OutlinedButton
          buttonName="취소"
          onClick={handleClose}
          color="secondary"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="passwordChangeForm"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
