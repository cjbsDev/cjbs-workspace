"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback, Form} from "cjbsDSTM";
import OrderRsSampleList from "./(contents)/OrderRsSampleList";
import StudySelection from "../../../StudySelection";
import dynamic from "next/dynamic";
import { POST } from "api";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";
import { toast } from "react-toastify";

const LazyOrdererInfo = dynamic(() => import("../../../OrdererInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function RsNgsService() {
  const router = useRouter();

  const defaultValues = {
    mailRcpnList : ["agncLeaderRcpn", "ordrAplcRcpn"],
    isRtrnRasn : 'N',
  };

  // 등록 호출
  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);

    const bodyData = {
      addRqstMemo : {
        memo : data.memo,
      },
      custAgnc : {
        addEmailList : data.addEmailList,
        agncNm : data.agncNm,
        ebcEmail : data.ebcEmail,
        instNm : data.instNm,
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

    const apiUrl = `/orsh/bs/intn/rs/ngs`;

    try {
      const response = await POST(apiUrl, bodyData); // API 요청
      console.log("response", response);
      if (response.success) {
        toast("등록 되었습니다.")
        router.push("/orshbs-list");

      } else if (response.code == "INVALID_ETC_EMAIL") {
        toast(response.message);

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
            <LazyOrdererInfo serviceType={"ngs"}/>
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
          <OrderRsSampleList serviceType={"ngs"}/>
        </Box>

      </Form>
    </Container>
  );
}
