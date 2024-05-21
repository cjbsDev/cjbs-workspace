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
  RadioGV,
  Won,
  InputValidation,
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

const LazyStatusCcSelctbox = dynamic(() => import("./StatusCcSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyBsnsMngrSelectbox = dynamic(() => import("./BsnsMngrSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyOrderType = dynamic(() => import("./OrderType"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const dataRadioGVTest = [
  { value: "dnaReturnComp", optionName: "DNA 반송 요청" },
  { value: "sampleReturnComp", optionName: "샘플 반송 요청" },
];

const dataRadioGVTest2 = [
  { value: "Y", optionName: "요청함" },
  { value: "N", optionName: "요청안함" },
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
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(`/order/sales/${orderUkey}`, fetcher, {
    suspense: true,
  });
  const { mutate } = useSWRConfig();

  console.log("오더 Sales 정보 변경 InitData ==>>", data);

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  const defaultValues = {
    ...data,
    // is16S: data.is16S,
    // mailRcpnList: data.mailRcpnList,
    // reqReturnCompList: data.reqReturnCompList,
    // orderStatusCc: data.orderStatusCc,
    // orderTypeCc: data.orderTypeCc,
    // pltfMc: data.pltfMc,
    // price: data.price,
    // addEmailList: data.addEmailList,
    // reqReturnList: data.reqReturnList,
    // bsnsMngrUkey: data.bsnsMngrUkey,
    // memo: data.memo,
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
      setAddEmailChck(true);
    }

    const body = {
      ...data,
      // check16sAt: newDateValue,
      // mailRcpnList: data.mailRcpnList,
      // reqReturnCompList: data.reqReturnCompList,
      // orderStatusCc: data.orderStatusCc,
      // orderTypeCc: data.orderTypeCc,
      // addEmailList: data.addEmailList,
      // libMngrUkey: data.libMngrUkey,
      // qcMngrUkey: data.qcMngrUkey,
      // seqMngrUkey: data.seqMngrUkey,
      // memo: data.memo,
    };

    try {
      const res = await PUT(`/order/sales/${orderUkey}`, body);
      console.log("오더 Sales 정보 변경 성고 ==>>", res.success);

      if (res.success) {
        mutate(`/order/${orderUkey}`);
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
      <ModalTitle onClose={handleClose}>NGS 영업팀 오더 정보 변경</ModalTitle>
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
                      <CheckboxGV
                        data={emailReceiveSettingData}
                        inputName="mailRcpnList"
                        // required={true}
                        // errorMessage="메일 수신 설정을 선택해 주세요."
                      />
                      {/* 추가(직접입력) 선택시 validation 하는 컴포넌트 */}
                      <AddEmailListValidation />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    반송요청<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <CheckboxGV
                      data={dataRadioGVTest}
                      inputName="reqReturnList"
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    <Typography variant="body2">
                      16S 확인 요청<NotRequired>[선택]</NotRequired>
                    </Typography>
                  </TH>
                  <TD>
                    <RadioGV
                      data={dataRadioGVTest2}
                      inputName="is16S"
                      // required={true}
                      // errorMessage="오더 타입을 선택해 주세요."
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    오더 금액<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <InputValidation
                      inputName="price"
                      required={true}
                      pattern={/^[0-9]+$/}
                      patternErrMsg="숫자만 입력해 주세요."
                      errorMessage="오더 금액을 입력해 주세요."
                      sx={{
                        width: 160,
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        // inputComponent: (props) => (
                        //   <AmountFormat
                        //     name={"price"}
                        //     priceValue={defaultValues.price}
                        //     {...props}
                        //   />
                        // ),
                        endAdornment: <Won />,
                      }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    영업 담당자<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyBsnsMngrSelectbox />
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
