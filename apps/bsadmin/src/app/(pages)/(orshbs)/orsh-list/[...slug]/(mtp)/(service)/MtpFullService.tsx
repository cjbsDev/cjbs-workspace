"use client";
import React, {useState, useEffect} from 'react';
import {Box, Container, Stack, Typography, styled} from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback} from "cjbsDSTM";
import OrdererInfo from "../OrdererInfo";
import OrderMtpSampleList from "../OrderMtpSampleList";
import PaymentInfo from "../PaymentInfo";

import dynamic from "next/dynamic";
import axios from "axios";
import {GET, PUT_MULTIPART} from "api";
import {useRouter} from "next-nprogress-bar";
import SkeletonLoading from "@components/SkeletonLoading";
import {useParams} from "next/navigation";
import { fetcherOrsh } from 'api';
import useSWR, {mutate} from "swr";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import {useRecoilState} from "recoil";
import {stepperStatusAtom} from "@app/recoil/atoms/stepperStatusAtom";
import {fileIdValueAtom} from "../../../../../../recoil/atoms/fileIdValueAtom";
import {pymtWayCcStatusAtom} from "../../../../../../recoil/atoms/pymtWayCcStatusAtom";


export default function MtpFullService(){

  const router = useRouter();
  const [fileId, setFileId] = useRecoilState(fileIdValueAtom);
  // const [pymtWayCc, setPymtWayCc] = useState<string>('BS_1300001');
  const [pymtWayCc, setPymtWayCc] = useRecoilState(pymtWayCcStatusAtom);

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const defaultValues = async () => {
    const res = await GET(`/orsh/bs/extn/mtp/fs/${orshUkey}`);
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
      zip : res.data.custAgnc.agncZip,
      addr : res.data.custAgnc.agncAddr,
      addrDetail : res.data.custAgnc.agncAddrDetail,
      mailRcpnList : res.data.custAgnc.mailRcpnList,
      addEmailList : res.data.custAgnc.addEmailList,
      conm : res.data.payment.conm,
      brno : res.data.payment.brno,
      // pymtWayCc : res.data.payment.pymtWayCc,
      rprsNm : res.data.payment.rprsNm,
      rcpnNm : res.data.payment.rcpnNm,
      rcpnEmail : res.data.payment.rcpnEmail,
      selfQcFileNm : res.data.qcFile.selfQcFileNm,
      memo : res.data.addRqstMemo.memo,
      sample : res.data.samples
    };
    setFileId(res.data.qcFile.selfQcFileId);
    setPymtWayCc(res.data.payment.pymtWayCc);
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^",fileId);
    return returnDefaultValues;
  };

  const setPymtWayCcValue = (value:string) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(value);
    setPymtWayCc(value);
  }

  // 수정 호출
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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/orsh/bs/extn/mtp/fs/${orshUkey}`;

    try {
      const response = await PUT_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);
      if (response.data.success) {
        mutate(`/orsh/bs/extn/mtp/fs/${orshUkey}`);
        toast("수정 되었습니다.")
        router.push("/orsh-list");
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
    <Container disableGutters={true} sx={{pt:4}}>

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
          <OrderMtpSampleList serviceType={"fs"}/>
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
          <PaymentInfo />
        </Box>

      </Form>

    </Container>
  );
};