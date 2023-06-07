"use client";

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
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import axios from "axios";
import {
  Box,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustViewProps {
  params: {
    slug: number;
  };
}
export default function Page({ params }: CustViewProps) {
  // console.log('params', params.slug)
  const { slug } = params;
  const { data, isLoading, error } = useSWR(
    `https://dummyjson.com/products/${slug}`,
    fetcher
  );
  const router = useRouter();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  console.log("detailViewData ==>>", data);

  return (
    <>
      {/*<LinkButton*/}
      {/*  startIcon={<ArrowBackIosRoundedIcon />}*/}
      {/*  buttonName="prev"*/}
      {/*  onClick={() => router.push("cust/cust-list")}*/}
      {/*/>*/}
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="고객 정보" />
        </Box>

        <Typography variant="subtitle1">EzBioCloud 가입 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH>고객번호</TH>
                <TD colSpan={3}>&#45;</TD>
              </TableRow>
              <TableRow>
                <TH>아이디</TH>
                <TD>&#45;</TD>
                <TH>서브 이메일</TH>
                <TD>&#45;</TD>
              </TableRow>
              <TableRow>
                <TH>영문 이름</TH>
                <TD>&#45;</TD>
                <TH>호칭</TH>
                <TD>&#45;</TD>
              </TableRow>
              <TableRow>
                <TH>국가</TH>
                <TD>&#45;</TD>
                <TH>소속 단체</TH>
                <TD>&#45;</TD>
              </TableRow>
              <TableRow>
                <TH>academic</TH>
                <TD>&#45;</TD>
                <TH>가입일</TH>
                <TD>&#45;</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">기본 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH>이름</TH>
                <TD>&#45;</TD>
                <TH>연락처</TH>
                <TD>&#45;</TD>
              </TableRow>
              <TableRow>
                <TH>거래처(PI)</TH>
                <TD colSpan={3}>&#45;</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">메모</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TD sx={{ minHeight: 130 }}>
                  사용자를 차단 합니다. (차단된 사용자는 주문서 작성 화면에
                  로그인 할 수 없습니다.)사용자를 차단 합니다. (차단된 사용자는
                  주문서 작성 화면에 로그인 할 수 없습니다.)사용자를 차단
                  합니다. (차단된 사용자는 주문서 작성 화면에 로그인 할 수
                  없습니다.)사용자를 차단 합니다. (차단된 사용자는 주문서 작성
                  화면에 로그인 할 수 없습니다.)사용자를 차단 합니다. (차단된
                  사용자는 주문서 작성 화면에 로그인 할 수 없습니다.)사용자를
                  차단 합니다. (차단된 사용자는 주문서 작성 화면에 로그인 할 수
                  없습니다.)
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="subtitle1">사용 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH>상태</TH>
                <TD>&#45;</TD>
                <TH>마지막 수정일</TH>
                <TD>&#45;</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("cust/cust-list")}
          />
          <ContainedButton buttonName="수정" />
        </Stack>
      </Container>
    </>
  );
}
