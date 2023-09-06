"use client";
import React, {useState, useEffect} from 'react';
import {Box, Container, Stack, Typography, styled} from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback} from "cjbsDSTM";
import OrdererInfo from "../(mtp)/OrdererInfo";
import OrderMtpSampleList from "../(mtp)/OrderMtpSampleList";
import PaymentInfo from "../(mtp)/PaymentInfo";

import dynamic from "next/dynamic";
import axios from "axios";
import {GET, POST, POST_BLOB, POST_MULTIPART, PUT_MULTIPART} from "api";
import {useRouter} from "next-nprogress-bar";
import SkeletonLoading from "@components/SkeletonLoading";
import {useParams} from "next/navigation";
import { fetcherOrsh } from 'api';
import useSWR from "swr";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";


// const LazyOrdererInfo = dynamic(() => import("../../../order/OrdererInfo"), {
//     ssr: false,
//     loading: () => <SkeletonLoading height={800} />,
// });

export default function MtpFullService(){

  const router = useRouter();
  const [uploadFile, setUploadFile] = useState<any>(null);
  const [pymtWayCc, setPymtWayCc] = useState<string>('BS_1300001');

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const { data: orderDetailData} = useSWR(
    `/mtp/fs/${orshUkey}`,
    fetcherOrsh, {
      suspense: true
    }
  );
  console.log(orderDetailData.data);
  const detailData = orderDetailData.data;

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
    // pymtWayCc : detailData.payment.pymtWayCc,
    rprsNm : detailData.payment.rprsNm,
    rcpnNm : detailData.payment.rcpnNm,
    rcpnEmail : detailData.payment.rcpnEmail,
    selfQcFileNm : detailData.qcFile.selfQcFileNm,
    memo : detailData.addRqstMemo.memo,
    sample : detailData.samples
  };

  const setPymtWayCcValue = (value:string) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(value);
    setPymtWayCc(value);
  }

  const addFileData = (callBackData:any) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(callBackData);
    setUploadFile(callBackData);
  }

  // 수정 호출
  const onSubmit = async (data: any) => {
    console.log("**************************************");
    console.log("Submit Data ==>>", data);

    // selfQcFileNm : detailData.qcFile.selfQcFileNm,

    const bodyData = {
      addRqstMemo : {
        memo : data.memo,
      },
      custAgnc : {
        addEmailList : data.addEmailList,
        agncAddr : data.addr,
        agncAddrDetail : data.addrDetail,
        agncNm : data.agncNm,
        agncZip : data.zip,
        ebcEmail : data.ebcEmail,
        instNm : data.instNm,
        mailRcpnList : data.mailRcpnList,
        ordrAplcEmail : data.ordrAplcEmail,
        ordrAplcNm : data.ordrAplcNm,
        ordrAplcTel : data.ordrAplcTel,
        rhpiId : data.rhpiId,
        rhpiNm : data.rhpiNm,
        rhpiTel : data.rhpiTel,
      },
      payment : {
        brno : data.brno,
        conm : data.conm,
        pymtWayCc: pymtWayCc,
        rcpnEmail : data.rcpnEmail,
        rcpnNm : data.rcpnNm,
        rprsNm : data.rprsNm,
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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_ORSH}/mtp/fs/${orshUkey}`;

    try {
      const response = await PUT_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);
      if (response.success) {
        toast("수정 되었습니다.")
        router.push("/order-list");
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
          <OrderMtpSampleList serviceType={"fs"} detailData={detailData.samples}/>
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
          <PaymentInfo detailData={detailData.payment} setPymtWayCcValue={setPymtWayCcValue}/>
        </Box>

      </Form>

    </Container>
  );
};