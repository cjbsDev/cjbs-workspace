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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { PUT, POST } from "api";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface DataItem {
  detailUniqueCode: string;
  douzoneCode: string;
  codeNm: string;
  codeValue: string;
  isExpsOrsh: string;
  isRls: string;
}

interface MCItemModifyModalProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem?: DataItem | undefined;
}

const MCItemModifyModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
}: MCItemModifyModalProps) => {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const searchParams = useSearchParams();
  const search = searchParams.get("type");
  console.log("TYPE", search);
  //console.log("yes selectItem", selectItem);

  const defaultValues =
    search === "add"
      ? undefined
      : {
          ...selectItem,
          isExpsOrsh: selectItem?.isExpsOrsh ? selectItem.isExpsOrsh : "Y",
          isRls: selectItem?.isRls ? selectItem.isRls : "Y",
        };

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);
    const saveObj: DataItem = {
      ...data,
    };
    console.log("==saveObj", saveObj);
    console.log(slug + "saveObj stringify", JSON.stringify(saveObj));

    let apiUrl = "";
    if (selectItem?.detailUniqueCode) {
      apiUrl = `/mngr/masterCode/` + slug;

      try {
        const response = await PUT(apiUrl, saveObj); // API 요청
        if (response.success) {
          onClose(); // 모달 닫기
          mutate(`/mngr/masterCode/detail/${slug}?page=1&size=50`);
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast(response.message);
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02");
      }
    } else {
      console.log("추가 -01");
      apiUrl = `/mngr/masterCode/` + slug;

      try {
        const response = await POST(apiUrl, saveObj); // API 요청
        if (response.success) {
          console.log("ADD ==>>", response);
          onClose(); // 모달 닫기
          mutate(`/mngr/masterCode/detail/${slug}?page=1&size=50`);
        } else if (response.code == "INVALID_AUTHORITY") {
          toast("권한이 없습니다.");
        } else {
          toast(response.message);
        }
      } catch (error) {
        console.error("request failed:", error);
        toast("문제가 발생했습니다. 02");
      }
    }
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        코드 {selectItem?.detailUniqueCode ? "수정" : "추가"}
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
                        // pattern={/^[\u3131-\u314E\u314F-\u3163가-힣]*$/}
                        patternErrMsg="한국어만 입력가능합니다."
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
                        pattern={/^[^\uAC00-\uD7A3]+$/}
                        patternErrMsg="영어만 입력가능합니다."
                        maxLength={100}
                        maxLengthErrMsg="상세 코드명은 100자 이내로 입력해주세요."
                        sx={{ width: 400 }}
                      />
                    </Stack>
                  </TD>
                </TableRow>
                {/*<TableRow>*/}
                {/*  <TH sx={{ width: "25%" }}>주문서 노출</TH>*/}
                {/*  <TD sx={{ width: "75%" }} colSpan={5}>*/}
                {/*    <Stack direction="row" spacing={0.5} alignItems="center">*/}
                {/*      <SelectBox*/}
                {/*        inputName="isExpsOrsh"*/}
                {/*        options={[*/}
                {/*          { value: "Y", optionName: "노출" },*/}
                {/*          { value: "N", optionName: "노출안함" },*/}
                {/*        ]}*/}
                {/*        defaultOption={false}*/}
                {/*      />*/}
                {/*    </Stack>*/}
                {/*  </TD>*/}
                {/*</TableRow>*/}

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
