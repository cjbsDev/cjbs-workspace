import React, { useState } from "react";
import {
  ErrorContainer,
  Fallback,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";
import SampleActionBtns from "./SampleActionBtns";
interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  // data: object;
}

const LazySampleDataTable = dynamic(() => import("./SampleDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

const SampleAllList = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>샘플 검색</ModalTitle>

      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazySampleDataTable />
        </ErrorContainer>
      </DialogContent>

      <SampleActionBtns handleClose={handleClose} isLoading={isLoading} />

      {/*<ModalActionGroup>*/}
      {/*  <OutlinedButton*/}
      {/*    buttonName="취소"*/}
      {/*    onClick={handleClose}*/}
      {/*    color="secondary"*/}
      {/*  />*/}
      {/*  <LoadingButton*/}
      {/*    loading={isLoading}*/}
      {/*    variant="contained"*/}
      {/*    onClick={() => console.log("tytyty")}*/}
      {/*  >*/}
      {/*    샘플 추가*/}
      {/*  </LoadingButton>*/}
      {/*</ModalActionGroup>*/}
    </ModalContainer>
  );
};

export default SampleAllList;
