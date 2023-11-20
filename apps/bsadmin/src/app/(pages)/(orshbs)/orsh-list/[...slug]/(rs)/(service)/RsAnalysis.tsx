"use client";
import React, {useState, useEffect} from 'react';
import {Box, Container, Stack, Typography, styled} from "@mui/material";
import MyIcon from "icon/MyIcon";
import {cjbsTheme, ErrorContainer, Fallback} from "cjbsDSTM";
import OrdererInfo from "../../OrdererInfo";
import OrderRsSampleList from "../OrderRsSampleList";
import PaymentInfo from "../PaymentInfo";

import { GET, PUT } from "api";
import {useRouter} from "next-nprogress-bar";
import {useParams} from "next/navigation";
import { Form } from "cjbsDSTM";
import { toast } from "react-toastify";
import {useRecoilState} from "recoil";
import {pymtWayCcStatusAtom} from "../../../../../../recoil/atoms/pymtWayCcStatusAtom";
import {groupUseStatusAtom} from "../../../../../../recoil/atoms/groupUseStatusAtom";
import {groupListDataAtom} from "../../../../../../recoil/atoms/groupListDataAtom";
import {mutate} from "swr";
import UpdateLogList from "../../UpdateLogList";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";

const LazyUpdateLogList = dynamic(() => import("../../UpdateLogList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function RsAnalysis(){
  const router = useRouter();
  const [pymtWayCc, setPymtWayCc] = useRecoilState(pymtWayCcStatusAtom);
  const [isGroupUse, setIsGroupUse] = useRecoilState(groupUseStatusAtom);
  const [groupList, setgroupList] = useRecoilState(groupListDataAtom);

  const params = useParams();
  // console.log("params", params.slug[1]);
  const orshUkey = params.slug[0];

  const defaultValues = async () => {
    const res = await GET(`/orsh/bs/extn/rs/ao/${orshUkey}`);
    console.log("resresre", res.data);

    let setGroupList:any = [];
    let groupDataList:any = [];
    let groupData = {};

    res.data.samples.map((sample:any, index:any) => {
      // console.log(index)
      const getData = res.data.samples[index].groupNm;
      // console.log(getData);
      if( getData !== '') setGroupList.push(getData);
    });
    let uniqueGroupList = [...new Set(setGroupList)];
    console.log(uniqueGroupList);
    uniqueGroupList.forEach((item) => {
      groupData = { value: item, optionName: item };
      groupDataList.push(groupData);
    });
    console.log(groupDataList);
    setgroupList(groupDataList);

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
      rstFileRcpnEmail : res.data.custAgnc.rstFileRcpnEmail,
      conm : res.data.payment.conm,
      brno : res.data.payment.brno,
      rprsNm : res.data.payment.rprsNm,
      rcpnNm : res.data.payment.rcpnNm,
      rcpnEmail : res.data.payment.rcpnEmail,
      memo : res.data.addRqstMemo.memo,
      sample : res.data.samples,
      groupCmprAnls: res.data.groupCmprAnls.groupCmprAnlsList,
      isGroupCmprAnls: res.data.groupCmprAnls.isGroupCmprAnls,
    };
    setPymtWayCc(res.data.payment.pymtWayCc);
    setIsGroupUse(res.data.groupCmprAnls.isGroupCmprAnls)
    // console.log("^^^^^^^^^^^^^^^^^^^^^^^^",fileId);
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
        rstFileRcpnEmail : data.rstFileRcpnEmail,
      },
      groupCmprAnls: {
        groupCmprAnlsList : data.groupCmprAnls,
        isGroupCmprAnls : data.isGroupCmprAnls,
      },
      payment : {
        brno : data.brno,
        conm : data.conm,
        pymtWayCc: pymtWayCc,
        rcpnEmail : data.rcpnEmail,
        rcpnNm : data.rcpnNm,
        rprsNm : data.rprsNm,
      },
      // commonInput: {pltfMc : data.pltfMc},
      samples : data.sample,
    };

    console.log("call body data", bodyData);

    const apiUrl = `/orsh/bs/extn/rs/ao/${orshUkey}`;

    try {
      const response = await PUT(apiUrl, bodyData); // API 요청
      console.log("response", response);
      if (response.success) {
        mutate(`/orsh/bs/extn/rs/ao/${orshUkey}`);
        toast("수정 되었습니다.")
        router.push("/orsh-list");
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
          <OrderRsSampleList serviceType={"ao"}/>
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
};