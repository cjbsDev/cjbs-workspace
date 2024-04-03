"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback} from "cjbsDSTM";
import OrdererInfo from "../../OrdererInfo";
import OrderRsSampleList from "../OrderRsSampleList";
import {fetcher, GET, PUT} from "api";
import { useRouter } from "next-nprogress-bar";
import { useParams } from "next/navigation";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import StudySelection from "../../StudySelection";
import useSWR, {mutate} from "swr";
import UpdateLogList from "../../UpdateLogList";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";

const LazyUpdateLogList = dynamic(() => import("../../UpdateLogList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function RsSequencing() {
  const router = useRouter();

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const { data} = useSWR(
    `/orsh/bs/intn/rs/so/${orshUkey}`,
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
    memo : data.addRqstMemo.memo,
    isRtrnRasn : data.custAgnc.isRtrnRasn,
    loaNum : data.custAgnc.loaNum,
    prjtUniqueCode : data.custAgnc.prjtCode,
    prjtNm : data.custAgnc.prjtNm,
    prjtDetailCode : data.custAgnc.prjtDetailCode,
    rstFileRcpnEmail : data.custAgnc.rstFileRcpnEmail,
    sample : data.samples,
    pltfMc : data.commonInput.pltfMc,
  };

  // 수정 호출
  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);

    const bodyData = {
      addRqstMemo: {
        memo: data.memo,
      },
      commonInput: {
        pltfMc : data.pltfMc === undefined ? null : data.pltfMc,
      },
      custAgnc: {
        addEmailList : data.addEmailList,
        agncNm : data.agncNm,
        ebcEmail : data.ebcEmail,
        instNm : data.instNm,
        isRtrnRasn : data.isRtrnRasn,
        loaNum : data.loaNum,
        mailRcpnList : data.mailRcpnList,
        ordrAplcEmail : data.ordrAplcEmail,
        ordrAplcNm : data.ordrAplcNm,
        ordrAplcTel : data.ordrAplcTel,
        rhpiId : data.rhpiId,
        rhpiNm : data.rhpiNm,
        rhpiTel : data.rhpiTel,
        prjtCode : data.prjtUniqueCode,
        prjtDetailCode : data.prjtDetailCode,
        rstFileRcpnEmail : data.rstFileRcpnEmail,
      },
      samples: data.sample,
    };

    console.log("call body data", bodyData);

    const apiUrl = `/orsh/bs/intn/rs/so/${orshUkey}`;

    try {
      const response = await PUT(apiUrl, bodyData); // API 요청
      console.log("response", response);
      if (response.success) {
        mutate(`/orsh/bs/intn/rs/so/${orshUkey}`);
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
          <StudySelection prjtCode={data.custAgnc.prjtCode}/>
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
          <OrderRsSampleList serviceType={"so"} />
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{borderBottom: '1px solid #000', pb: 1, pt:3}}
        >
          <Box sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'center',
          }}>
            <Typography variant="h5">
              수정이력&nbsp;
            </Typography>
          </Box>
        </Stack>
        <Box sx={{ p: 2 }}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyUpdateLogList />
          </ErrorContainer>
        </Box>

      </Form>
    </Container>
  );
}
