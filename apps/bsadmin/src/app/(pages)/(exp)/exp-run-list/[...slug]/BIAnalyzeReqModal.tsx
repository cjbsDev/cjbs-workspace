import React, { useState } from "react";
import {
  InputValidation,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  TD,
  TH,
  Form,
  ModalAction,
  SingleDatePicker,
  Fallback,
  ErrorContainer,
  cjbsTheme,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  DialogContent,
  styled,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  TableFooter,
} from "@mui/material";
import { ModalContainerProps } from "../../../../types/modal-container-props";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, POST } from "api";
import { useParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";

const RunAddModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const router = useRouter();
  const params = useParams();
  const uKey = params.slug;
  const apiUrl = "/run/add/";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  console.log("RunUkey Value ==>>", uKey.toString());

  const { data } = useSWR(`/run/${uKey}/bi`, fetcher, {
    suspense: true,
  });

  console.log("BI 분석 요청 ==>>", data);
  const totalSampleCnt = data.reduce((acc, order) => acc + order.sampleCnt, 0);
  const orderUkeyArray = data.map((item) => item.orderUkey);

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // console.log("onSubmit DATA ==>", data);

    const bodyData = {
      sampleUkeyList: orderUkeyArray,
    };

    console.log("BODYDATA ==>", bodyData);

    await POST(apiUrl + `${uKey}`, bodyData)
      .then((response) => {
        console.log("POST request successful:", response);
        if (response.success) {
          mutate(`/run/list?page=1&size=20`);
          handleClose();
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>BI분석 요청</ModalTitle>
      <DialogContent>
        <Box
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: `${cjbsTheme.palette.grey["200"]}`,
          }}
        >
          <Typography variant="body2">
            - 직전 단계의 상태가 입력되어 있지 않으면 상태값 변경이 되지
            않습니다.
          </Typography>
          <Typography variant="body2">
            - 실험을 진행하지 않는 단계는 &quot;해당 없음&quot; 상태로 변경해
            주세요.
          </Typography>
        </Box>
        {/*<Form onSubmit={onSubmit} id="runAddForm">*/}
        <TableContainer>
          <Table sx={{}}>
            <TableHead>
              <TableRow>
                <TH align="center" width="50%">
                  오더 번호
                </TH>
                <TH align="center">샘플수</TH>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map(
                (item: {
                  orderId: number;
                  orderUkey: string;
                  sampleCnt: number;
                }) => {
                  const { orderId, orderUkey, sampleCnt } = item;
                  return (
                    <TableRow key={orderUkey}>
                      <TD align="center">{orderId}</TD>
                      <TD align="center">{sampleCnt}</TD>
                    </TableRow>
                  );
                },
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TH align="center">합계</TH>
                <TD align="center">{totalSampleCnt}</TD>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        {/*</Form>*/}
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
          onClick={handleSubmit}
          // type="submit"
          // form="runAddForm"
        >
          요청
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default RunAddModal;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
