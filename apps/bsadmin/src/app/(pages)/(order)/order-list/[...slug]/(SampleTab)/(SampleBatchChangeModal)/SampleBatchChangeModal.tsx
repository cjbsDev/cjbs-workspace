import React, { useState } from "react";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import { useSWRConfig } from "swr";
import {
  cjbsTheme,
  ErrorContainer,
  Fallback,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  RadioGV,
  SkeletonLoading,
} from "cjbsDSTM";
import {
  Box,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import MyIcon from "icon/myIcon";

interface SampleBathcChangeModalProps extends ModalContainerProps {
  sampleUkeyList: string[];
}

const LazySampleNoNm = dynamic(() => import("./SampleNoNm"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const dataRadio = [
  { value: "sampleNm", optionName: "샘플명" },
  { value: "altrNm", optionName: "대체명" },
  { value: "source", optionName: "Source" },
  { value: "memo", optionName: "메모" },
];
const SampleBatchChangeModal = (props: SampleBathcChangeModalProps) => {
  const { onClose, open, modalWidth, sampleUkeyList } = props;
  const { mutate } = useSWRConfig();
  const params = useParams();
  const orderUkey = params.slug;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = React.useState("female");

  console.log("PARAMS", params);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log((event.target as HTMLInputElement).value);
    console.log(sampleUkeyList);
    setValue((event.target as HTMLInputElement).value);
  };

  const handleClose = () => {
    onClose();
  };

  const defaultValues = {
    categoryNm: "sampleNm",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log(data);
  };
  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>샘플 정보 일괄 변경</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="sampleBatchChange"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">항목</Typography>

            <Stack direction="row" spacing={0.5}>
              <MyIcon
                icon="exclamation-circle"
                size={18}
                color={cjbsTheme.palette.error.main}
              />
              <Typography
                variant="body2"
                sx={{ color: cjbsTheme.palette.error.main }}
              >
                항목 이동 시 변경 내용이 저장되지 않습니다.
              </Typography>
            </Stack>
          </Stack>
          <Box sx={{ mb: 1 }}>
            <RadioGV
              data={dataRadio}
              inputName="categoryNm"
              required={true}
              errorMessage="항목을 선택 하세요."
            />
          </Box>
          <Box
            sx={{
              p: "12px 20px",
              mb: 3,
              backgroundColor: `${cjbsTheme.palette.grey["50"]}`,
            }}
          >
            <Typography variant="body2">
              · 데이터는 행을 기준으로 처리되며, 선택한 샘플 순서대로
              업데이트됩니다.
            </Typography>
            <Typography variant="body2">
              · 입력된 데이터가 선택한 샘플 개수를 초과하면, 샘플 개수만큼만
              업데이트됩니다.
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySampleNoNm sampleUkeyList={sampleUkeyList} />
              </ErrorContainer>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </Form>
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
          form="sampleBatchChange"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default SampleBatchChangeModal;
