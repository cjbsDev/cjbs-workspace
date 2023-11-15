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
  const apiUrl = "/run/add";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const { data } = useSWR(`/run/${uKey}/bi`, fetcher, {
    suspense: true,
  });

  console.log("BI", data);

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  const handleReq = async () => {};

  // const onSubmit = async (data: any) => {
  //   setIsLoading(true);
  //   console.log("onSubmit DATA ==>", data);
  //
  //   if (data.rcptDttm === undefined) {
  //     setIsLoading(false);
  //   }
  //
  //   const convertedDate = dayjs(data.rcptDttm).format("YYYY-MM-DD");
  //
  //   const bodyData = {
  //     kitMc: data.kitMc,
  //     machineMc: data.mcNmCc,
  //     memo: data.memo,
  //     runDttm: convertedDate,
  //     runMngrUkey: data.runMngrUkey,
  //     runType: data.runType,
  //     seqAgncMc: data.prgrAgncNmCc,
  //   };
  //
  //   console.log("BODYDATA ==>", bodyData);
  //
  //   await POST(apiUrl, bodyData)
  //     .then((response) => {
  //       console.log("POST request successful:", response);
  //       if (response.success) {
  //         // mutate(`/order/${orderUkey}`);
  //         mutate(`/run/list?page=1&size=20`);
  //         handleClose();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("POST request failed:", error);
  //     });
  // };

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
                <TH>오더 번호</TH>
                <TH>샘플수</TH>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TD>234234</TD>
                <TD>150</TD>
              </TableRow>
              <TableRow>
                <TD>234234</TD>
                <TD>150</TD>
              </TableRow>
              <TableRow>
                <TD>234234</TD>
                <TD>150</TD>
              </TableRow>
              <TableRow>
                <TD>234234</TD>
                <TD>150</TD>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TH>합계</TH>
                <TD>200</TD>
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
