import React, { useState } from "react";
import {
  cjbsTheme,
  ErrorContainer,
  Fallback,
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
  Box,
  DialogContent,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { useSWRConfig } from "swr";
import { useParams } from "next/navigation";
import { PUT } from "api";

const LazyPhaseSelectbox = dynamic(() => import("./PhaseSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazyConditionSelectbox = dynamic(() => import("./ConditionSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

interface ExperimentProgressChangeModalProps extends ModalContainerProps {
  sampleUkeyList: string[];
}

const apiUrl = `/sample/status`;

const ExperimentProgressChangeModal = (
  props: ExperimentProgressChangeModalProps,
) => {
  const { onClose, open, modalWidth, sampleUkeyList } = props;
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const [alertOpen, setAlertOpen] = React.useState(false);

  const handleAlertClick = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const defaultValues = {
    compDttm: new Date(),
  };
  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("FORM DATA ==>>", data);
    console.log("SampleUkeyList", sampleUkeyList);

    const convertedDate = dayjs(data.compDttm).format("YYYY-MM-DD");

    const bodyData = {
      analysisPhaseMc: data.analysisPhaseMc,
      compDttm: convertedDate,
      sampleUkeyList: sampleUkeyList,
      statusCc: data.statusCc,
    };

    console.log("BODYDATA ==>", bodyData);

    await PUT(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response.success);
        if (response.success) {
          // mutate(`/order/${orderUkey}`);
          // mutate(`/order/${orderUkey}/sample/list`);
          mutate(`/run/sample/${orderUkey}?page=1&size=20`);
          setIsLoading(false);
          handleClose();
        } else {
          handleAlertClick();
          setErrorMsg(response.message);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("PUT Request Failed:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
        <ModalTitle onClose={handleClose}>실험 진행 단계 변경</ModalTitle>
        <DialogContent sx={{ mt: -3.5 }}>
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
          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            id="exPrgsChng"
          >
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TH sx={{ width: "20%" }}>단계</TH>
                    <TD colSpan={3}>
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyPhaseSelectbox />
                      </ErrorContainer>
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "20%" }}>상태</TH>
                    <TD colSpan={3}>
                      <ErrorContainer FallbackComponent={Fallback}>
                        <LazyConditionSelectbox />
                      </ErrorContainer>
                    </TD>
                  </TableRow>
                  {/*<TableRow>*/}
                  {/*  <TH sx={{ width: "20%" }}>완료일</TH>*/}
                  {/*  <TD colSpan={3}>*/}
                  {/*    <SingleDatePicker inputName="compDttm" />*/}
                  {/*  </TD>*/}
                  {/*</TableRow>*/}
                </TableBody>
              </Table>
            </TableContainer>
          </Form>
          <ErrorContainer FallbackComponent={Fallback}></ErrorContainer>
        </DialogContent>
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={handleClose}
            color="secondary"
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            form="exPrgsChng"
          >
            저장
          </LoadingButton>
        </ModalAction>
      </ModalContainer>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        sx={{ p: 2 }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="warning"
          sx={{ width: "100%", fontWeight: "600" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExperimentProgressChangeModal;
