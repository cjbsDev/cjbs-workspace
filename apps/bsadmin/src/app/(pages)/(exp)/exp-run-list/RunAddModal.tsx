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
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  DialogContent,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ModalContainerProps } from "../../../types/modal-container-props";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, POST } from "api";
import { useParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";

const LazyMcNameSelctbox = dynamic(
  () => import("../../../components/McNmSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyRUNTypeSelctbox = dynamic(
  () => import("../../../components/RunTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyKitSelctbox = dynamic(
  () => import("../../../components/KitSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">장비를 선택하세요.</Typography>,
  },
);
const LazyHostCompSelctbox = dynamic(
  () => import("../../../components/HostCompSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyExpMngSelctbox = dynamic(
  () => import("../../../components/ExpMngSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const RunAddModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const apiUrl = "/run/add";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

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

    const bodyData = {
      kitMc: data.kitMc,
      machineMc: data.mcNmCc,
      memo: data.memo,
      runDttm: convertedDate,
      runMngrUkey: data.runMngrUkey,
      runType: data.runType,
      seqAgncMc: data.prgrAgncNmCc,
    };

    console.log("BODYDATA ==>", bodyData);

    await POST(apiUrl, bodyData)
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
        <Form onSubmit={onSubmit} id="runAddForm">
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH>RUN 타입</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyRUNTypeSelctbox
                        required={true}
                        errorMessage="RUN타입을 선택해 주세요."
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>장비</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyMcNameSelctbox
                        required={true}
                        errorMessage="장비를 선택해 주세요."
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>Kit</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyKitSelctbox
                        required={true}
                        errorMessage="Kit를 선택해 주세요."
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>진행업체</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyHostCompSelctbox
                        required={true}
                        errorMessage="진행업체를 선택해 주세요."
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "20%" }}>RUN 날짜</TH>
                  <TD>
                    <SingleDatePicker
                      inputName="rcptDttm"
                      required={true}
                      errorMessage="날짜를 선택해 주세요."
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>실험 당당자</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyExpMngSelctbox
                        required={true}
                        errorMessage="실험담당자를 선택해 주세요."
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>
                    메모<NotRequired>[선택]</NotRequired>
                  </TH>
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
        <OutlinedButton
          buttonName="취소"
          onClick={handleClose}
          color="secondary"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="runAddForm"
        >
          저장
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
