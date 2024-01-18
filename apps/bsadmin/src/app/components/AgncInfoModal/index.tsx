import React from "react";
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
import { ModalContainerProps } from "../../types/modal-container-props";
import dynamic from "next/dynamic";

interface AgncDetailInfoModalProps extends ModalContainerProps {
  ukey: string;
}

const LazyAgncDetailInfoTable = dynamic(() => import("./AgncDetailInfoTable"), {
  ssr: false,
  loading: () => <SkeletonLoading height={206} />,
});

const Index = ({
  onClose,
  open,
  modalWidth,
  ukey,
}: AgncDetailInfoModalProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처(PI) 정보</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncDetailInfoTable ukey={ukey} />
        </ErrorContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
