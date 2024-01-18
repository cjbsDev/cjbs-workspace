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

interface RearchDetailInfoModalProps extends ModalContainerProps {
  ukey: string;
}

const LazyRearchDetailInfoTable = dynamic(
  () => import("./RearchDetailInfoTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={206} />,
  },
);

const Index = ({
  onClose,
  open,
  modalWidth,
  ukey,
}: RearchDetailInfoModalProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>연구책임자 정보</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyRearchDetailInfoTable ukey={ukey} />
        </ErrorContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton buttonName="닫기" onClick={onClose} color="secondary" />
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
