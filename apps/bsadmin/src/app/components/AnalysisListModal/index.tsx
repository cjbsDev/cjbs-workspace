import * as React from "react";

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

const LazyAnalysisListDataTable = dynamic(() => import("./AnalysisListDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  handleAddSampleList: () => void;
  getOrderUkey: string;
  open: boolean;
  modalWidth: number;
  selectSampleList?: [];
  viewType: string;
}

const AnalysisListModal = ({
  onClose,
  open,
  modalWidth,
  getOrderUkey,
  handleAddSampleList,
  selectSampleList,
  viewType,
}: ModalContainerProps) => {

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>분석내역</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAnalysisListDataTable
            onClose={onClose}
            getOrderUkey={getOrderUkey}
            handleAddSampleList={handleAddSampleList}
            selectSampleList={selectSampleList}
            viewType={viewType}
          />
        </ErrorContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default AnalysisListModal;
