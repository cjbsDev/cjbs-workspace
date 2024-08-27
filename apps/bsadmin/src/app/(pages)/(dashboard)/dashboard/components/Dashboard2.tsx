import React from "react";
import {
  Container,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import MyIcon from "icon/MyIcon";
import { useSession } from "next-auth/react";
import useArrayContainsCharacter from "../../../../hooks/useArrayContainsCharacter";

const Dashboard2 = () => {
  const { data: session, status } = useSession();
  const authority = session?.authorities;
  // console.log("AUTHORITY ==>>", authority);

  const isContainsNgsAnalysis = useArrayContainsCharacter(authority, [
    "NGS_ANALYSIS",
  ]);
  const isContainsNgsBI = useArrayContainsCharacter(authority, ["NGS_BI"]);
  const isContainsDiscoveryClinical = useArrayContainsCharacter(authority, [
    "DISCOVERY",
    "CLINICAL",
  ]);

  // console.log("containsNGS_ANALYSIS ==>>", isContainsNgsAnalysis);

  return (
    <Container maxWidth="xl">
      <Typography sx={{ mb: 1 }}>바로가기</Typography>
      <Grid container sx={{ mb: 2 }} spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item>
            <Link href="/orsh-list" style={{ display: "block" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MyIcon icon="sheet" size={30} />
                <div>
                  <Typography variant="subtitle1">주문</Typography>
                  <Typography variant="body2">
                    주문서 관리 및 견적서 관리
                  </Typography>
                </div>
              </Stack>
            </Link>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Link href="/order-list" style={{ display: "block" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MyIcon icon="order" size={30} />
                <div>
                  <Typography variant="subtitle1">오더</Typography>
                  <Typography variant="body2">
                    오더 등록 및 오더 관리
                  </Typography>
                </div>
              </Stack>
            </Link>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <Link href="/exp-info-list" style={{ display: "block" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <MyIcon icon="experiment" size={30} />
                <div>
                  <Typography variant="subtitle1">실험</Typography>
                  <Typography variant="body2">
                    실험 정보, RUN, Sample 관리
                  </Typography>
                </div>
              </Stack>
            </Link>
          </Item>
        </Grid>
        {isContainsDiscoveryClinical ? (
          ""
        ) : (
          <>
            <Grid
              item
              xs={3}
              sx={{
                display:
                  isContainsNgsAnalysis || isContainsNgsBI ? "none" : "block",
              }}
            >
              <Item>
                <Link href="/ledger-cust-pay-list" style={{ display: "block" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MyIcon icon="read" size={30} />
                    <div>
                      <Typography variant="subtitle1">장부</Typography>
                      <Typography variant="body2">
                        분석내역서, 거래명세서, 세금계산서 관리
                      </Typography>
                    </div>
                  </Stack>
                </Link>
              </Item>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: isContainsNgsAnalysis ? "none" : "block",
              }}
            >
              <Item>
                <Link href="/cust-list" style={{ display: "block" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MyIcon icon="customer" size={30} />
                    <div>
                      <Typography variant="subtitle1">고객</Typography>
                      <Typography variant="body2">
                        고객, 거래처, 기관 정보 관리
                      </Typography>
                    </div>
                  </Stack>
                </Link>
              </Item>
            </Grid>
            <Grid item xs={3}>
              <Item>
                <Link href="/master-code-list" style={{ display: "block" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MyIcon icon="manage" size={30} />
                    <div>
                      <Typography variant="subtitle1">관리</Typography>
                      <Typography variant="body2">
                        Admin기본 data 설정 관리
                      </Typography>
                    </div>
                  </Stack>
                </Link>
              </Item>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: isContainsNgsBI ? "none" : "block",
              }}
            >
              <Item>
                <Link href="/stock-mngmnt-list" style={{ display: "block" }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MyIcon icon="stock" size={30} />
                    <div>
                      <Typography variant="subtitle1">재고</Typography>
                      <Typography variant="body2">
                        재고 및 입출고 관리
                      </Typography>
                    </div>
                  </Stack>
                </Link>
              </Item>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard2;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  // textAlign: "center",
  color: theme.palette.text.secondary,
}));
