import React from "react";
import {
  ModalContainer,
  ModalTitle,
  SkeletonTableModalLoading,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import dynamic from "next/dynamic";

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const LazyProjectSearchDataTable = dynamic(
  () => import("./ProjectSearchDataTable"),
  {
    ssr: false,
    loading: () => <SkeletonTableModalLoading />,
  },
);

const ProjectSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>과제 검색</ModalTitle>
      <DialogContent>
        <LazyProjectSearchDataTable onClose={onClose} />
      </DialogContent>
    </ModalContainer>
  );
};

export default ProjectSearchModal;
