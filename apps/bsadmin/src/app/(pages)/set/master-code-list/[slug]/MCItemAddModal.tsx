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
import useSWR from "swr";
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

interface DataItem {
  detailUniqueCode: string;
  douzoneCode: string;
  codeNm: string;
  codeValue: string;
  isExpsOrsh: string;
  isRls: string;
}

interface MCItemAddModalProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem?: DataItem;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// https://dummyjson.com/products?limit=10&skip=10
const MCItemAddModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
}: //DataItem,
MCItemAddModalProps) => {
  const router = useRouter();

  console.log("yes selectItem", selectItem);

  // [ 추가 & 수정 ]
  const onSubmit = (data: any) => {
    console.log("in onSubmit", data);

    let saveObj = {
      codeNm: data.codeNm,
      codeValue: data.codeValue,
      detailUniqueCode: data.detailUniqueCode,
      douzoneCode: data.douzoneCode,
      isExpsOrsh: data.isExpsOrsh,
      isRls: data.isRls,
    };
    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));
    const apiUrl =
      `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr/` +
      data.detailUniqueCode; // Replace with your API URL
    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("등록 successful:", response.data);
        if (response.data.success) {
          onClose(); // 모달 닫기
        }
      })
      .catch((error) => {
        console.error("코드 수정 failed:", error);
      });
  };

  const defaultValues = {
    detailUniqueCode: selectItem ? selectItem.detailUniqueCode : "",
    douzoneCode: selectItem.douzoneCode ?? "",
    codeNm: selectItem.codeNm ?? "",
    codeValue: selectItem.codeValue ?? "",
    isExpsOrsh: selectItem.isExpsOrsh ?? "",
    isRls: selectItem.isRls ?? "",
  };

  //const defaultValues = {};

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>코드 수정</ModalTitle>
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
                        errorMessage="상세 코드는 필수 입니다."
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
                        errorMessage={false}
                        sx={{ width: 400 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "25%" }}>상세코드명(영문)</TH>
                  <TD sx={{ width: "75%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        inputName="codeValue"
                        errorMessage={false}
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
                      />
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="취소"
              onClick={() => router.push("/set/master-code-list")}
            />
            <ContainedButton type="submit" buttonName="저장" />
          </Stack>
        </Form>
      </DialogContent>
    </ModalContainer>
  );
};

export default MCItemAddModal;
