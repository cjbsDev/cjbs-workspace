"use client";

import React from "react";
import {
  OutlinedButton,
  ContainedButton,
  TH,
  TD,
  Title1,
  Form,
  ErrorContainer,
  Fallback,
} from "cjbsDSTM";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableRow,
  TableContainer,
} from "@mui/material";
import axios from "axios";
import useSWR from "swr";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import dynamic from "next/dynamic";
import { fetcher } from "api";
import { toast } from "react-toastify";

const LazyStndPriceDetailList = dynamic(() => import("./StndPriceDetailList"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});

interface ViewProps {
  params: {
    slug: string;
  };
}

const LazyCommontModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  },
);

export default function SvcStdPricePage({ params }: ViewProps) {
  // init
  const { slug } = params;
  const stndPriceMpngUkey = slug;
  const router = useRouter();

  // load
  const {
    data: codeData,
    error,
    isLoading,
  } = useSWR(`/mngr/stndPrice/${stndPriceMpngUkey}`, fetcher, {
    revalidateOnFocus: true,
  });
  if (isLoading) {
    return <SkeletonLoading />;
  }
  /*
  {
    "anlsMtMc": "BS_0100008001",
    "anlsMtMcVal": "illumina MiSeq 2x250",
    "anlsTypeMc": "BS_0100006001",
    "anlsTypeMcVal": "CG​",
    "prdcSizeMc": "BS_0100010001",
    "prdcSizeMcVal": "없음",
    "stndPriceMpngUkey": "299859",
    "stndTypeCode": "1010101",
    "srvcTypeMc": "BS_0100005001",
    "srvcTypeMcVal": "Analysis",
  }

  {
    "anlsMtMc": "분석방법(플랫폼)코드",
    "anlsMtMcVal": "분석방법(플랫폼)코드값",
    "anlsTypeMc": "분석종류코드",
    "anlsTypeMcVal": "분석종류코드값",
    "prdcSizeMc": "생산량코드",
    "prdcSizeMcVal": "생산량코드값",
    "srvcTypeMc": "서비스분류코드",
    "srvcTypeMcVal": "서비스분류코드값",
    "stndPriceDetailCnt": 0,
    "stndPriceMpngUkey": "기준가매핑ukey",
    "stndTypeCode": "기준가분류코드"
  }
*/
  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="서비스 기준가 정보" />
      </Box>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "252px" }}>서비스 분류</TH>
              <TD>
                {codeData.srvcTypeMcVal ?? ""} &gt; {codeData.anlsTypeMcVal}{" "}
                &gt; {codeData.anlsMtMcVal}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "252px" }}>생산량</TH>
              <TD>{codeData.prdcSizeMcVal ?? ""}</TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "252px" }}>서비스 분류 코드</TH>
              <TD>{codeData.srvcTypeMc ?? ""}</TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 세부 기준가 */}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyStndPriceDetailList slug={slug} />
      </ErrorContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/svc-std-price-list")}
          size="small"
        />
      </Stack>

      <Box sx={{ mb: 5 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyCommontModifyLog
            apiName="stndPrice"
            uKey={slug}
            logTitle=""
            type="mngr"
          />
        </ErrorContainer>
      </Box>
    </Container>
  );
}
