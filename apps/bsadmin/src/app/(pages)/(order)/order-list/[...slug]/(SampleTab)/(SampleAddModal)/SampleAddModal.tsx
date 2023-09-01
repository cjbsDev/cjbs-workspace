import React, { useState } from "react";
import {
  DataTableBase,
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
  InputAdornment,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import useSWR, { useSWRConfig } from "swr";
import fetcher from "../../../../../../func/fetcher";
import { useParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next-nprogress-bar";
import dayjs from "dayjs";

const LazySampleCategorySelctbox = dynamic(
  () => import("../../../../../../components/SampleCategorySelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyTaxonTypeSelctbox = dynamic(
  () => import("../../../../../../components/TaxonTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyHostCompSelctbox = dynamic(
  () => import("../../../../../../components/HostCompSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const SampleInfoModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/sample/add`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();
  const { data } = useSWR(
    () => `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/sample/add`,
    fetcher,
    {
      suspense: true,
    }
  );
  const sampleAddDefaultData = data.data;
  console.log("sampleAddDefaultData ==>>", sampleAddDefaultData);

  const defaultValues = {
    rcptDttm:
      sampleAddDefaultData.rcptDttm === null
        ? null
        : new Date(sampleAddDefaultData.rcptDttm),
    taxonCc: sampleAddDefaultData.taxonCc,
    sampleNm: sampleAddDefaultData.sampleNm,
    sampleTypeCc: sampleAddDefaultData.sampleTypeCc,
    prgrAgncNmCc: sampleAddDefaultData.prgrAgncNmCc,
    memo: sampleAddDefaultData.memo,
    source: sampleAddDefaultData.source,
    depth: sampleAddDefaultData.depth,
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("onSubmit DATA ==>", data);

    const convertedDate = dayjs(data.rcptDttm).format("YYYY-MM-DD");

    const bodyData = {
      depth: Number(data.depth),
      memo: data.memo,
      prgrAgncNmCc: data.prgrAgncNmCc,
      rcptDttm: convertedDate,
      sampleNm: data.sampleNm,
      sampleTypeCc: data.sampleTypeCc,
      source: data.source,
      taxonCc: data.taxonCc,
    };

    console.log("BODYDATA ==>", bodyData);

    await axios
      .post(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response.data);
        if (response.data.success) {
          mutate(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}`);
          mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/sample/list`
          );
          handleClose();
        }
      })
      .catch((error) => {
        console.error("POST request failed:", error);
      });
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>샘플 추가</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="sampleAddForm"
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "20%" }}>샘플 접수일</TH>
                  <TD colSpan={3}>
                    <SingleDatePicker inputName="rcptDttm" />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>샘플명</TH>
                  <TD colSpan={3}>
                    <InputValidation
                      inputName="sampleNm"
                      required={true}
                      errorMessage="샘플명을 입력해 주세요."
                      // sx={{ width: 400 }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>샘플 종류</TH>
                  <TD colSpan={3}>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazySampleCategorySelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>Source</TH>
                  <TD colSpan={3}>
                    <InputValidation
                      inputName="source"
                      required={true}
                      errorMessage="source을 입력해 주세요."
                      // sx={{ width: 600 }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "20%" }}>Taxon</TH>
                  <TD sx={{ width: "30%" }}>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyTaxonTypeSelctbox />
                    </ErrorContainer>
                  </TD>
                  <TH sx={{ width: "20%" }}>
                    Depth(GB)<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD sx={{ width: "30%" }}>
                    <InputValidation
                      // helperText="숫자만 입력해 주세요."
                      // placeholder="숫자만 입력해 주세요."
                      inputName="depth"
                      pattern={/^[0-9]+$/}
                      patternErrMsg="숫자만 입력해 주세요."
                      sx={{
                        width: "100%",
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Typography variant="body2" sx={{ color: "black" }}>
                              GB
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>
                    진행업체<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD colSpan={3}>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyHostCompSelctbox />
                    </ErrorContainer>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH>
                    메모<NotRequired>[선택]</NotRequired>
                  </TH>
                  <TD colSpan={3}>
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
          form="sampleAddForm"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default SampleInfoModal;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
