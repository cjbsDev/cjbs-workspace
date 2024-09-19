import React, { useState } from "react";
import {
  CheckboxSV,
  Form,
  InputValidation,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SelectBox,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Box,
  DialogContent,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { POST_MULTIPART, PUT_MULTIPART } from "api";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useSWRConfig } from "swr";
import { useDropzone } from "react-dropzone";
import FileDropzone from "./FileDropzone";
import { useRecoilState } from "recoil";
import { isDisabledAtom } from "../../../../../recoil/atoms/modalAtom";
import { getValue } from "@mui/system";
import FileUploadAddInfo from "./FileUploadAddInfo";

const FileUploadModal = (props) => {
  const { onClose, open, modalWidth, formId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();
  const [isDis, setIsDis] = useRecoilState(isDisabledAtom);

  const handleClose = () => {
    onClose();
    setIsDis(true);
  };

  const apiUrl = `/order/${orderUkey}/file`;
  const onSubmit = async (data: any) => {
    console.log("SUMMIT FORM DATA ==>>", data);
    setIsLoading(true);

    const bodyData = {
      fileDesc: data.fileDesc,
      isSendQCEmail: data.isSendQCEmail === true ? "Y" : "N",
      qcEmailTemplateCc: data.qcEmailTemplateCc,
    };

    console.log("BODYDATA ==>>", bodyData);

    const formData = new FormData();
    formData.append(
      "user-data",
      new Blob([JSON.stringify(bodyData)], { type: "application/json" }),
    );

    console.log("BODYDATAFORM ==>>", formData);

    if (data.uploadFile.length > 0) {
      // 파일 데이터가 있는 경우
      // console.log(typeof data.uploadFile);
      Array.from(data.uploadFile).forEach((file: any) => {
        formData.append("file-data", file);
      });
    } else {
      formData.append("file-data", null);
    }

    try {
      const response = await POST_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);

      if (response.data.success) {
        // toast("수정 되었습니다.");
        // router.push("/order-list");
        onClose();
        mutate(`/order/${orderUkey}/file/list`);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.error("request failed:", error);
    } finally {
      setIsLoading(false);
      setIsDis(true);
    }
  };

  return (
    <>
      <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
        <ModalTitle onClose={handleClose}>파일 업로드</ModalTitle>
        <DialogContent>
          <Form onSubmit={onSubmit} id={formId}>
            <Box sx={{ mb: 2 }}>
              <FileDropzone />
            </Box>
            <FileUploadAddInfo />
          </Form>
        </DialogContent>
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={handleClose}
            color="secondary"
            size="small"
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            form={formId}
            disabled={isDis}
            size="small"
          >
            등록
          </LoadingButton>
        </ModalAction>
      </ModalContainer>
    </>
  );
};

export default FileUploadModal;
