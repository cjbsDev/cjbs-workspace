"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import OrdererInfo from "../OrdererInfo";
import OrderMtpSampleList from "../OrderMtpSampleList";
import {fetcher, GET, PUT} from "api";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import StudySelection from "../../StudySelection";
import useSWR, {mutate} from "swr";

export default function MtpSequencing() {
  const router = useRouter();

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const { data} = useSWR(
    `/orsh/bs/mtp/so/${orshUkey}`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("data : ", data);

  const defaultValues = {
    ebcEmail : data.custAgnc.ebcEmail,
    rhpiNm : data.custAgnc.rhpiNm,
    rhpiId : data.custAgnc.rhpiId,
    rhpiTel : data.custAgnc.rhpiTel,
    instNm : data.custAgnc.instNm,
    agncNm : data.custAgnc.agncNm,
    ordrAplcNm : data.custAgnc.ordrAplcNm,
    ordrAplcEmail : data.custAgnc.ordrAplcEmail,
    ordrAplcTel : data.custAgnc.ordrAplcTel,
    mailRcpnList : data.custAgnc.mailRcpnList,
    addEmailList : data.custAgnc.addEmailList,
    // selfQcFileNm : res.data.qcFile.selfQcFileNm,
    memo : data.addRqstMemo.memo,
    isRtrnRasn : data.custAgnc.isRtrnRasn,
    prjcUniqueCode : data.custAgnc.prjcCode,
    prjcNm : data.custAgnc.prjcNm,
    prjcDetailCode : data.custAgnc.prjcDetailCode,
    rstFileRcpnEmail : data.custAgnc.rstFileRcpnEmail,
    sample : data.samples,
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
      samples: data.sample,
    };

    console.log("call body data", bodyData);

    const apiUrl = `/orsh/bs/mtp/so/${orshUkey}`;

    try {
      const response = await PUT(apiUrl, bodyData); // API 요청
      console.log("response", response);
      if (response.success) {
        mutate(`/orsh/bs/mtp/so/${orshUkey}`);
        toast("수정 되었습니다.");
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
          <StudySelection prjcCode={data.custAgnc.prjcCode}/>
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
          <OrderMtpSampleList serviceType={"so"} />
        </Box>

      </Form>
    </Container>
  );
}
