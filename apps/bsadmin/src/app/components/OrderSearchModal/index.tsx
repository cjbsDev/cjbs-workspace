import React, { useState, useMemo } from "react";
import {
  ErrorContainer,
  Fallback,
  ModalContainer,
  ModalTitle,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import {
  DialogContent,
} from "@mui/material";
import dynamic from "next/dynamic";

const LazyOrderSearchDataTable = dynamic(() => import("./OrderSearchDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  handleOrderChange: () => void;
  open: boolean;
  modalWidth: number;
  type?: string;
}

const OrderSearchModal = ({
  onClose,
  open,
  modalWidth,
  type,
  handleOrderChange,
}: ModalContainerProps) => {

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>오더 검색</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyOrderSearchDataTable onClose={onClose} type={type} handleOrderChange={handleOrderChange}/>
        </ErrorContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default OrderSearchModal;
