import React, { useState, useMemo } from "react";
import {
  ModalContainer,
  ModalTitle,
  ModalAction,
  OutlinedButton,
  TH,
  TD,
  Form,
  CheckboxGV,
  ErrorContainer,
  Fallback,
  SingleDatePicker,
  TextareaValidation,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  DialogContent,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useSWR, { useSWRConfig } from "swr";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import {
  emailReceiveSettingData,
  fastTrackData,
} from "../../../../../data/inputDataLists";
import { PUT, fetcher } from "api";
import AddEmailListValidation from "./AddEmailListValidation";
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";
import SrvcTypeChangeWarning from "../../components/SrvcTypeChangeWarning";

const LazyStatusCcSelctbox = dynamic(() => import("./StatusCcSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyPrepSelctbox = dynamic(() => import("./PrepSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyLibSelctbox = dynamic(() => import("./LibSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazySeqSelctbox = dynamic(() => import("./SeqSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyOrderType = dynamic(
  () => import("../../../../../components/OrderType"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyAnalysisTypeSelctbox = dynamic(
  () => import("../../../components/AnalysisTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyServiceTypeSelctbox = dynamic(
  () => import("../../../components/ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyPlatformSelectbox = dynamic(
  () => import("../../../components/PlatformSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const dataRadioGVTest = [
  { value: "dnaReturnComp", optionName: "DNA 반송 완료" },
  { value: "sampleReturnComp", optionName: "샘플 반송 완료" },
];
interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const OrderInfoModifyModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { data: orderAnalysisData } = useSWR(
    `/order/analysis/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    },
  );
  const { mutate } = useSWRConfig();
  const [resultObject, result] = useResultObject();

  console.log("오더 정보 변경 InitData ==>>", orderAnalysisData);

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  const defaultValues = {
    ...orderAnalysisData,
    check16sAt:
      orderAnalysisData.check16sAt === null
        ? null
        : new Date(orderAnalysisData.check16sAt),
    isFastTrack:
      orderAnalysisData.isFastTrack === "N"
        ? false
        : orderAnalysisData.isFastTrack,
    // anlsTypeMc: data.anlsTypeMc,
    // srvcTypeMc: data.srvcTypeMc,
    // pltfMc: data.pltfMc,
    // mailRcpnList: data.mailRcpnList,
    // reqReturnCompList: data.reqReturnCompList,
    // orderStatusCc: data.orderStatusCc,
    // orderTypeCc: data.orderTypeCc,
    // addEmailList: data.addEmailList,
    // libMngrUkey: data.libMngrUkey,
    // prepMngrUkey: data.prepMngrUkey,
    // seqMngrUkey: data.seqMngrUkey,
    // memo: data.memo,
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    }

    const newDateValue = data.check16sAt
      ? dayjs(data.check16sAt).format("YYYY-MM-DD")
      : null;

    const reqBody = {
      ...data,
      check16sAt: newDateValue,
      isFastTrack: data.isFastTrack !== "Y" ? "N" : "Y",
      // mailRcpnList: data.mailRcpnList,
      // reqReturnCompList: data.reqReturnCompList,
      // orderStatusCc: data.orderStatusCc,
      // orderTypeCc: data.orderTypeCc,
      // addEmailList: data.addEmailList,
      // libMngrUkey: data.libMngrUkey,
      // prepMngrUkey: data.prepMngrUkey,
      // seqMngrUkey: data.seqMngrUkey,
      // memo: data.memo,
    };

    console.log("reqBody ==>>", reqBody);

    try {
      const res = await PUT(`/order/analysis/${orderUkey}`, reqBody);
      console.log("오더 정보 변경 성고 ==>>", res.success);

      if (res.success) {
        mutate(`/order/${orderUkey}/sample/list`);
        mutate(`/order/${orderUkey}${result}`);
        mutate(`/order/detail/${orderUkey}`);
        mutate(`/order/analysis/${orderUkey}`);
        handleClose();
      }
    } catch (error) {
      console.error(
        "오더 정보 변경Error",
        error.response?.data?.data || error.message,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>오더 정보 변경</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="orderInfoModifyForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "35%" }}>분석종류</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyAnalysisTypeSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>서비스 타입</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceTypeSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>

                <SrvcTypeChangeWarning
                  prevSrvcTypeMc={orderAnalysisData.srvcTypeMc}
                />

                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    플랫폼<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyPlatformSelectbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>진행상황</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyStatusCcSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>메일 수신 설정</TH>
                  <TD>
                    <Stack spacing={0.3}>
                      <CheckboxGV
                        data={emailReceiveSettingData}
                        inputName="mailRcpnList"
                        required={true}
                        errorMessage="메일 수신 설정을 선택해 주세요."
                      />
                      {/* 추가(직접입력) 선택시 validation 하는 컴포넌트 */}
                      <AddEmailListValidation />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    Fast Track<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <CheckboxGV data={fastTrackData} inputName="isFastTrack" />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    반송 완료 여부<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <CheckboxGV
                      data={dataRadioGVTest}
                      inputName="reqReturnCompList"
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    <Typography variant="body2">
                      16S 확인일<NotRequired>[선택]</NotRequired>
                    </Typography>
                  </TH>
                  <TD>
                    <SingleDatePicker inputName="check16sAt" />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    Prep 담당<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyPrepSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    Lib 담당<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyLibSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    Seq 담당<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazySeqSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>오더 타입</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyOrderType />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    메모<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <TextareaValidation />
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
          size="small"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="orderInfoModifyForm"
          size="small"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default OrderInfoModifyModal;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
