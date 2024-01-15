import React, { useState, useMemo } from "react";
import {
  ErrorContainer,
  Fallback,
  ModalContainer,
  ModalTitle,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import dynamic from "next/dynamic";

console.log("11");

const LazyAgncSearchDataTable = dynamic(() => import("./AgncSearchDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  type?: string;
}

const AgncSearchModal = ({
  onClose,
  open,
  modalWidth,
  type,
}: ModalContainerProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처 검색</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncSearchDataTable onClose={onClose} type={type} />
        </ErrorContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default AgncSearchModal;
