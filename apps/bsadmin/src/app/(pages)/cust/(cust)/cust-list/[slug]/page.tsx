"use client";

import { useEffect } from "react";
import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
} from "cjbsDSTM";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  Chip,
  Container,
  Stack,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import MyIcon from "icon/myIcon";
import Dayjs from "dayjs";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustViewProps {
  params: {
    slug: string;
  };
}

export default function CustPage({ params }: CustViewProps) {
  // console.log('params', params.ukey)
  const { slug } = params;
  const router = useRouter();

  const { data: custTemp, error: custError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher
  );

  const { data: custEBCTemp, error: custEBCError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/ebc/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (custError || custEBCError) {
      console.log("Failed to load");
    }
  }, [custError, custEBCError]);

  if (!custTemp || !custEBCTemp) {
    return <div>Loading...</div>;
  }
  const custData = custTemp.data;
  const custEBCData = custEBCTemp.data;

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="고객 정보" />
      </Box>

      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <Typography variant="subtitle1">EzBioCloud 가입 정보</Typography>
          </Stack>
        </Grid>
      </Grid>

      <TableContainer sx={{ mb: 5 }}>
        {/* <Table  sx={{ tableLayout: "fixed" }}> */}
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>고객번호</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {custEBCData.ebcUid}{" "}
                  <Chip
                    icon={<MyIcon icon="customer" size={25} color="red" />}
                    label={"Leader"}
                    size="small"
                    sx={{
                      backgroundColor: "#E6F0FA",
                      color: "#006ECD",
                    }}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcEmail ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>서브 이메일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcSubEmail ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>영문 이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcFullName ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>호칭</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcTitle ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>국가</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcNtly ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>소속 단체</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcInstNm ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>academic</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcIsSchl ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>가입일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcJoinedAt ? custEBCData.ebcJoinedAt : "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">기본 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custData.custNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>연락처</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custData.tel1 ?? "-"}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                {custData.agncNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">메모</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TD sx={{ minHeight: 130 }}>{custData.memo ?? "-"}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">사용 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custData.isAcs === "Y" ? "사용" : "차단"}
              </TD>
              <TH sx={{ width: "15%" }}>마지막 수정일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custData.modifiedAt ? custData.modifiedAt : "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/cust/cust-list")}
        />
        <ContainedButton
          buttonName="수정"
          onClick={() => router.push("/cust/cust-modify/" + slug)}
        />
      </Stack>
    </Container>
  );
}
