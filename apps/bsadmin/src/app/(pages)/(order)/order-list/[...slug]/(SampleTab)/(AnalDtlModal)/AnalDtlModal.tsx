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
import { useRouter } from "next-nprogress-bar";
import { useRecoilValue } from "recoil";
import { slctedSampleUkeyAtom } from "./analDtlAtom";
import { useParams } from "next/navigation";

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

const AnalDtlModal = ({
  onClose,
  open,
  modalWidth,
  sampleUkeyList,
}: AnalDtlModalProps) => {
  // console.log("SampleUkeyList ==>>>", sampleUkeyList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getSelectedSampleUkeyList = useRecoilValue(slctedSampleUkeyAtom);
  const router = useRouter();
  const params = useParams();
  const orderUkey = params.slug;
  const handleClose = () => {
    onClose();
  };

  const handleReg = () => {
    // console.log(
    //   "getSelectedSampleUkeyList",
    //   getSelectedSampleUkeyList.toString(),
    // );
    router.push(
      `/ledger-analysis-report-reg?orderUkey=${orderUkey}&sampleUkeyList=${getSelectedSampleUkeyList.toString()}`,
    );
    handleClose();
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
          size="small"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          // type="submit"
          // form="sampleBatchChange"
          // disabled={true}
          onClick={handleReg}
          size="small"
        >
          분석 내역서 등록하기
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default AnalDtlModal;
