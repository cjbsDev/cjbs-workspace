import React, { useState } from "react";
import {
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DepositInfoDynamicTable from "./DepositInfoDynamicTable";
import useSWR, { useSWRConfig } from "swr";
import { fetcher, POST, PUT } from "api";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const Index = ({ onClose, open, modalWidth }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const invcUkey = params.slug;
  const { data } = useSWR(`/invc/${invcUkey}/dpst`, fetcher, {
    suspense: true,
  });

  const { mutate } = useSWRConfig();

  const convertDpstDttmToDate = (data) => {
    return data.map((item) => ({
      ...item,
      dpstDttm: new Date(item.dpstDttm),
    }));
  };

  const updatedData = convertDpstDttmToDate(data);

  console.log("#$#$#$##$#$#$", updatedData);

  const defaultValues = {
    invcDpstList: updatedData,
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const convertDpstDttmToFormattedDate = (data) => {
      return data.invcDpstList.map((item) => ({
        ...item,
        dpstDttm: dayjs(item.dpstDttm).format("YYYY-MM-DD"),
      }));
    };

    const updatedData = {
      invcDpstList: convertDpstDttmToFormattedDate(data),
    };

    console.log("Deposit Form Data String ==>>", updatedData);

    try {
      const res = await PUT(`/invc/${invcUkey}/dpst`, updatedData);

      if (res.success) {
        console.log("SUCCESS", res);
        mutate(`/invc/${invcUkey}/dpst`);
        mutate(`/invc/${invcUkey}`);
        onClose();
        // router.push("/ledger-tax-invoice-list");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("발행 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalContainer
        onClose={onClose}
        open={open}
        modalWidth={modalWidth}
        overflowY="visible"
      >
        <ModalTitle onClose={onClose}>입금 정보 입력</ModalTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            id="depositInfoForm"
          >
            <DepositInfoDynamicTable />
          </Form>
        </DialogContent>
        <Divider sx={{ mx: 3 }} />
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={onClose}
            color="secondary"
            size="small"
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            size="small"
            type="submit"
            form="depositInfoForm"
          >
            저장
          </LoadingButton>
        </ModalAction>
      </ModalContainer>
    </>
  );
};

export default Index;
