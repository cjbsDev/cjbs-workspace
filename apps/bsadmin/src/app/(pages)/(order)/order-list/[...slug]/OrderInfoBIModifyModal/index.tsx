import React, { useState, useMemo } from "react";
import {
  ModalContainer,
  ModalTitle,
  ModalAction,
  OutlinedButton,
  TH,
  TD,
  Form,
  ErrorContainer,
  Fallback,
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
import { LoadingButton } from "@mui/lab";
import useSWR, { useSWRConfig } from "swr";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { PUT, fetcher } from "api";
import SrvcTypeChangeWarning from "../../components/SrvcTypeChangeWarning";

const LazyStatusCcSelctbox = dynamic(() => import("./StatusCcSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});
const LazyBIMngrSelectbox = dynamic(() => import("./BIMngrSelectbox"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

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
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data: orderBIData } = useSWR(`/order/bi/${orderUkey}`, fetcher, {
    suspense: true,
  });

  console.log("BI오더 정보 변경 InitData ==>>", orderBIData);

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  const defaultValues = {
    ...orderBIData,
    // orderStatusCc: data.orderStatusCc,
    // biMngrUkey: data.biMngrUkey,
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const reqBody = {
      ...data,
      // orderStatusCc: data.orderStatusCc,
      // biMngrUkey: data.biMngrUkey,
    };

    try {
      const res = await PUT(`/order/bi/${orderUkey}`, reqBody);
      console.log("오더 BI 정보 변경 성고 ==>>", res.success);

      if (res.success) {
        mutate(`/order/${orderUkey}/sample/list`);
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
      <ModalTitle onClose={handleClose}>
        NGS 영업팀(BI) 오더 정보 변경
      </ModalTitle>
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
                  prevSrvcTypeMc={orderBIData.srvcTypeMc}
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
                    분석 담당자<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyBIMngrSelectbox />
                    </ErrorContainer>
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
