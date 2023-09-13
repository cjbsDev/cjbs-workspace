import React, { useState } from "react";
import {
  ErrorContainer,
  Fallback,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, GET, PUT } from "api";
// import fetcher from "../../../../../../func/fetcher";
import SampleInfoTable1 from "./SampleInfoTable1";
import SampleInfoTable2 from "./SampleInfoTable2";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useParams } from "next/navigation";

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
  const { mutate } = useSWRConfig();
  const params = useParams();
  const orderUkey = params.slug;
  const apiUrl = `/sample/${sampleUkey}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useSWR(() => apiUrl, fetcher, {
    suspense: true,
  });
  const sampleInfoData = data;

  console.log("EEEEEEEE", data);
  const sampleStatusRes = sampleInfoData.sampleStatusRes;
  const defaultValues = async () => {
    const res = await GET(apiUrl);
    // const data = await res.json();
    console.log("resresre", res.data);

    return res.data;
  };

  const onSubmit = async (data: any) => {
    console.log("sampleInfoModify Add", data);

    const bodyData = {
      depthMc: data.depthMc,
      isVrfc: data.isVrfc,
      mcNmCc: data.mcNmCc,
      memo: data.memo,
      prgrAgncNmCc: data.prgrAgncNmCc,
      sampleNm: data.sampleNm,
      sampleTypeCc: data.sampleTypeCc,
      source: data.source,
      taxonCc: data.taxonCc,
    };

    console.log("BODYDATA ==>", bodyData);

    await PUT(apiUrl, bodyData)
      .then((response) => {
        console.log("POST request successful:", response.success);
        if (response.success) {
          mutate(`/order/${orderUkey}/sample/list`);
          handleClose();
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };

  const handleClose = () => {
    setIsLoading(false);
    onClose();
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>샘플 정보</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="sampleInfoModify"
        >
          <ErrorContainer FallbackComponent={Fallback}>
            <SampleInfoTable1 sampleInfoData={sampleInfoData} />
            <SampleInfoTable2 sampleStatusRes={sampleStatusRes} />
          </ErrorContainer>
        </Form>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAgncModifyLog apiName="sample/status" uKey={sampleUkey} />
        </ErrorContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton
          buttonName="닫기"
          onClick={handleClose}
          color="secondary"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="sampleInfoModify"
        >
          저장
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default SampleInfoModal;
