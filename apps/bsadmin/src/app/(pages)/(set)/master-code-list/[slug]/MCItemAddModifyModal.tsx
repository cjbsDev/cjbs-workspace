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
  detailUniqueCode: string;
  douzoneCode: string;
  codeNm: string;
  codeValue: string;
  isExpsOrsh: string;
  isRls: string;
}

interface MCItemModifyModalProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem: DataItem;
  uniqueCode: string;
  renderList: () => void;
  //renderList: (saveObj: DataItem) => void;
}

const MCItemModifyModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
  uniqueCode,
  renderList,
}: MCItemModifyModalProps) => {
  const router = useRouter();

  //console.log("yes selectItem", selectItem);

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);

    const saveObj: DataItem = {
      codeNm: data.codeNm,
      codeValue: data.codeValue,
      detailUniqueCode: data.detailUniqueCode,
      douzoneCode: data.douzoneCode,
      isExpsOrsh: data.isExpsOrsh,
      isRls: data.isRls,
    };
    console.log("==saveObj", saveObj);
    console.log(uniqueCode + "saveObj stringify", JSON.stringify(saveObj));

    //let apiUrl = ${process.env.NEXT_PUBLIC_API_URL}
    //const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/${uniqueCode}`;

    let apiUrl = "";
    if (selectItem.detailUniqueCode) {
      //apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/` + uniqueCode;
      // ~ /mngr/{uniqueCode} -> ~/mngr/masterCode/{uniqueCode}
      apiUrl =
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/masterCode/` + uniqueCode;

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
      apiUrl =
        `${process.env.NEXT_PUBLIC_API_URL}/mngr/masterCode/` + uniqueCode;

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
  };

  const defaultValues = {
    detailUniqueCode: selectItem.detailUniqueCode,
    douzoneCode: selectItem.douzoneCode,
    codeNm: selectItem.codeNm,
    codeValue: selectItem.codeValue,
    isExpsOrsh: selectItem.isExpsOrsh ? selectItem.isExpsOrsh : "Y",
    isRls: selectItem.isRls ? selectItem.isRls : "Y",
  };

  //const defaultValues = {};
  //console.log("selectItem", selectItem);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        코드 {selectItem.detailUniqueCode ? "수정" : "추가"}
      </ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "25%" }}>상세코드 ID</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="douzoneCode"
                        required={true}
                        errorMessage={"더존 코드를 입력해주세요."}
                        pattern={/^[A-Za-z0-9-]*$/}
                        patternErrMsg="영문, 숫자, -(하이픈)만 입력 가능합니다."
                        maxLength={16}
                        maxLengthErrMsg="상세 코드는 16자 이내로 입력해주세요."
                        sx={{ width: 400 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "25%" }}>상세코드명(국문)</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="codeNm"
                        required={true}
                        errorMessage={"상세코드명(국문)을 입력해주세요."}
                        //pattern={/^[가-힣]*$/}
                        //patternErrMsg="한국어만 입력가능합니다."
                        maxLength={100}
                        maxLengthErrMsg="상세 코드명은 100자 이내로 입력해주세요."
                        sx={{ width: 400 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>상세코드명(영문) 선택</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="codeValue"
                        //pattern={/^[A-Za-z]*$/}
                        //patternErrMsg="영어만 입력가능합니다."
                        maxLength={100}
                        maxLengthErrMsg="상세 코드명은 100자 이내로 입력해주세요."
                        sx={{ width: 400 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>주문서 노출</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SelectBox
                        inputName="isExpsOrsh"
                        options={[
                          { value: "Y", optionName: "노출" },
                          { value: "N", optionName: "노출안함" },
                        ]}
                        defaultOption={false}
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "25%" }}>사용 여부</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <SelectBox
                        inputName="isRls"
                        options={[
                          { value: "Y", optionName: "사용" },
                          { value: "N", optionName: "사용안함" },
                        ]}
                        defaultOption={false}
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

export default MCItemModifyModal;
