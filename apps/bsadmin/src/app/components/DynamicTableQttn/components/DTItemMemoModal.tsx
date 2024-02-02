import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import {
  useFormContext,
  useForm,
  FormProvider,
  useWatch,
} from "react-hook-form";
import {
  ModalContainer,
  ModalTitle,
  ContainedButton,
  OutlinedButton,
  InputValidation,
  Form,
  TD,
} from "cjbsDSTM";
import {
  DialogContent,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

interface DataItem {
  index: number;
  anlsTypeMc: string;
  inputName: string;
}

interface DTItemModifyModalProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  index: number;
  inputName: string;
  selectItem: DataItem;
  onSave: () => void;
  modifiedMemo: string;
}

const DTItemModifyModal = ({
  onClose,
  open,
  modalWidth,
  index,
  inputName,
  selectItem,
  onSave,
  modifiedMemo,
}: DTItemModifyModalProps) => {
  const methods = useFormContext(); // 이미 useFormContext를 사용하는 경우에는 이 부분을 그대로 유지
  const { setValue } = methods;

  // API 데이터 로드
  const { data, error, isValidating } = useSWR(
    selectItem.anlsTypeMc
      ? `/mngr/esPrMng/anlsType/${selectItem.anlsTypeMc}`
      : null,
    fetcher
  );

  useEffect(() => {
    // 수정된 inclMemo 값이 있으면 그 값을 사용, 없으면 API에서 불러온 inclInfo 값을 사용
    const memoValue = modifiedMemo ?? data?.inclInfo;
    if (memoValue) {
      setValue(inputName, memoValue);
    }
  }, [data, modifiedMemo, setValue, inputName]);

  const handleSave = () => {
    const memoValue = methods.getValues(inputName);
    onSave(index, memoValue); // 부모 컴포넌트의 상태 업데이트 함수 호출
    onClose(); // 모달 닫기
  };

  const handleCancel = () => {
    console.log("modifiedMemo", modifiedMemo);
    if (modifiedMemo) {
      setValue(inputName, modifiedMemo);
    } else {
      const memoValue = modifiedMemo ?? data?.inclInfo;
      if (memoValue) {
        setValue(inputName, memoValue);
      }
    }

    onClose(); // 모달 닫기
  };

  if (!data) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <ModalContainer
        onClose={handleCancel}
        open={open}
        modalWidth={modalWidth}
      >
        <ModalTitle onClose={handleCancel} desctext={data?.prNm ?? ""}>
          품명
        </ModalTitle>
        <DialogContent>
          <Typography variant="subtitle1">포함 사항</Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TD>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={10}
                      inputName={inputName}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton buttonName="취소" onClick={handleCancel} />
            <ContainedButton buttonName="저장" onClick={handleSave} />
            {/* <ContainedButton buttonName="저장" onClick={onClose} /> */}
          </Stack>
        </DialogContent>
      </ModalContainer>
    </FormProvider>
  );
};

export default DTItemModifyModal;
