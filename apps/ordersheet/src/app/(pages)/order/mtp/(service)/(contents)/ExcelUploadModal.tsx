import React, { useState, useMemo } from "react";
import {
  ModalContainer,
  ModalTitle,
  ModalAction,
  Form,
  InputValidation,
  ContainedButton,
  cjbsTheme,
} from "cjbsDSTM";
import { DialogContent, Stack, styled, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import MyIcon from "icon/MyIcon";
import Link from "next/link";
import {useParams} from "next/navigation";
import {POST_MULTIPART} from "api";

interface ModalContainerProps {
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  append: any;
  serviceType: string;
  deleteAllFields: () => void;
}

const ExcelUploadModal = ({ onClose, open, modalWidth, append, serviceType, deleteAllFields }:ModalContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
    setIsLoading(false);
  };

  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0]; // 선택된 파일 객체
  //   console.log("File Input Data ==>>", file);
  //
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file as File);
  //
  //     await axios
  //       .post(
  //         `${process.env.NEXT_PUBLIC_API_URL_ORSH}/sample/excel/mtp/fs`,
  //         formData,
  //         {
  //           withCredentials: false,
  //           headers: {
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.success) {
  //           console.log("RES VALUE ==>>", res.data.data);
  //           console.log("RES VALUE Length ==>>", res.data.data.length);
  //
  //           for (let i = 0; i < res.data.data.length; i++) {
  //             append({
  //               sampleNm: res.data.data[i].sampleNm,
  //               source: res.data.data[i].source,
  //               sampleCategoryCc: res.data.data[i].sampleCategoryCc,
  //               anlsTargetGeneCc: res.data.data[i].anlsTargetGeneCc,
  //               qc: res.data.data[i].qc,
  //               memo: res.data.data[i].memo,
  //             });
  //           }
  //
  //           handleClose();
  //         } else {
  //           console.log("EERROORRSS!!");
  //         }
  //       });
  //   }
  // };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // 선택된 파일 객체

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL_ORSH}/mtp/${serviceType}/sample/excel`,
        //   formData,
        //   {
        //     withCredentials: false,
        //     headers: {
        //       "Access-Control-Allow-Origin": "*",
        //     },
        //   }
        // );

        // `${process.env.NEXT_PUBLIC_API_URL_ORSH}/mtp/${serviceType}/sample/excel`,
        const response = await POST_MULTIPART(
          `/orsh/mtp/${serviceType}/sample/excel`,
          formData
        );

        if (response.data.success) {
          // 필드 초기화
          deleteAllFields();

          const data = response.data.data;
          console.log("RES VALUE ==>>", data);
          console.log("RES VALUE Length ==>>", data.length);

          if(serviceType === 'fs'){
            const appendedData = data.map((item) => ({
              sampleNm: item.sampleNm,
              source: item.source,
              sampleCategoryCc: item.sampleCategoryCc,
              anlsTargetGeneCc: item.anlsTargetGeneCc,
              qc: item.qc,
              memo: item.memo,
            }));
            appendedData.forEach((item) => {
              append(item);
            });

          } else if(serviceType === 'ao') {
            const appendedData = data.map((item) => ({
              anlsTargetGeneCc: item.anlsTargetGeneCc,
              frwrPrimer: item.frwrPrimer,
              memo: item.memo,
              pltfMc: item.pltfMc,
              rvrsPrimer: item.rvrsPrimer,
              sampleNm: item.sampleNm,
              source: item.source,
            }));
            appendedData.forEach((item) => {
              append(item);
            });

          } else if(serviceType === 'so') {
            const appendedData = data.map((item) => ({
              idx1frwr: item.idx1frwr,
              idx1nm: item.idx1nm,
              idx2nm: item.idx2nm,
              idx2rvrs: item.idx2rvrs,
              memo: item.memo,
              sampleNm: item.sampleNm,
            }));
            appendedData.forEach((item) => {
              append(item);
            });
          }
          handleClose();

        } else {
          console.log("Error: ", response.data.message);
          // 오류 처리 로직 추가
        }
      }
    } catch (error) {
      console.error("Request Failed:", error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={handleClose}>엑셀 등록</ModalTitle>
      <DialogContent>
        <Stack
          alignItems="start"
          spacing={2}
          sx={{
            p: "20px",
            backgroundColor: cjbsTheme.palette.grey[50],
          }}
        >
          <Typography variant="body2">
            • 엑셀 양식을 다운로드한 후 데이터를 입력한 파일을 업로드해주세요.
          </Typography>
          {serviceType === 'fs' ? (
            <Link
              href="https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/ordersheet/template/MTP_Full_service_template.xlsx"
              target="_blank"
            >
              <ContainedButton
                buttonName="엑셀 양식 다운로드"
                startIcon={<MyIcon icon="download" size={16} />}
                color={"secondary"}
                size="small"
                sx={{ marginLeft: "20spx !important" }}
              />
            </Link>
          ) : ('')}

          {serviceType === 'ao' ? (
            <Link
              href="https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/ordersheet/template/MTP_Analysis_only_template.xlsx"
              target="_blank"
            >
              <ContainedButton
                buttonName="엑셀 양식 다운로드"
                startIcon={<MyIcon icon="download" size={16} />}
                color={"secondary"}
                size="small"
                sx={{ marginLeft: "20spx !important" }}
              />
            </Link>
          ) : ('')}

          {serviceType === 'so' ? (
            <Link
              href="https://bsa-public-resource.s3.ap-northeast-2.amazonaws.com/ordersheet/template/MTP_Sequencing_only_template.xlsx"
              target="_blank"
            >
              <ContainedButton
                buttonName="엑셀 양식 다운로드"
                startIcon={<MyIcon icon="download" size={16} />}
                color={"secondary"}
                size="small"
                sx={{ marginLeft: "20spx !important" }}
              />
            </Link>
          ) : ('')}

          <Typography variant="body2">
            • 엑셀 등록 시 기존에 입력한 정보는 초기화됩니다.
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            mt: "20px",
          }}
        >
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{ width: "600px" }}
          />
        </Stack>
      </DialogContent>
    </ModalContainer>
  );
};

export default ExcelUploadModal;
