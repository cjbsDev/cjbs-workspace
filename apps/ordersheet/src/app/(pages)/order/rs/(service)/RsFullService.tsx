"use client";
import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Typography, styled } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MyIcon from "icon/MyIcon";
import { cjbsTheme, ErrorContainer, Fallback } from "cjbsDSTM";
import PaymentInfo from "../../PaymentInfo";
import OrderRsSampleList from "./(contents)/OrderRsSampleList";
import dynamic from "next/dynamic";
import { useRecoilState } from "recoil";
import { stepperStatusAtom } from "@app/recoil/atoms/stepperStatusAtom";
import axios from "axios";
import { POST } from "api";
import { useRouter } from "next-nprogress-bar";
import SkeletonLoading from "@components/SkeletonLoading";
import { toast } from "react-toastify";

const LazyOrdererInfo = dynamic(() => import("../../OrdererInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  p: "12px 20px",
  marginTop: "8px",
  borderRadius: "4px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "& .MuiAccordionSummary-root.Mui-expanded": {
    backgroundColor: cjbsTheme.palette.grey["700"],
    color: "#FFF",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    // expandIcon={<MyIcon icon="cheveron-down" size={24} />}
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
    color: "#FFF",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  //padding: theme.spacing(2),
  padding: "19px 0px",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  //backgroundColor: '#FFF',
  minHeight: "400px",
}));

export default function RsFullService() {
  const router = useRouter();

  const [stepperNo, setStepperNo] = useRecoilState(stepperStatusAtom);
  const [expanded, setExpanded] = React.useState<string | false>("1");
  const [bodyData, setBodyData] = useState<any>({});
  console.log("bodyData : ", bodyData);
  const [uploadFile, setUploadFile] = useState<any>(null);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      setStepperNo(Number(panel));
    };

  const addBodyData = (callBackData: any) => {
    // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    // console.log(callBackData);
    console.log(stepperNo);
    setBodyData({ ...bodyData, ...callBackData });

    setExpanded(String(stepperNo + 1));
    setStepperNo(stepperNo + 1);
  };

  // 주문서 등록
  useEffect(() => {
    if (stepperNo === 4) {
      orderSheetInsertCall();
    }
  }, [stepperNo]);

  const addFileData = (callBackData: any) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(callBackData);
    setUploadFile(callBackData);
  };

  const moveBackFocus = () => {
    setExpanded(String(stepperNo - 1));
    setStepperNo(stepperNo - 1);
  };

  // 등록 호출
  const orderSheetInsertCall = async () => {
    const apiUrl = "/orsh/rs/fs";
    try {
      const response = await POST(apiUrl, bodyData); // API 요청
      console.log("call body data", bodyData);
      if (response.success) {
        console.log("response", response);
        router.push("/order/complete?orderNm=rs&serviceType=fs");
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
      {/*<Accordion expanded={expanded === '1'} onChange={handleChange('1')}>*/}
      <Accordion expanded={expanded === "1"}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="subtitle1">주문자 및 거래처 정보</Typography>
              {/*<Typography variant="body2" sx={{ml:2}}>*/}
              {/*    주문자 및 거래처 정보를 확인해주세요*/}
              {/*</Typography>*/}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="body2">* 은 필수항목 입니다</Typography>
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyOrdererInfo addBodyData={addBodyData} />
          </ErrorContainer>
        </AccordionDetails>
      </Accordion>
      {/*<Accordion expanded={expanded === '2'} onChange={handleChange('2')}>*/}
      <Accordion expanded={expanded === "2"}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="subtitle1">주문서 작성</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="body2">* 은 필수항목 입니다</Typography>
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <OrderRsSampleList
            serviceType={"fs"}
            addBodyData={addBodyData}
            moveBackFocus={moveBackFocus}
            addFileData={addFileData}
          />
        </AccordionDetails>
      </Accordion>
      {/*<Accordion expanded={expanded === '3'} onChange={handleChange('3')}>*/}
      <Accordion expanded={expanded === "3"}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            sx={{ width: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="subtitle1">결제 정보</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignContent: "start",
                alignItems: "center",
                // color: "#FFF"
              }}
            >
              <Typography variant="body2">* 은 필수항목 입니다</Typography>
            </Box>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <PaymentInfo
            addBodyData={addBodyData}
            moveBackFocus={moveBackFocus}
          />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
