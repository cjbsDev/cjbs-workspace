"use client";
import React, {useState, useEffect} from 'react';
import {Box, Container, Stack, Typography, styled} from "@mui/material";
import MyIcon from "icon/myIcon";
import {cjbsTheme, ErrorContainer, Fallback} from "cjbsDSTM";
import OrdererInfo from "../(mtp)/OrdererInfo";
import OrderMtpSampleList from "../(mtp)/OrderMtpSampleList";
import PaymentInfo from "../(mtp)/PaymentInfo";

import dynamic from "next/dynamic";
import axios from "axios";
import {GET, POST, POST_BLOB, POST_MULTIPART} from "api";
import {useRouter} from "next-nprogress-bar";
import SkeletonLoading from "@components/SkeletonLoading";
import {useParams} from "next/navigation";
import { fetcherOrsh } from 'api';
import useSWR from "swr";
import { Form } from "cjbsDSTM";


// const LazyOrdererInfo = dynamic(() => import("../../../order/OrdererInfo"), {
//     ssr: false,
//     loading: () => <SkeletonLoading height={800} />,
// });

export default function MtpFullService(){

  const router = useRouter();

  const [bodyData, setBodyData] = useState<any>({});
  console.log("bodyData : ", bodyData);
  const [uploadFile, setUploadFile] = useState<any>(null);

  const params = useParams();
  console.log("params", params.slug[1]);

  const { data: orderDetailData} = useSWR(
    `/mtp/fs/${params.slug[0]}`,
    fetcherOrsh, {
      suspense: true
    }
  );
  console.log(orderDetailData.data);
  const detailData = orderDetailData.data;


  const addBodyData = (callBackData:any) => {
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
      // console.log(callBackData);
      setBodyData({...bodyData, ...callBackData});
  }

  const addFileData = (callBackData:any) => {
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
      console.log(callBackData);
      setUploadFile(callBackData);
  }

  // 등록 호출
  const orderSheetInsertCall = async () => {
    console.log("uploadFile", uploadFile);

    const formData = new FormData();
    formData.append(
        "user-data",
        new Blob([JSON.stringify(bodyData)], { type: "application/json" })
    );

    if(uploadFile){
        // file 데이터가 있을경우
        // formData.append("file-data", uploadFile?.files?.item(0) as File);
        formData.append("file-data", uploadFile);
    } else {
        formData.append("file-data", null);
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_ORSH}/mtp/fs`;

    try {
        const response = await POST_MULTIPART(apiUrl, formData); // API 요청
        // console.log("call body data", bodyData);
        // const response = await POST(apiUrl, bodyData); // API 요청
        if (response.success) {
            console.log("response", response);
            router.push("/order/complete");
        } else if (response.code == "INVALID_AUTHORITY") {
            // toast("권한이 없습니다.");
        } else {
            // toast("문제가 발생했습니다. 01");
        }
    } catch (error) {
        console.error("request failed:", error);
    }
  }

  const defaultValues = {
    // custAgnc
    ebcEmail : detailData.custAgnc.ebcEmail,
    rhpiNm : detailData.custAgnc.rhpiNm,
    rhpiId : detailData.custAgnc.rhpiId,
    rhpiTel : detailData.custAgnc.rhpiTel,
    instNm : detailData.custAgnc.instNm,
    agncNm : detailData.custAgnc.agncNm,
    ordrAplcNm : detailData.custAgnc.ordrAplcNm,
    ordrAplcEmail : detailData.custAgnc.ordrAplcEmail,
    ordrAplcTel : detailData.custAgnc.ordrAplcTel,
    zip : detailData.custAgnc.agncZip,
    addr : detailData.custAgnc.agncAddr,
    addrDetail : detailData.custAgnc.agncAddrDetail,
    mailRcpnList : detailData.custAgnc.mailRcpnList,
    addEmailList : detailData.custAgnc.addEmailList,
    conm : detailData.payment.conm,
    brno : detailData.payment.brno,
    rprsNm : detailData.payment.rprsNm,
    rcpnNm : detailData.payment.rcpnNm,
    rcpnEmail : detailData.payment.rcpnEmail,
  };

  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);
  };

  return (
    <Container disableGutters={true} sx={{pt:4}}>

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
          <OrdererInfo />
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
          <OrderMtpSampleList serviceType={"fs"} addBodyData={addBodyData} addFileData={addFileData}/>
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
              결제 정보&nbsp;
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
          <PaymentInfo addBodyData={addBodyData} />
        </Box>

      </Form>

    </Container>
  );
};