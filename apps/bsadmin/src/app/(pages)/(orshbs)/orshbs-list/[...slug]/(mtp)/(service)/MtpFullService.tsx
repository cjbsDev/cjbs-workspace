"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import OrdererInfo from "../OrdererInfo";
import OrderMtpSampleList from "../OrderMtpSampleList";
import { GET, PUT_MULTIPART } from "api";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import {fileIdValueAtom, prjcCodeAtom} from "../../../../../../recoil/atoms/fileIdValueAtom";
import StudySelection from "../../StudySelection";

export default function MtpFullService() {
  const router = useRouter();
  const [fileId, setFileId] = useRecoilState(fileIdValueAtom);
  const [prjcCode, setPrjcCode] = useRecoilState(prjcCodeAtom);

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const defaultValues = async () => {
    const res = await GET(`/orsh/bs/mtp/fs/${orshUkey}`);
    console.log("resresre", res.data);

    // return res.data;
    const returnDefaultValues = {
      // custAgnc
      ebcEmail : res.data.custAgnc.ebcEmail,
      rhpiNm : res.data.custAgnc.rhpiNm,
      rhpiId : res.data.custAgnc.rhpiId,
      rhpiTel : res.data.custAgnc.rhpiTel,
      instNm : res.data.custAgnc.instNm,
      agncNm : res.data.custAgnc.agncNm,
      ordrAplcNm : res.data.custAgnc.ordrAplcNm,
      ordrAplcEmail : res.data.custAgnc.ordrAplcEmail,
      ordrAplcTel : res.data.custAgnc.ordrAplcTel,
      mailRcpnList : res.data.custAgnc.mailRcpnList,
      addEmailList : res.data.custAgnc.addEmailList,
      selfQcFileNm : res.data.qcFile.selfQcFileNm,
      memo : res.data.addRqstMemo.memo,
      isRdnaIdnt16S : res.data.custAgnc.isRdnaIdnt16S,
      isRtrnRasn : res.data.custAgnc.isRtrnRasn,
      prjcUniqueCode : res.data.custAgnc.prjcCode,
      prjcNm : res.data.custAgnc.prjcNm,
      prjcDetailCode : res.data.custAgnc.prjcDetailCode,
      rstFileRcpnEmail : res.data.custAgnc.rstFileRcpnEmail,
      sample : res.data.samples,
    };
    setFileId(res.data.samples[0].selfQcResultFileId);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^", fileId);
    setPrjcCode(res.data.custAgnc.prjcCode);
    return returnDefaultValues;
  };

  // 수정 호출
  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);

    // selfQcFileNm : res.data.qcFile.selfQcFileNm,

    const bodyData = {
      addRqstMemo: {
        memo: data.memo,
      },
      custAgnc: {
        addEmailList: data.addEmailList,
        agncAddr: data.addr,
        agncAddrDetail: data.addrDetail,
        agncNm: data.agncNm,
        agncZip: data.zip,
        ebcEmail: data.ebcEmail,
        instNm: data.instNm,
        mailRcpnList: data.mailRcpnList,
        ordrAplcEmail: data.ordrAplcEmail,
        ordrAplcNm: data.ordrAplcNm,
        ordrAplcTel: data.ordrAplcTel,
        rhpiId: data.rhpiId,
        rhpiNm: data.rhpiNm,
        rhpiTel: data.rhpiTel,
      },
      samples: data.sample,
    };

    console.log("call body data", bodyData);

    const formData = new FormData();
    formData.append(
      "user-data",
      new Blob([JSON.stringify(bodyData)], { type: "application/json" })
    );

    if (data.uploadFile.length !== 0) {
      // file 데이터가 있을경우
      // formData.append("file-data", uploadFile?.files?.item(0) as File);
      formData.append("file-data", data.uploadFile[0]);
    } else {
      formData.append("file-data", null);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_ORSH}/mtp/fs/${orshUkey}`;

    try {
      const response = await PUT_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);
      if (response.data.success) {
        toast("수정 되었습니다.");
        router.push("/order-list");
      } else if (response.data.code == "INVALID_ETC_EMAIL") {
        toast(response.data.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
    }
  };

  return (
    <Container disableGutters={true} sx={{ pt: 4 }}>
      <Form onSubmit={onSubmit} defaultValues={defaultValues}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{borderBottom: '1px solid #000', pb: 1}}
        >
          <Box sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'center',
          }}>
            <Typography variant="h5">
              과제 및 연구 선택&nbsp;
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'center',
          }}>
            <Typography variant="body2">
              * 은 필수항목 입니다
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ p: 2 }}>
          <StudySelection prjcCode={prjcCode}/>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ borderBottom: "1px solid #000", pb: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">주문자 및 거래처 정보&nbsp;</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">* 은 필수항목 입니다</Typography>
          </Box>
        </Stack>

        <Box sx={{ p: 2 }}>
          <OrdererInfo />
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{ borderBottom: "1px solid #000", pb: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">주문서 작성&nbsp;</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">* 은 필수항목 입니다</Typography>
          </Box>
        </Stack>
        <Box sx={{ p: 2 }}>
          <OrderMtpSampleList serviceType={"fs"} />
        </Box>

      </Form>
    </Container>
  );
}
