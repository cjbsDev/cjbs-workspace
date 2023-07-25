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
  const onSubmit = (data: any) => {
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
      console.log("수정");
      apiUrl =
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr/` +
        uniqueCode;

      axios
        .put(apiUrl, saveObj)
        .then((response) => {
          console.log("수정", response.data);
          if (response.data.success) {
            onClose(); // 모달 닫기
            renderList();
          } else {
            console.log("act");
            console.log("코드 수정 오류 1 ", response.data.message);
          }
        })
        .catch((error) => {
          console.error("코드 수정 오류 2", error);
        });
    } else {
      console.log("추가");
      apiUrl =
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/mngr/masterCode/` +
        uniqueCode;

      axios
        .post(apiUrl, saveObj)
        .then((response) => {
          console.log("추가", response.data);
          if (response.data.success) {
            onClose(); // 모달 닫기
            renderList();
          } else {
            console.log("act");
            console.log("코드 추가 오류 1 ", response.data.message);
          }
        })
        .catch((error) => {
          console.error("코드 추가 오류 2", error);
        });
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
                        errorMessage="필수 입력 입니다."
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
                        errorMessage="필수 입력 입니다."
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
                        errorMessage="필수 입력 입니다."
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
