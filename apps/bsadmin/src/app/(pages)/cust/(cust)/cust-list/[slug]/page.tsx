"use client";

import {
  ContainedButton,
  OutlinedButton,
  LinkButton,
  Title1,
  TH,
  TD,
  RHFInputDefaultType,
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
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <ContainedButton buttonName="리더" />
            <ContainedButton buttonName="사용" />
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
                  {data.stock}{" "}
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
                hyungseok.seo@cj.net
              </TD>
              <TH sx={{ width: "15%" }}>서브 이메일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                -
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>영문 이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                hyungseok seo
              </TD>
              <TH sx={{ width: "15%" }}>호칭</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                MR
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>국가</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                Korea
              </TD>
              <TH sx={{ width: "15%" }}>소속 단체</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                CJ Bioscience
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>academic</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                -
              </TD>
              <TH sx={{ width: "15%" }}>가입일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                -
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
                &#45;
              </TD>
              <TH sx={{ width: "15%" }}>연락처</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                &#45;
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }} colSpan={5}>
                &#45;
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
              <TD sx={{ minHeight: 130 }}>
                사용자를 차단 합니다. (차단된 사용자는 주문서 작성 화면에 로그인
                할 수 없습니다.)사용자를 차단 합니다. (차단된 사용자는 주문서
                작성 화면에 로그인 할 수 없습니다.)사용자를 차단 합니다. (차단된
                사용자는 주문서 작성 화면에 로그인 할 수 없습니다.)사용자를 차단
                합니다. (차단된 사용자는 주문서 작성 화면에 로그인 할 수
                없습니다.)사용자를 차단 합니다. (차단된 사용자는 주문서 작성
                화면에 로그인 할 수 없습니다.)사용자를 차단 합니다. (차단된
                사용자는 주문서 작성 화면에 로그인 할 수 없습니다.)
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
              <TH sx={{ width: "15%" }}>상태</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                &#45;
              </TD>
              <TH sx={{ width: "15%" }}>마지막 수정일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                &#45;
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("cust/cust-list")}
        />
        <ContainedButton
          buttonName="수정"
          onClick={() => router.push("cust/cust-modify")}
        />
      </Stack>
    </Container>
  );
}
