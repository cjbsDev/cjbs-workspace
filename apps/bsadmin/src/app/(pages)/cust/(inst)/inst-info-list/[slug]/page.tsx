"use client";

import React, { useEffect, useState } from "react";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ErrorContainer,
  Fallback,
} from "cjbsDSTM";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  IconButton,
} from "@mui/material";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import getCodeList from "../../../../../data/getCodeList.json";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const LazyListInst = dynamic(() => import("./InstAgncList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

interface CustViewProps {
  params: {
    slug: string;
  };
}

interface InstDetailData {
  douzoneCode: string;
  instUniqueCodeMc: string;
  lctnTypeCc: string;
  instNm: string;
  brno: string;
  rprsNm: string;
  tpbsns: string;
  itbsns: string;
  zip: string;
  addr: string;
  addrDetail: string;
  region1Gc: string;
  region2Gc: string;
  instTypeCc: string;
  ftr: string;
  statusCodeCc: string;

  instUniqueCodeMcNm?: any;
  lctnTypeCcNm?: any;
  region1GcNm?: any;
  region2GcNm?: any;
  instTypeCcNm?: any;
  statusCodeCcNm?: any;
}

export default function InstPage({ params }: CustViewProps) {
  // init
  const { slug } = params;
  const router = useRouter();
  const [agncInfoModalOpen, setAgncInfoModalOpen] = useState<boolean>(false);
  //const [instDetail, setInstDetail] = useState<InstDetailData>();
  const [statementChkModalOpen, setStatementChkModalOpen] =
    useState<boolean>(false);

  //`http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/${slug}`,
  // load
  const {
    data: agncTempData,
    error,
    isLoading,
  } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/inst/${slug}`,
    fetcher
  );

  if (isLoading) {
    return <SkeletonLoading />;
  }

  const getCodeNm = (uniqueCode: string): string | null => {
    const foundData = getCodeList.data.find(
      (item: any) => item.uniqueCode === uniqueCode
    );
    return foundData ? foundData.codeNm : null;
  };

  /*
  useEffect(() => {
    if (agncTempData.data) {
      let filteredData: InstDetailData = agncTempData.data;

      filteredData.instUniqueCodeMcNm = getCodeNm(
        filteredData.instUniqueCodeMc
      );
      filteredData.instTypeCcNm = getCodeNm(filteredData.instTypeCc);
      filteredData.region1GcNm = getCodeNm(filteredData.region1Gc);
      filteredData.region2GcNm = getCodeNm(filteredData.region2Gc);
      filteredData.lctnTypeCcNm = getCodeNm(filteredData.lctnTypeCc);
      filteredData.statusCodeCcNm = getCodeNm(filteredData.statusCodeCc);

      console.log("filteredData", filteredData);
      console.log("in");
      //setInstDetail(filteredData);
    }
  }, [agncTempData.data]);
  */

  const instDetail = agncTempData.data;
  console.log("instData", instDetail);

  const handleAgncInfoModalOpen = () => {
    setAgncInfoModalOpen(true);
  };
  const handleAgncInfoModalClose = () => {
    setAgncInfoModalOpen(false);
  };

  const handleStatementChkModalOpen = () => {
    setStatementChkModalOpen(true);
  };
  const handleStatementChkModalClose = () => {
    setStatementChkModalOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="기관 정보" />
      </Box>

      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">기본 정보</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>더존 코드</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {instDetail.douzoneCode ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>위치</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getCodeNm(instDetail.region1Gc) ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>기관명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.instNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>사업자 등록번호</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.brno ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>대표자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.rprsNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>업태</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.itbsns ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>업종</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.tpbsns ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {instDetail.zip ? "[" + instDetail.zip + "]" : ""}{" "}
                {instDetail.addr ?? "-"} {instDetail.addrDetail ?? ""}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>지역</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {getCodeNm(instDetail.region2Gc) ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>분류</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getCodeNm(instDetail.instTypeCc) ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>특성</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {instDetail.ftr ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {getCodeNm(instDetail.statusCodeCc) ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ErrorContainer FallbackComponent={Fallback}>
        <LazyListInst instUkey={slug} />
      </ErrorContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/inst-info-list")}
        />
        <Link
          href={{
            pathname: "/cust/agnc-pi-modify",
            query: { instUkey: agncTempData.data.instUkey },
          }}
        >
          <ContainedButton buttonName="수정" />
        </Link>
      </Stack>
    </Container>
  );
}
