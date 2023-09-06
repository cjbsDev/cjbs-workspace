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
  departCodeMc: string;
  departCodeMcVal: string;
  prjcMngrNm: string;
  prjcMngrUkey: string;
  prjcNm: string;
  prjcUkey: string;
  prjcUniqueCode: string;
}

const LazySelectDept = dynamic(() => import("../../DeptMng/SelectDept"), {
  ssr: false,
  loading: () => <Typography variant="body2">Loading...</Typography>,
});

const LazySelectDeptMng = dynamic(() => import("../../DeptMng/SelectDeptMng"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

interface ProjectModifyModalProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  selectItem: DataItem;
  prjcUkey: string;
  renderList: () => void;
  //renderList: (saveObj: DataItem) => void;
}

const ProjectModifyModal = ({
  onClose,
  open,
  modalWidth,
  selectItem,
  prjcUkey,
  renderList,
}: ProjectModifyModalProps) => {
  const router = useRouter();

  // [ 추가 & 수정 ]
  const onSubmit = async (data: any) => {
    let saveObj = {
      departCodeMc: data.departCodeMc,
      isPrjcDetailUse: "Y",
      prjcMngrUkey: data.prjcMngrUkey,
      prjcUniqueCode: data.prjcUniqueCode,
    };
    // {"departCodeMc":"BS_0100003012","isPrjcDetailUse":"Y","prjcMngrUkey":"user809094","prjcUniqueCode":"BS_0100002001"}
    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));
    const apiUrl = `/mngr/prjc/${prjcUkey}`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        onClose();
        renderList();
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  const defaultValues = {
    prjcUniqueCode: selectItem.prjcUniqueCode,
    prjcUkey: selectItem.prjcUkey,
    prjcNm: selectItem.prjcNm,
    departCodeMc: selectItem.departCodeMc,
    departCodeMcVal: selectItem.departCodeMcVal,
    prjcMngrUkey: selectItem.prjcMngrUkey,
    prjcMngrNm: selectItem.prjcMngrNm,
  };

  //const defaultValues = {};
  //console.log("selectItem", selectItem);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>
        과제 정보 {selectItem.prjcUkey ? "수정" : "등록"}
      </ModalTitle>
      <DialogContent>
        <Form onSubmit={onSubmit} defaultValues={defaultValues}>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "252px" }}>과제</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    {selectItem.prjcNm ?? ""}
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "252px" }}>수행부서</TH>{" "}
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LazySelectDept />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "252px" }}>과제 담당자</TH>
                  <TD sx={{ width: "488px" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <LazySelectDeptMng />
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

export default ProjectModifyModal;
