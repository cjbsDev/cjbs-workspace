import React, { useState, useMemo, useCallback } from "react";
import { ModalContainer, ModalTitle, SkeletonLoading } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import dynamic from "next/dynamic";

const LazyAgncDataTable = dynamic(() => import("./AgncDataTable"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const AgncSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const handleClose = useCallback(() => {
    onClose();
  }, []);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처 검색</ModalTitle>
      <DialogContent>
        <LazyAgncDataTable handleClose={handleClose} />
      </DialogContent>
    </ModalContainer>
  );
};

export default AgncSearchModal;
