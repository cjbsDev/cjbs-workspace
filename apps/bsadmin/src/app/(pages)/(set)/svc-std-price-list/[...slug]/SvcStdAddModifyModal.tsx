import React, { useState, useMemo } from "react";

import {
  ModalContainer,
  ModalTitle,
  ContainedButton,
  OutlinedButton,
  TH,
  TD,
  InputValidation,
  SelectBox,
  Form,
} from "cjbsDSTM";
import {
  DialogContent,
  Stack,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PUT, POST } from "api";
import { toast } from "react-toastify";

interface DataItem {
  stndPriceDetailId: string;
  stndPriceDetailUkey: string;
  sampleSizeStart: number;
  sampleSizeEnd: number;
  stndDscntPctg: number;
  prep: number;
  qc: number;
  lib: number;
  seq: number;
  bi: number;
  isUse: string;
}

interface SvcStdAddModifyModalProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem: DataItem;
  stndPriceMpngUkey: string;
  renderList: () => void;
  //renderList: (saveObj: DataItem) => void;
}

const SvcStdAddModifyModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
  stndPriceMpngUkey,
  renderList,
}: SvcStdAddModifyModalProps) => {
  const router = useRouter();

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in SvcStdAddModifyModal onSubmit", data);

    const saveObj: DataItem = {
      stndPriceDetailId: data.stndPriceDetailId,
      stndPriceDetailUkey: data.stndPriceDetailUkey,
      sampleSizeStart: data.sampleSizeStart,
      sampleSizeEnd: data.sampleSizeEnd,
      bi: data.bi,
      lib: data.lib,
      prep: data.prep,
      qc: data.qc,
      seq: data.seq,
      stndDscntPctg: data.stndDscntPctg,
      isUse: data.isUse,
    };

    console.log("==saveObj", saveObj);
    console.log(
      stndPriceMpngUkey + "saveObj stringify",
      JSON.stringify(saveObj)
    );

    let apiUrl = "";
    console.log(
      "selectItem.stndPriceDetailUkey",
      selectItem.stndPriceDetailUkey
    );
    if (selectItem.stndPriceDetailUkey) {
      apiUrl = `/mngr/stndPrice/` + selectItem.stndPriceDetailUkey;
      try {
        const response = await PUT(apiUrl, saveObj); // API 요청
        console.log("코드 수정 response", response);
        if (response.success) {
          onClose(); // 모달 닫기
          renderList();
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast("코드 수정 오류. 01 \n" + response.message);
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02");
      }
    } else {
      console.log("추가 -01");
      apiUrl = `/mngr/stndPrice/` + stndPriceMpngUkey;

      try {
        const response = await POST(apiUrl, saveObj); // API 요청
        console.log("추가 response", response);
        if (response.success) {
          onClose(); // 모달 닫기
          renderList();
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast("코드 추가 오류. 01 \n" + response.message);
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02-2");
      }
    }
  };

  const defaultValues = {
    stndPriceDetailId: selectItem.stndPriceDetailId,
    stndPriceDetailUkey: selectItem.stndPriceDetailUkey,
    sampleSizeStart: selectItem.sampleSizeStart,
    sampleSizeEnd: selectItem.sampleSizeEnd,
    stndDscntPctg: selectItem.stndDscntPctg,
    prep: selectItem.prep,
    qc: selectItem.qc,
    lib: selectItem.lib,
    seq: selectItem.seq,
    bi: selectItem.bi,
    isUse: selectItem.isUse ? selectItem.isUse : "Y",
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        기준가 코드 {selectItem.stndPriceDetailUkey ? "수정" : "추가"}
      </ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                {selectItem.stndPriceDetailUkey && (
                  <>
                    <TableRow>
                      <TH sx={{ width: "25%" }}>기준가 코드</TH>
                      <TD sx={{ width: "75%" }} colSpan={5}>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          sx={{ mr: 1 }}
                        >
                          {selectItem.stndPriceDetailId}
                        </Stack>
                      </TD>
                    </TableRow>
                  </>
                )}

                <TableRow>
                  <TH sx={{ width: "25%" }}>수량</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="sampleSizeStart"
                        disabled={selectItem.stndPriceDetailUkey ? true : false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="최소 수량"
                        sx={{ width: 100, mr: 1 }}
                      />
                      -
                      <InputValidation
                        inputName="sampleSizeEnd"
                        disabled={selectItem.stndPriceDetailUkey ? true : false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="최대 수량"
                        sx={{ width: 100, ml: 1 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "25%" }}>기준 할인율(%)</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="stndDscntPctg"
                        disabled={false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="할인율"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "25%" }}>Prep</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="prep"
                        disabled={true}
                        //disabled={selectItem.stndPriceDetailUkey ? false : true}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="Prep"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>QC</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="qc"
                        disabled={true}
                        //disabled={selectItem.stndPriceDetailUkey ? false : true}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="qc"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>Lib</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="lib"
                        disabled={false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="qc"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>Seq</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="seq"
                        disabled={false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="seq"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>BI</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="bi"
                        disabled={false}
                        required={true}
                        pattern={/^[0-9]+$/}
                        patternErrMsg="숫자만 입력해주세요."
                        errorMessage="필수 입력값입니다."
                        placeholder="bi"
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>사용 여부</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SelectBox
                        inputName="isUse"
                        options={[
                          { value: "Y", optionName: "사용" },
                          { value: "N", optionName: "사용안함" },
                        ]}
                        defaultOption={false}
                        sx={{ width: 100 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton buttonName="취소" onClick={onClose} />
            <ContainedButton type="submit" buttonName="저장" />
          </Stack>
        </Form>
      </DialogContent>
    </ModalContainer>
  );
};

export default SvcStdAddModifyModal;
