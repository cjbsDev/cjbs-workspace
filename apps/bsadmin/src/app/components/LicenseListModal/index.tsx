import * as React from "react";

import {
  ContainedButton,
  ErrorContainer,
  Fallback, Form,
  ModalContainer,
  ModalTitle, OutlinedButton,
  SkeletonTableModalLoading, Title1,
} from "cjbsDSTM";
import {
  Box,
  DialogContent, Stack,
} from "@mui/material";
import dynamic from "next/dynamic";
import BasicInfo from "./BasicInfo";
import LoadingSvg from "../../../../public/svg/loading_wh.svg";
import {useRouter} from "next-nprogress-bar";
import {POST} from "api";

const LazyAnalysisListDataTable = dynamic(() => import("./AnalysisListDataTable"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  handleAddSampleList: () => void;
  handlePlatformChange: () => string;
  getOrderUkey: string;
  open: boolean;
  modalWidth: number;
  selectSampleList?: [];
  viewType: string;
  type: string;
}

const AnalysisListModal = ({
  onClose,
  open,
  modalWidth,
  handlePlatformChange,
  getOrderUkey,
  handleAddSampleList,
  selectSampleList,
  viewType,
  type,
}: ModalContainerProps) => {

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>License</ModalTitle>
      <DialogContent>
        {/*<ErrorContainer FallbackComponent={Fallback}>*/}
        {/*  <LazyAnalysisListDataTable*/}
        {/*    onClose={onClose}*/}
        {/*    getOrderUkey={getOrderUkey}*/}
        {/*    handleAddSampleList={handleAddSampleList}*/}
        {/*    selectSampleList={selectSampleList}*/}
        {/*    viewType={viewType}*/}
        {/*  />*/}
        {/*</ErrorContainer>*/}
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="License" />
            <BasicInfo
              type={type}
              handlePlatformChange={handlePlatformChange}
              onClose={onClose}
            />
          </Box>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="닫기"
              onClick={() => onClose()}
            />
            {/*<OutlinedButton*/}
            {/*  buttonName="목록"*/}
            {/*  onClick={() => router.push("/svc-std-price-list")}*/}
            {/*/>*/}
            {/*<ContainedButton*/}
            {/*  type="submit"*/}
            {/*  buttonName="등록"*/}
            {/*  endIcon={*/}
            {/*    isLoading ? (*/}
            {/*      <LoadingSvg stroke="white" width={20} height={20} />*/}
            {/*    ) : null*/}
            {/*  }*/}
            {/*/>*/}
          </Stack>
      </DialogContent>
    </ModalContainer>
  );
};

export default AnalysisListModal;
