import React, { useMemo, useState } from "react";
import {
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { DialogContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { PUT } from "api";
import { toast } from "react-toastify";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  invcEndMonthAtom,
  invcEndYearAtom,
  invcStartMonthAtom,
  invcStartYearAtom,
  memoModifyAtom,
} from "../../../atom";
import { useSWRConfig } from "swr";
import { useResultObject } from "../../../../../../../components/KeywordSearch/useResultObject";

const Index = ({ onClose, open, modalWidth }) => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultObject, result] = useResultObject();
  const [memoModifyValue, setMemoModifyValue] = useRecoilState(memoModifyAtom);
  const startYear = useRecoilValue(invcStartYearAtom);
  const startMonth = useRecoilValue(invcStartMonthAtom);
  const endYear = useRecoilValue(invcEndYearAtom);
  const endMonth = useRecoilValue(invcEndMonthAtom);
  const { memo, invcUkey } = memoModifyValue;

  const defaultValues = {
    ...memoModifyValue,
  };

  const url = useMemo(() => {
    const base = "/invc/list";
    const params =
      JSON.stringify(resultObject) !== "{}"
        ? `${result}&page=1&size=100&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`
        : `?page=1&size=100&startYear=${startYear}&startMonth=${startMonth}&endYear=${endYear}&endMonth=${endMonth}`;
    return `${base}${params}`;
  }, [resultObject, result, startYear, startMonth, endYear, endMonth]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const reqBody = {
      invcUkey: memoModifyValue.invcUkey,
      memo: data.memo,
    };

    console.log("reqBody", reqBody);

    try {
      const res = await PUT(`/invc/${invcUkey}/memo`, reqBody);

      if (res.success) {
        console.log("SUCCESS", res);
        setMemoModifyValue({
          ...memoModifyValue,
          isOpen: false,
        });
        mutate(url);
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
    <ModalContainer
      onClose={onClose}
      open={open}
      modalWidth={modalWidth}
      overflowY="visible"
    >
      <ModalTitle onClose={onClose}>메모</ModalTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          id="memoModifyForm"
        >
          <InputValidation
            fullWidth={true}
            multiline
            rows={4}
            inputName="memo"
            placeholder="메모"
            maxLength={500}
            maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
          />
        </Form>
      </DialogContent>
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
          type="submit"
          form="memoModifyForm"
          size="small"
        >
          수정
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default Index;
