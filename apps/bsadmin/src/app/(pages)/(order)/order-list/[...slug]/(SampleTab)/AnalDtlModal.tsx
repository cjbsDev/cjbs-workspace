import React, { useState } from "react";
import { ModalContainerProps } from "../../../../../types/ModalContainerProps";
import {
  ErrorContainer,
  Fallback,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  RadioGV,
} from "cjbsDSTM";
import { Box, DialogContent, Grid } from "@mui/material";
import DialogContentTitle from "./(SampleBatchChangeModal)/DialogContentTitle";
import AlertContentBox from "./(SampleBatchChangeModal)/AlertContentBox";
import SampleBatchInputs from "./(SampleBatchChangeModal)/SampleBatchInputs";
import ActionButtons from "./(SampleBatchChangeModal)/ActionButtons";
import useSWR from "swr";
import { fetcher } from "api";

const AnalDtlModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth, sampleUkeyList } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiUrl = `/anls/inst/sample/list?sampleUkeyList=${sampleUkeyList}`;
  const { data } = useSWR(() => apiUrl, fetcher, {
    suspense: true,
  });

  console.log("분석 내역 보기 Data ==>>", data);

  const handleClose = () => {
    onClose();
  };

  console.log("sampleUkeyList", sampleUkeyList);

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>분석 내역 보기</ModalTitle>
      <DialogContent>
        {JSON.stringify(sampleUkeyList)}
        {/*<Form*/}
        {/*  onSubmit={onSubmit}*/}
        {/*  defaultValues={defaultValues}*/}
        {/*  id="sampleBatchChange"*/}
        {/*>*/}
        {/*  <DialogContentTitle />*/}
        {/*  <Box sx={{ mb: 1 }}>*/}
        {/*    <RadioGV*/}
        {/*      data={dataRadio}*/}
        {/*      inputName="categoryNm"*/}
        {/*      required={true}*/}
        {/*      errorMessage="항목을 선택 하세요."*/}
        {/*    />*/}
        {/*  </Box>*/}
        {/*  <AlertContentBox />*/}
        {/*  <Grid container spacing={4}>*/}
        {/*    <Grid item xs={6}>*/}
        {/*      <ErrorContainer FallbackComponent={Fallback}>*/}
        {/*        <LazySampleNoNm sampleUkeyList={sampleUkeyList} />*/}
        {/*      </ErrorContainer>*/}
        {/*    </Grid>*/}
        {/*    <Grid item xs={6}>*/}
        {/*      <SampleBatchInputs />*/}
        {/*    </Grid>*/}
        {/*  </Grid>*/}
        {/*</Form>*/}
      </DialogContent>
      <ModalAction>
        <ActionButtons handleClose={handleClose} isLoading={isLoading} />
      </ModalAction>
    </ModalContainer>
  );
};

export default AnalDtlModal;
