import React, { useState } from "react";
import { ModalContainerProps } from "../../../../../../types/ModalContainerProps";
import useSWR, { useSWRConfig } from "swr";
import {
  ErrorContainer,
  Fallback,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  RadioGV,
  SkeletonLoading,
} from "cjbsDSTM";
import { Box, DialogContent, Grid } from "@mui/material";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import SampleBatchInputs from "./SampleBatchInputs";
import AlertContentBox from "./AlertContentBox";
import DialogContentTitle from "./DialogContentTitle";
import ActionButtons from "./ActionButtons";
import { PUT } from "api";
import { toast } from "react-toastify";

interface SampleBathcChangeModalProps extends ModalContainerProps {
  sampleUkeyList: string[];
  sampleIdList: number[];
}

const LazySampleNoNm = dynamic(() => import("./SampleNoNm"), {
  ssr: false,
  loading: () => <SkeletonLoading height={300} />,
});

const dataRadio = [
  { value: "sampleNm", optionName: "샘플명" },
  { value: "altrNm", optionName: "대체명" },
  { value: "source", optionName: "Source" },
  { value: "memo", optionName: "메모" },
  { value: "etc", optionName: "기타" },
];

const apiUrl = `/sample/update`;
const apiUrl2 = `/sample/update/options`;
const SampleBatchChangeModal = (props: SampleBathcChangeModalProps) => {
  const { onClose, open, modalWidth, sampleUkeyList, sampleIdList } = props;
  const { mutate } = useSWRConfig();
  const params = useParams();
  const orderUkey = params.slug;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const defaultValues = {
    categoryNm: "sampleNm",
  };

  console.log("sampleUkeyList", sampleUkeyList);
  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form DATA ==>>", data);

    try {
      const selectedCtNm = data.categoryNm;
      const arraySampleList = data.changeContentList.split("\n");

      let bodyData = {};
      if (selectedCtNm === "etc") {
        console.log("ETC ~~!@@@@@");
        const makeNewSampleList2 = sampleIdList.map((item) => ({
          sampleId: item,
        }));

        const { isVrfc, mcNmCc, prgrAgncNmCc, sampleTypeCc, taxonCc, depthMc } =
          data;

        bodyData = {
          depthMc,
          isVrfc: isVrfc === "" ? null : isVrfc,
          mcNmCc,
          prgrAgncNmCc,
          sampleTypeCc,
          taxonCc,
          sampleList: makeNewSampleList2,
        };
      } else {
        const makeNewSampleList = sampleIdList.map((item, index) => ({
          sampleId: item,
          targetVal:
            arraySampleList[index] === undefined
              ? null
              : arraySampleList[index],
        }));

        bodyData = {
          targetItem: selectedCtNm,
          sampleList: makeNewSampleList,
        };
      }

      console.log("BODYDATA ==>", bodyData);

      const response = await PUT(
        selectedCtNm === "etc" ? apiUrl2 : apiUrl,
        bodyData
      );

      console.log("PUT request successful:", response.success);

      if (response.success) {
        mutate(`/order/${orderUkey}/sample/list`);
        handleClose();
      } else {
        // 실패 처리 로직
        // handleAlertClick();
        // setErrorMsg(response.data.message);
        toast(response.message);
      }
    } catch (error) {
      console.error("Request Failed:", error);
      // 에러 처리 로직
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>샘플 정보 일괄 변경</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="sampleBatchChange"
        >
          <DialogContentTitle />
          <Box sx={{ mb: 1 }}>
            <RadioGV
              data={dataRadio}
              inputName="categoryNm"
              required={true}
              errorMessage="항목을 선택 하세요."
            />
          </Box>
          <AlertContentBox />
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySampleNoNm sampleUkeyList={sampleUkeyList} />
              </ErrorContainer>
            </Grid>
            <Grid item xs={6}>
              <SampleBatchInputs />
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
      <ModalAction>
        <ActionButtons handleClose={handleClose} isLoading={isLoading} />
      </ModalAction>
    </ModalContainer>
  );
};

export default SampleBatchChangeModal;
