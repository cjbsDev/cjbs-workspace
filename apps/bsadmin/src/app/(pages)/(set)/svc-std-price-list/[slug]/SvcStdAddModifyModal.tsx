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
  sampleSizeStart: string;
  sampleSizeEnd: string;
  stndDscntPctg: string;
  prep: string;
  qc: string;
  lib: string;
  seq: string;
  bi: string;
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

  //console.log("yes selectItem", selectItem);

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);

    // {
    //   "sampleSizeStart": 0,
    //   "sampleSizeEnd": 0,
    //   "bi": 0,
    //   "isUse": "사용여부",
    //   "lib": 0,
    //   "prep": 0,
    //   "qc": 0,
    //   "seq": 0,
    //   "stndDscntPctg": 0
    // }

    /*
    const saveObj: DataItem = {
      codeNm: data.codeNm,
      codeValue: data.codeValue,
      detailUniqueCode: data.detailUniqueCode,
      douzoneCode: data.douzoneCode,
      isExpsOrsh: data.isExpsOrsh,
      isRls: data.isRls,
    };
    console.log("==saveObj", saveObj);
    console.log(stndPriceMpngUkey + "saveObj stringify", JSON.stringify(saveObj));

    //let apiUrl = ${process.env.NEXT_PUBLIC_API_URL}
    //const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/${stndPriceMpngUkey}`;

    let apiUrl = "";
    if (selectItem.detailUniqueCode) {
      //apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/` + stndPriceMpngUkey;
      // ~ /mngr/{stndPriceMpngUkey} -> ~/mngr/masterCode/{stndPriceMpngUkey}
      apiUrl = `/mngr/masterCode/` + stndPriceMpngUkey;

      try {
        const response = await PUT(apiUrl, saveObj); // API 요청
        if (response.success) {
          onClose(); // 모달 닫기
          renderList();
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast("코드 수정 오류. 01");
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02");
      }
    } else {
      console.log("추가 -01");
      apiUrl = `/mngr/masterCode/` + stndPriceMpngUkey;

      try {
        const response = await POST(apiUrl, saveObj); // API 요청
        if (response.success) {
          onClose(); // 모달 닫기
          renderList();
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast("코드 수정 오류. 01");
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02");
      }
    }
    */
  };

  interface DataItem {
    stndPriceDetailId: string;
    stndPriceDetailUkey: string;
    sampleSizeStart: string;
    sampleSizeEnd: string;
    stndDscntPctg: string;
    prep: string;
    qc: string;
    lib: string;
    seq: string;
    bi: string;
    isUse: string;
  }

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

  //const defaultValues = {};
  //console.log("selectItem", selectItem);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        코드 {selectItem.stndPriceDetailUkey ? "수정" : "추가"}
      </ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  {/* <TD>{dataItem.stndPriceDetailId}</TD>
                  <TD>
                    {dataItem.sampleSizeStart} ~ {dataItem.sampleSizeEnd}
                  </TD>
                  <TD>{dataItem.stndDscntPctg}</TD>
                  <TD>{dataItem.prep}</TD>
                  <TD>{dataItem.qc}</TD>
                  <TD>{dataItem.lib}</TD>
                  <TD>{dataItem.seq}</TD>
                  <TD>{dataItem.bi}</TD>
                  <TD>{dataItem.isUse}</TD> */}

                  <TH sx={{ width: "25%" }}>수량</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="sampleSizeStart"
                        disabled={false}
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
                        disabled={false}
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
                        disabled={false}
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
