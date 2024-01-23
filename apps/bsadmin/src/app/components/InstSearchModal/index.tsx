import React, { useState, useMemo, useCallback } from "react";
import { ModalContainer, ModalTitle, SkeletonLoading } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import dynamic from "next/dynamic";

const LazyInstDataTable = dynamic(() => import("./InstDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const InstSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처 검색</ModalTitle>
      <DialogContent>
        <LazyInstDataTable handleClose={handleClose} />
      </DialogContent>
    </ModalContainer>
  );
};

export default InstSearchModal;
