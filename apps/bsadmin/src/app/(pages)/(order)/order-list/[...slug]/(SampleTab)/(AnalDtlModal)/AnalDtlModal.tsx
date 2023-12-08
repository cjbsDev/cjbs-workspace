import React, { useMemo, useState } from "react";
import { ModalContainerProps } from "../../../../../../types/modal-container-props";
import {
  ErrorContainer,
  Fallback,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SkeletonLoading,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";

interface AnalDtlModalProps extends ModalContainerProps {
  onClose: any;
  open: any;
  modalWidth: any;
  sampleUkeyList: string[];
}

const LazyAnalDtlDataTable = dynamic(() => import("./AnalDtlDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={300} />,
});

const AnalDtlModal = (props: AnalDtlModalProps) => {
  const { onClose, open, modalWidth, sampleUkeyList } = props;
  // console.log("SampleUkeyList ==>>>", sampleUkeyList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    onClose();
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle
        onClose={handleClose}
        desctext="오더 진행이 완료되기 전까지는 각 샘플에 대한 분석 결과를 확인할 수 있으며, 오더 진행이 완료되면 분석 내역서를 등록할 수 있습니다."
      >
        분석 내역
      </ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAnalDtlDataTable sampleUkeyList={sampleUkeyList} />
        </ErrorContainer>
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
          disabled={true}
        >
          분석 내역서 등록하기
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default AnalDtlModal;
