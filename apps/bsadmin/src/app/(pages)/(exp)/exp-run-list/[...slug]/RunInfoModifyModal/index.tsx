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
// import {
//   emailReceiveSettingData,
//   fastTrackData,
// } from "../../../../../data/inputDataLists";
import { PUT, fetcher } from "api";
// import AddEmailListValidation from "./AddEmailListValidation";

const LazyRunTypeList = dynamic(
  () => import("../../../../../components/RunTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyMCNameList = dynamic(
  () => import("../../../../../components/McNmSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyKitList = dynamic(
  () => import("../../../../../components/KitSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazySeqAgncList = dynamic(
  () => import("../../../../../components/HostCompSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const LazyExpMngList = dynamic(
  () => import("../../../../../components/ExpMngSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
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

const RunInfoModifyModal = ({
  onClose,
  open,
  modalWidth,
}: // data,
ModalContainerProps) => {
  // const methods = useFormContext();
  // const { setValue, getValues, watch, clearErrors, control } = methods;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addEmailChck, setAddEmailChck] = useState<boolean>(false);
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/run/${ukey}`, fetcher, {
    suspense: true,
  });
  const { mutate } = useSWRConfig();

  console.log("RUN 정보 변경 InitData ==>>", data);

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  const defaultValues = {
    kitMc: data.kitMc,
    mcNmCc: data.machineMc,
    memo: data.memo,
    runDttm: data.runDttm === null ? null : new Date(data.runDttm),
    runId: data.runId,
    runMngrUkey: data.runMngrUkey,
    runType: data.runTypeMc,
    runUkey: data.runUkey,
    prgrAgncNmCc: data.seqAgncMc,
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    console.log("RUN 정보수정 SUBMIT", data);
    // if (data.mailRcpnList.includes("etcRcpn") && data.addEmailList === "") {
    //   setAddEmailChck(true);
    // }

    const newDateValue = data.runDttm
      ? dayjs(data.runDttm).format("YYYY-MM-DD")
      : null;

    const body = {
      runTypeMc: data.runType,
      machineMc: data.mcNmCc,
      kitMc: data.kitMc,
      seqAgncMc: data.prgrAgncNmCc,
      runDttm: newDateValue,
      runMngrUkey: data.runMngrUkey,
      memo: data.memo,
      runId: data.runId,
      runUkey: data.runUkey,
    };

    try {
      const res = await PUT(`/run/${ukey}`, body);
      console.log("RUN 정보 변경 성고 ==>>", res.success);

      if (res.success) {
        mutate(`/run/${ukey}`);
        mutate(`/run/log/${ukey}`);
        // mutate(`/order/detail/${orderUkey}`);
        // mutate(`/order/analysis/${orderUkey}`);
        handleClose();
      }
    } catch (error: any) {
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
      <ModalTitle onClose={handleClose}>RUN 정보 변경</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="runInfoModifyForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "35%" }}>RUN 타입</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyRunTypeList
                        required={true}
                        errorMessage="RUN 타입을 선택해 주세요!"
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>장비</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyMCNameList
                        required={true}
                        errorMessage="장비를 선택해 주세요!"
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>Kit</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyKitList
                        required={true}
                        errorMessage="Kit를 선택해 주세요!"
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>진행업체</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazySeqAgncList
                        required={true}
                        errorMessage="진행업체를 선택해 주세요!"
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>
                    <Typography variant="body2">RUN 날짜</Typography>
                  </TH>
                  <TD>
                    <SingleDatePicker inputName="runDttm" required={true} />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "35%" }}>실험 담당자</TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyExpMngList
                        required={true}
                        errorMessage="실험 담당자를 선택해 주세요!"
                      />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>*/}
                {/*    Fast Track<NotRequired>[선택]</NotRequired>*/}
                {/*  </TH>*/}
                {/*  <TD>*/}
                {/*    <CheckboxGV data={fastTrackData} inputName="isFastTrack" />*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>*/}
                {/*    반송 완료 여부<NotRequired>[선택]</NotRequired>*/}
                {/*  </TH>*/}
                {/*  <TD>*/}
                {/*    <CheckboxGV*/}
                {/*      data={dataRadioGVTest}*/}
                {/*      inputName="reqReturnCompList"*/}
                {/*    />*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}

                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>*/}
                {/*    Prep 담당<NotRequired>[선택]</NotRequired>*/}
                {/*  </TH>*/}
                {/*  <TD>*/}
                {/*    <ErrorContainer FallbackComponent={Fallback}>*/}
                {/*      <LazyPrepSelctbox />*/}
                {/*    </ErrorContainer>*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>*/}
                {/*    Lip 담당<NotRequired>[선택]</NotRequired>*/}
                {/*  </TH>*/}
                {/*  <TD>*/}
                {/*    <ErrorContainer FallbackComponent={Fallback}>*/}
                {/*      <LazyLipSelctbox />*/}
                {/*    </ErrorContainer>*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>*/}
                {/*    Seq 담당<NotRequired>[선택]</NotRequired>*/}
                {/*  </TH>*/}
                {/*  <TD>*/}
                {/*    <ErrorContainer FallbackComponent={Fallback}>*/}
                {/*      <LazySeqSelctbox />*/}
                {/*    </ErrorContainer>*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "35%" }}>오더 타입</TH>*/}
                {/*  <TD>*/}
                {/*    <ErrorContainer FallbackComponent={Fallback}>*/}
                {/*      <LazyOrderType />*/}
                {/*    </ErrorContainer>*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}
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
          form="runInfoModifyForm"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default RunInfoModifyModal;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
