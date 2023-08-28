import React from "react";
import { ErrorContainer, Fallback, ModalContainer, ModalTitle } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";
import SampleInfoTable1 from "./SampleInfoTable1";
import SampleInfoTable2 from "./SampleInfoTable2";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";

interface SampleInfoModalProps extends ModalContainerProps {
  sampleUkey: string;
}
const LazyAgncModifyLog = dynamic(
  () => import("../../../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={142} />,
  }
);

const SampleInfoModal = (props: SampleInfoModalProps) => {
  const { onClose, open, modalWidth, sampleUkey } = props;
  const { data } = useSWR(
    () => `${process.env.NEXT_PUBLIC_API_URL}/sample/${sampleUkey}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const sampleInfoData = data.data;
  const sampleStatusRes = sampleInfoData.sampleStatusRes;

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>샘플 정보</ModalTitle>
      <DialogContent>
        <SampleInfoTable1 sampleInfoData={sampleInfoData} />
        <SampleInfoTable2 sampleStatusRes={sampleStatusRes} />
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncModifyLog apiName="sample/status" uKey={sampleUkey} />
        </ErrorContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default SampleInfoModal;
