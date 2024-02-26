import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
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
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PUT, POST } from "api";
import { toast } from "react-toastify";

interface DataItem {
  codeNm: string;
  codeValue: string;
  detailUniqueCode: string;
  douzoneCode: string;
  isExpsOrsh: string;
  isRls: string;
}

interface ProjectDetailAddModifyModalProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem: DataItem;
  prjcUkey: string;
  renderList: () => void;
}

const ProjectDetailAddModifyModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
  prjcUkey,
  renderList,
}: ProjectDetailAddModifyModalProps) => {
  const router = useRouter();

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    console.log("onSubmit data", data);

    let saveObj = {
      codeNm: data.codeNm,
      codeValue: data.codeValue,
      detailUniqueCode: data.detailUniqueCode,
      douzoneCode: data.douzoneCode,
      isExpsOrsh: "Y",
      isRls: data.isRls,
    };

    // {"departCodeMc":"BS_0100003012","isPrjcDetailUse":"Y","prjcMngrUkey":"user809094","prjcUniqueCode":"BS_0100002001"}
    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    let apiUrl = "";
    if (selectItem.detailUniqueCode) {
      apiUrl = `/mngr/prjtDetail/` + selectItem.detailUniqueCode;

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
      apiUrl = `/mngr/prjtDetail/` + prjcUkey;

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
    codeNm: selectItem.codeNm,
    codeValue: selectItem.codeValue,
    detailUniqueCode: selectItem.detailUniqueCode,
    douzoneCode: selectItem.douzoneCode,
    isExpsOrsh: selectItem.isExpsOrsh,
    isRls: selectItem.detailUniqueCode ? selectItem.isRls : "Y",
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        세부 연구 {selectItem.detailUniqueCode ? "수정" : "추가"}
      </ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "252px" }}>연구 코드</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <InputValidation
                      inputName="douzoneCode"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="연구 코드"
                      sx={{ width: 456 }}
                    />
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "252px" }}>연구명 (국문)</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <InputValidation
                      inputName="codeNm"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="연구명"
                      sx={{ width: 456 }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "252px" }}>연구명 (영문)</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <InputValidation
                      inputName="codeValue"
                      disabled={false}
                      required={true}
                      errorMessage="필수 입력값입니다."
                      placeholder="연구명"
                      sx={{ width: 456 }}
                    />
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "252px" }}>사용 여부</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <SelectBox
                      inputName="isRls"
                      options={[
                        { value: "Y", optionName: "사용" },
                        { value: "N", optionName: "사용 안함" },
                      ]}
                      defaultOption={selectItem.detailUniqueCode ? false : true}
                      required={true}
                      sx={{ width: 200 }}
                    />
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

export default ProjectDetailAddModifyModal;
