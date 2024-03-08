"use client";
import * as React from "react";
import { useState, useEffect} from "react";

import {
  Box,
  BoxProps, Grid, IconButton,
  InputAdornment,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  Form,
  InputValidation, LinkButton,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
// import AnalysisSampleDynamicTable from "./AnalysisSampleDynamicTable";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";
import AgncDetailInfo from "../../../../../../components/AgncDetailInfo";
import RearchDetailInfo from "../../../../../../components/RearchDetailInfo";
import ListRun from "../CustPayList";
import ListPymtPrice from "../components/ListPymtPrice";
import YearSelectBox from "./YearSelectBox";

const LazyPrePayListModal = dynamic(() => import("./PrePayListModal"), {
  ssr: false,
});

const CustPayInfo = () => {

  const router = useRouter();
  const params = useParams();
  const anlsItstUkey = params.slug;

  const [settlement, setSettlement] = useState<boolean>(true);
  const [selectSampleListData, setSelectSampleListData] = useState<any>({});
  const [isEdit, setIsEdit] = useState<string>('Y');
  const [prePayList, setPrePayList] = useState<any>([]);
  // [거래처(PI)] 모달
  const [showAgncInfoModal, setShowAgncInfoModal] = useState<boolean>(false);
  // [연구책임자] 모달
  const [showRearchInfoModal, setShowRearchInfoModal] = useState<boolean>(false);
  // [선결제 정산내역] 모달
  const [showPrePayListModal, setShowPrePayListModal] = useState<boolean>(false);
  const [year, setYear] = useState<string>("2024");

  const { data } = useSWR(`/agnc/${anlsItstUkey}/pymt/detail?year=${year}`, fetcher, {
    suspense: true,
  });
  console.log("response", data);
  const { pymtStatusList } = data;
  const { agncUkey, agncNm, bsnsMngrNm, instNm, pymtStatusVal, rhpiNm, rmnPrice, totalAnlsPrice, totalPymtPrice } = data.agncPymtInfo;

  // useEffect(() => {
  // }, []);

  // const goModifyPage = () => {
  //   router.push("/ledger-analysis-report-modify/" + anlsItstUkey);
  // };

  // const { payList } = data.anlsItstCalculationInfo;

  const agncInfoModalClose = () => {
    setShowAgncInfoModal(false);
  };
  const rearchInfoModalClose = () => {
    setShowRearchInfoModal(false);
  };

  // const prePayListModalOpen = (index: number) => {
  //   console.log(payList[index].prePayList);
  //   setPrePayList(payList[index].prePayList);
  //   setShowPrePayListModal(true);
  // };
  // const prePayListModalClose = () => {
  //   setShowPrePayListModal(false);
  // };

  const changeYear = (yearValue) => {
    console.log(yearValue)
    setYear(yearValue);
  };

  return (
    <>
      <Box sx={{mb: 4}}>
        <Title1 titleName="고객 결제 정보"/>
      </Box>
      <Typography variant="subtitle1">고객정보</Typography>
      <TableContainer sx={{mb: 5}}>
        <Table>
          <TableBody>
            <TableRow>
              {/*const { agncNm, bsnsMngrNm, instNm, pymtStatusVal, rhpiNm, rmnPrice, totalAnlsPrice, totalPymtPrice } = data.agncPymtInfo;*/}
              <TH sx={{width: "15%"}}>거래처(PI)</TH>
              <TD sx={{width: "35%"}}>
                <Grid container justifyContent="space-between">
                  <Grid item item xs={10}>
                    {agncNm}
                  </Grid>
                  <Grid item>
                    {/*<AgncDetailInfo agncUkey={agncUkey} />*/}
                  </Grid>
                </Grid>
              </TD>
              <TH sx={{width: "15%"}}>영업 담당자</TH>
              <TD sx={{width: "35%"}}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={10}>
                    {bsnsMngrNm}
                  </Grid>
                  <Grid item>
                    {/*<RearchDetailInfo agncLeaderUkey={custUkey} />*/}
                  </Grid>
                </Grid>

              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{width: "15%"}}>결제 총계</TH>
              <TD sx={{width: "35%"}}>
                {totalPymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TD>
              <TH sx={{width: "15%"}}>분석 총계</TH>
              <TD sx={{width: "35%"}}>
                {totalAnlsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{width: "15%"}}>상태</TH>
              <TD sx={{width: "35%"}}>
                {pymtStatusVal}
              </TD>
              <TH sx={{width: "15%"}}>남은 금액</TH>
              <TD sx={{width: "35%"}}>
                {rmnPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={1} justifyContent="space-between" sx={{mb: 1}}>
        <Typography variant="subtitle1">결제 현황</Typography>
        <YearSelectBox changeYear={changeYear} />
      </Stack>

      <TableContainer sx={{mb: 5}}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{width: "9%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>구분</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>1월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>2월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>3월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>4월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>5월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>6월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>7월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>8월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>9월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>10월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>11월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>12월</TH>
              <TH sx={{width: "7%", backgroundColor: cjbsTheme.palette.grey["700"], color: '#ffffff'}} align='center'>합계</TH>
            </TableRow>
            <TableRow>
              <TH sx={{width: "9%"}} align='center'>분석비용</TH>
              { pymtStatusList.map((item: any, index: any) => {
                const {
                  anlsPrice,
                  prcsPymtPrice,
                } = item;
                return (
                  <TD key={index} sx={{width: "7%"}} align='center'>{anlsPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TD>
                );
              })}
            </TableRow>
            <TableRow>
              <TH sx={{width: "9%"}} align='center'>계산서 처리</TH>
              { pymtStatusList.map((item: any, index: any) => {
                const {
                  anlsPrice,
                  prcsPymtPrice,
                } = item;
                return (
                  <TD key={index} sx={{width: "7%"}} align='center'>{prcsPymtPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TD>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ListPymtPrice agncUkey={agncUkey}/>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{mb: 5}}>
        <Link href="/ledger-cust-pay-list">
          <OutlinedButton size="medium" buttonName="목록"/>
        </Link>
      </Stack>

      {/* 선결제 정산 내역 모달 */}
      {/*<LazyPrePayListModal*/}
      {/*  onClose={prePayListModalClose}*/}
      {/*  open={showPrePayListModal}*/}
      {/*  modalWidth={800}*/}
      {/*  data={prePayList}*/}
      {/*/>*/}
    </>
  );
};

export default CustPayInfo;

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));