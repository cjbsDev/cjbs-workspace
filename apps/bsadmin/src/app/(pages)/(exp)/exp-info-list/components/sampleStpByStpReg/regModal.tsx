import React, { useState } from "react";
import {
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent, Typography } from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import { LoadingButton } from "@mui/lab";
import Tab from "./tab";

const RegModal = ({ onClose, open, modalWidth }: ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onSubmit = async (data: object) => {
    setIsLoading(true);
    console.log("File Upload ResData", data);
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>샘플 단계 등록</ModalTitle>
      <DialogContent sx={{ minHeight: 244 }}>
        {/*<Form onSubmit={onSubmit} id="runAddForm">*/}
        {/*  <Typography variant="subtitle1">EzBioCloud 계정 검색</Typography>*/}
        {/*</Form>*/}
        <Tab />
      </DialogContent>
      {/*<ModalAction>*/}
      {/*  <OutlinedButton buttonName="취소" onClick={onClose} color="secondary" />*/}
      {/*  <LoadingButton*/}
      {/*    loading={isLoading}*/}
      {/*    variant="contained"*/}
      {/*    type="submit"*/}
      {/*    form="runAddForm"*/}
      {/*  >*/}
      {/*    등록*/}
      {/*  </LoadingButton>*/}
      {/*</ModalAction>*/}
    </ModalContainer>
  );
};

export default RegModal;
