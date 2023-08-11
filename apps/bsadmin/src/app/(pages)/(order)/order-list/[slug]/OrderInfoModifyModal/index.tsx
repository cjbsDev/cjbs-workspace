import React, { useState, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ExcelDownloadButton,
  ModalContainer,
  ModalTitle,
  ModalAction,
  OutlinedButton,
  TH,
  TD,
  Form,
  InputValidation,
  CheckboxSV,
  CheckboxGV,
  ErrorContainer,
  Fallback,
  ContainedButton,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Chip,
  DialogContent,
  Grid,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import SingleDatePicker from "./DatePicker";
import { useParams } from "next/navigation";
import fetcher from "../../../../../func/fetcher";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

const LazyStatusCcSelctbox = dynamic(() => import("./StatusCcSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyPrepSelctbox = dynamic(() => import("./PrepSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyLipSelctbox = dynamic(() => import("./LipSelectbox"), {
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
  }
);

const dataRadioGVTest = [
  { value: "dnaReturnComp", optionName: "DNA 반송 요청" },
  { value: "sampleReturnComp", optionName: "샘플 반송 요청" },
];
interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  // data: object;
}

const OrderInfoModifyModal = ({
  onClose,
  open,
  modalWidth,
}: // data,
ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/analysis/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const { mutate } = useSWRConfig();

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  console.log("Init Date!!@@@@ ==>> ", data.data.check16sAt);

  const defaultValues = {
    check16sAt: new Date(data.data.check16sAt),
    isFastTrack: data.data.isFastTrack,
    mailRcpnList: data.data.mailRcpnList,
    reqReturnCompList: data.data.reqReturnCompList,
    orderStatusCc: data.data.orderStatusCc,
    orderTypeCc: data.data.orderTypeCc,
    addEmailList: data.data.addEmailList,
    libMngrUkey: data.data.libMngrUkey,
    qcMngrUkey: data.data.qcMngrUkey,
    seqMngrUkey: data.data.seqMngrUkey,
    memo: data.data.memo,
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("오더 정보 변경 Body Data ==>>", data);
    console.log("check16At", data.check16sAt);

    const newDateValue = dayjs(data.check16sAt).format("YYYY-MM-DD");
    console.log("NEW check16At", newDateValue);

    const body = {
      check16sAt: newDateValue,
      isFastTrack: data.isFastTrack,
      mailRcpnList: data.mailRcpnList,
      reqReturnCompList: data.reqReturnCompList,
      orderStatusCc: data.orderStatusCc,
      orderTypeCc: data.orderTypeCc,
      addEmailList: data.addEmailList,
      libMngrUkey: data.libMngrUkey,
      qcMngrUkey: data.qcMngrUkey,
      seqMngrUkey: data.seqMngrUkey,
      memo: data.memo,
    };

    await axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/order/analysis/${orderUkey}`,
        body
      )
      .then((res) => {
        console.log(res.data);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}`);
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/order/detail/${orderUkey}`);
        mutate(
          `${process.env.NEXT_PUBLIC_API_URL}/order/analysis/${orderUkey}`
        );
        res.data.success && handleClose();
      })
      .catch((error) => {
        // console.log("오더 정보 변경Error", error.message);
        console.log("오더 정보 변경Error", error.response.data.data);
      });
    // .finally(() => {
    //   console.log("Finally~~~~");
    // });
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
                  <TH sx={{ width: "35%" }}>
                    진행상황<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyStatusCcSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    메일 수신 설정<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <Stack spacing={1}>
                      <Stack direction="row">
                        <CheckboxSV
                          inputName="mailRcpnList"
                          labelText="연구책임자"
                          value="agncLeaderRcpn"
                        />
                        <CheckboxSV
                          inputName="mailRcpnList"
                          labelText="신청인"
                          value="ordrAplcRcpn"
                        />
                        <CheckboxSV
                          inputName="mailRcpnList"
                          labelText="추가(직접입력)"
                          value="etcRcpn"
                        />
                      </Stack>
                      <InputValidation
                        inputName="addEmailList"
                        placeholder="여러개 입력시','로 구분하세요."
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    Fast Track<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <CheckboxSV
                      inputName="isFastTrack"
                      labelText="Fast Track으로 진행합니다."
                      value="Y"
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    반송요청<NotRequired>[선택]</NotRequired>
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
                    <SingleDatePicker />
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
                    Lip 담당<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyLipSelctbox />
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
                  <TH sx={{ width: "35%" }}>
                    오더 타입<NotRequired>[선택]</NotRequired>
                  </TH>
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
                    <InputValidation inputName="memo" multiline rows={4} />
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
          form="orderInfoModifyForm"
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
