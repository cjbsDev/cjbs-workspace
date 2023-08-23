import React from "react";
import { ModalContainer, ModalTitle } from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";
import SampleInfoTable1 from "./SampleInfoTable1";
import SampleInfoTable2 from "./SampleInfoTable2";

interface SampleInfoModalProps extends ModalContainerProps {
  sampleUkey: string;
}

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
      </DialogContent>
    </ModalContainer>
  );
};

export default SampleInfoModal;
