import React, { useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import FileDropzone from "./FileDropzone";
import { Form, InputValidation, OutlinedButton, TD, TH } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";
import { GET, POST_MULTIPART } from "api";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { modalOpenAtom } from "../../atom";
import { useSWRConfig } from "swr";
import FileSaver from "file-saver";
import axios from "axios";

const apiUrl = `/expt/info/file`;

const formDownloadData = [
  {
    btnName: "DNA/RNA QC",
    alias: "qcForm",
  },
  {
    btnName: "Lib",
    alias: "libForm",
  },
  {
    btnName: "Seq",
    alias: "seqForm",
  },
  {
    btnName: "아웃소싱",
    alias: "outsourcingForm",
  },
];
const Index = () => {
  const { mutate } = useSWRConfig();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setIsOpen = useSetRecoilState(modalOpenAtom);
  const handleClose = () => {
    setIsOpen(false);
  };
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    const bodyData = {
      ...data,
    };

    console.log("File Upload ResData", bodyData);

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
        // onClose();
        handleClose();
        mutate(`/expt/info/file/list`);
      } else if (response.data.code === "CANNOT_READ_EXCEL") {
        toast(response.data.message);
      } else if (response.data.code === "FILE_ENCRYPTED") {
        toast(response.data.message);
      }  else if (response.data.code === "DUPLICATED_SAMPLE_ID") {
        toast(response.data.message);
      }  else if (response.data.code === "SAMPLE_ORDER_NOT_MAPPED") {
        toast(response.data.message);
      }  else if (response.data.code === "EXPT_INFO_DATA_EMPTY") {
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

  const handleDownload = async (alias: string) => {
    const ali = "wgfssamplet";
    try {
      const res = await GET(`/file/bs/url?alias=${alias}`);

      const { presignedUrl, fileOriginNm } = res.data;

      // console.log("res.data", presignedUrl, fileOriginNm);

      await axios({
        url: presignedUrl,
        method: "get",
        responseType: "blob",
      }).then((response) => {
        console.log("*********", response);
        FileSaver.saveAs(presignedUrl, fileOriginNm);
      });
    } catch (e: any) {
      console.log(e.message);
    } finally {
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Box sx={{ mb: 2 }}>
        <FileDropzone />
      </Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "20%" }}>메모</TH>
              <TD>
                <InputValidation
                  required={true}
                  errorMessage="메모를 입력해 주세요."
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  placeholder="메모"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "20%" }}>Form 다운로드</TH>
              <TD>
                <Stack direction="row" spacing={1}>
                  {formDownloadData.map((item, index) => {
                    const { btnName, alias } = item;
                    return (
                      <OutlinedButton
                        key={alias + index.toString()}
                        buttonName={btnName}
                        size="small"
                        onClick={() => handleDownload(alias)}
                      />
                    );
                  })}
                </Stack>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <OutlinedButton
            buttonName="취소"
            onClick={handleClose}
            color="secondary"
          />
          <LoadingButton loading={isLoading} variant="contained" type="submit">
            등록
          </LoadingButton>
        </Stack>
      </Box>
    </Form>
  );
};

export default Index;
