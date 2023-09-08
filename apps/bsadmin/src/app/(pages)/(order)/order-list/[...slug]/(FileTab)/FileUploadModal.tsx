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

const FileUploadModal = (props) => {
  const { onClose, open, modalWidth, formId } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();
  const orderUkey = params.slug;
  const { mutate } = useSWRConfig();

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/file`;
  const onSubmit = async (data: any) => {
    console.log("SUMMIT FORM DATA ==>>", data);
    setIsLoading(true);

    const bodyData = {
      fileDesc: data.fileDesc,
      isSendQCEmail: data.isSendQCEmail === false ? "N" : "Y",
      qcEmailTemplateCc: data.qcEmailTemplateCc,
    };

    console.log("BODYDATA ==>>", bodyData);

    const formData = new FormData();
    formData.append(
      "user-data",
      new Blob([JSON.stringify(bodyData)], { type: "application/json" })
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
      } else if (response.data.code === "INVALID_ETC_EMAIL") {
        toast(response.data.message);
      } else {
        toast("문제가 발생했습니다.");
      }
    } catch (error) {
      console.error("request failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
        <ModalTitle onClose={onClose}>파일 업로드</ModalTitle>
        <DialogContent>
          <Form onSubmit={onSubmit} id={formId}>
            <Box sx={{ mb: 2 }}>
              <FileDropzone />
            </Box>
            {/*<Box>*/}
            {/*  <InputValidation*/}
            {/*    inputName="uploadFile"*/}
            {/*    required={false}*/}
            {/*    type="file"*/}
            {/*    inputProps={{*/}
            {/*      multiple: true,*/}
            {/*    }}*/}
            {/*    // sx={{ width: 306 }}*/}
            {/*  />*/}
            {/*</Box>*/}

            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TH sx={{ width: "20%" }}>파일 설명</TH>
                    <TD colSpan={3}>
                      <InputValidation
                        inputName="fileDesc"
                        required={true}
                        errorMessage="파일 설명을 입력해주세요."
                      />
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "20%" }}>QC 메일 발송</TH>
                    <TD colSpan={3}>
                      <CheckboxSV
                        inputName="isSendQCEmail"
                        labelText="파일 업로드와 함께 고객에게 OC 메일을 발송합니다"
                        value="Y"
                      />
                    </TD>
                  </TableRow>
                  <TableRow>
                    <TH sx={{ width: "20%" }}>QC 메일 양식</TH>
                    <TD colSpan={3}>
                      <SelectBox
                        required={true}
                        errorMessage="QC 메일 양식을 선택해주세요."
                        inputName="qcEmailTemplateCc"
                        options={[
                          { value: "BS_0810001", optionName: "한글" },
                          { value: "BS_0810002", optionName: "영문" },
                        ]}
                      />
                    </TD>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Form>
        </DialogContent>
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={onClose}
            color="secondary"
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            form={formId}
          >
            저장
          </LoadingButton>
        </ModalAction>
      </ModalContainer>
    </>
  );
};

export default FileUploadModal;
