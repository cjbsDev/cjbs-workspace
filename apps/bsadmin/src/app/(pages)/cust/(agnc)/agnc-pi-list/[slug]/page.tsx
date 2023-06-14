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

interface DataItem {
  isLeader: string;
  leaderEmail: string;
  leaderNm: string;
  isAcs: string;
  ukey: any;
}

export default function AgncPage({ params }: CustViewProps) {
  const { slug } = params;
  const router = useRouter();

  const { data: agncTempData, error: custError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (custError) {
      console.log("Failed to load");
    }
  }, [custError]);

  if (!agncTempData) {
    return <div>Loading...</div>;
  }
  const agncData = agncTempData.data;
  const agncCustList: DataItem[] = agncTempData.data.custDetail;

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="거래처(PI) 정보" />
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
              <TH sx={{ width: "15%" }}>기관명</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {agncData.instNm ?? "-"}
                  {agncData.isSpecialMng === "Y" && (
                    <Chip
                      icon={<MyIcon icon="customer" size={25} color="red" />}
                      label={"SP"}
                      size="small"
                      sx={{
                        backgroundColor: "#E6F0FA",
                        color: "#006ECD",
                      }}
                    />
                  )}
                </Stack>
              </TD>
              <TH sx={{ width: "15%" }}>거래처(PI)명</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.agncNm ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>주소</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {agncData.addrDetail ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">
        맴버( 총 {agncCustList.length}명 )
      </Typography>
      <TableContainer component={Box} sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH component="th" scope="row" sx={{ width: "20px" }}>
                <Typography variant="subtitle1"></Typography>
              </TH>
              <TH sx={{ width: "70px" }}>
                <Typography variant="subtitle1">리더</Typography>
              </TH>
              <TH>
                <Typography variant="subtitle1">아이디</Typography>
              </TH>
              <TH>
                <Typography variant="subtitle1">이름</Typography>
              </TH>
              <TH sx={{ width: "100px" }}>
                <Typography variant="subtitle1">상태</Typography>
              </TH>
            </TableRow>

            {agncCustList.map((dataItem, index) => (
              <TableRow key={dataItem.ukey}>
                <TD>{index + 1}</TD>
                <TD>{dataItem.isLeader === "Y" ? "리더" : "일반"}</TD>
                <TD>{dataItem.leaderEmail}</TD>
                <TD>{dataItem.leaderNm}</TD>
                <TD>{dataItem.isAcs === "Y" ? "사용" : "차단"}</TD>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="subtitle1">기타 운영 정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>선결제 금액</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.pymnPrice ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>영업 담당자</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {agncData.bsnsNm ?? "-"}
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
              <TD sx={{ minHeight: 130 }}>{agncData.memo ?? "-"}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("cust/agnc-pi-list")}
        />
        <ContainedButton
          buttonName="수정"
          onClick={() => router.push("cust/agnc-pi-modify" + agncData.agncUkey)}
        />
      </Stack>
    </Container>
  );
}
