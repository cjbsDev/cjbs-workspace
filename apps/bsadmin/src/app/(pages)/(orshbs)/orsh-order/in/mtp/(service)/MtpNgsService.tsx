"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback, Form} from "cjbsDSTM";
import OrderMtpSampleList from "./(contents)/OrderMtpSampleList";
import StudySelection from "../../../StudySelection";
import dynamic from "next/dynamic";
import { POST_MULTIPART } from "api";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";
import { toast } from "react-toastify";

const LazyOrdererInfo = dynamic(() => import("../../../OrdererInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function MtpNgsService() {
  const router = useRouter();

  const defaultValues = {
    mailRcpnList : ["agncLeaderRcpn", "ordrAplcRcpn"],
    isRdnaIdnt16S: 'N',
    isRtrnRasn : 'N',
  };

  // 등록 호출
  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);

    // selfQcFileNm : res.data.qcFile.selfQcFileNm,

    const bodyData = {
      addRqstMemo : {
        memo : data.memo,
      },
      custAgnc : {
        addEmailList : data.addEmailList,
        agncNm : data.agncNm,
        ebcEmail : data.ebcEmail,
        instNm : data.instNm,
        // isRdnaIdnt16S: data.isRdnaIdnt16S,
        isRtrnRasn : data.isRtrnRasn,
        mailRcpnList : data.mailRcpnList,
        ordrAplcEmail : data.ordrAplcEmail,
        ordrAplcNm : data.ordrAplcNm,
        ordrAplcTel : data.ordrAplcTel,
        rhpiId : data.rhpiId,
        rhpiNm : data.rhpiNm,
        rhpiTel : data.rhpiTel,
        prjcCode : data.prjcUniqueCode,
        prjcDetailCode : data.prjcDetailCode,
        rstFileRcpnEmail : data.rstFileRcpnEmail,
      },
      samples : data.sample,
    };

    console.log("call body data", bodyData);

    const formData = new FormData();
    formData.append(
      "user-data",
      new Blob([JSON.stringify(bodyData)], { type: "application/json" })
    );

    if(data.uploadFile.length !== 0){
      // file 데이터가 있을경우
      // formData.append("file-data", uploadFile?.files?.item(0) as File);
      formData.append("file-data", data.uploadFile[0]);
    } else {
      formData.append("file-data", null);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/orsh/bs/mtp/ngs`;

    try {
      const response = await POST_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);
      if (response.data.success) {
        toast("등록 되었습니다.")
        router.push("/orshbs-list");

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
    <Container disableGutters={true} sx={{ pt: "55px" }}>

      <Form onSubmit={onSubmit} defaultValues={defaultValues} >

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
          <StudySelection />
        </Box>

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
              주문자 및 거래처 정보&nbsp;
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
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyOrdererInfo />
          </ErrorContainer>
        </Box>

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
              주문서 작성&nbsp;
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
          <OrderMtpSampleList serviceType={"ngs"}/>
        </Box>

      </Form>
    </Container>
  );
}
