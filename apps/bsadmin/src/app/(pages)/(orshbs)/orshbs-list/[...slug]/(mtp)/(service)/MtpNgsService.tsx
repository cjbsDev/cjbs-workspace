"use client";
import React, {useState, useEffect} from 'react';
import {Box, Container, Stack, Typography, styled} from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";
import OrdererInfo from "../OrdererInfo";
import OrderMtpSampleList from "../OrderMtpSampleList";
import {fetcher, GET, POST_MULTIPART, PUT, PUT_MULTIPART} from "api";
import {useRouter} from "next-nprogress-bar";
import {useParams} from "next/navigation";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import {useRecoilState} from "recoil";
import {fileIdValueAtom, prjcCodeAtom} from "../../../../../../recoil/atoms/fileIdValueAtom";
import StudySelection from "../../StudySelection";
import useSWR from "swr";

export default function MtpNgsService(){
  const router = useRouter();
  const [fileId, setFileId] = useRecoilState(fileIdValueAtom);

  const params = useParams();
  console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const { data} = useSWR(
    `/orsh/bs/mtp/ngs/${orshUkey}`,
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
    selfQcFileNm : data.qcFile.selfQcFileNm,
    memo : data.addRqstMemo.memo,
    isRdnaIdnt16S : data.custAgnc.isRdnaIdnt16S,
    isCheck16s : data.custAgnc.isRdnaIdnt16S,
    isRtrnRasn : data.custAgnc.isRtrnRasn,
    prjcUniqueCode : data.custAgnc.prjcCode,
    prjcNm : data.custAgnc.prjcNm,
    prjcDetailCode : data.custAgnc.prjcDetailCode,
    rstFileRcpnEmail : data.custAgnc.rstFileRcpnEmail,
    sample : data.samples,
  };
  // file id 공유
  setFileId(data.qcFile.selfQcFileId);

  // 수정 호출
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
        isRdnaIdnt16S: data.isRdnaIdnt16S,
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

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/orsh/bs/mtp/ngs/${orshUkey}`;

    try {
      const response = await PUT_MULTIPART(apiUrl, formData); // API 요청
      console.log("response", response);
      if (response.data.success) {
        toast("수정 되었습니다.")
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
          <OrderMtpSampleList serviceType={"ao"}/>
        </Box>

      </Form>

    </Container>
  );
};