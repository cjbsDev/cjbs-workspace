"use client";

import { useRouter } from "next-nprogress-bar";
import {Box, Container, Stack, Typography} from "@mui/material";
import * as React from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { cjbsTheme, ErrorContainer, Fallback } from "cjbsDSTM";
import SkeletonLoading from "../../../../components/SkeletonLoading";

const LazyMtpFullService = dynamic(() => import("./(mtp)/(service)/MtpFullService"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});
const LazyMtpNgsService = dynamic(() => import("./(mtp)/(service)/MtpNgsService"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});
const LazyMtpSequencing = dynamic(() => import("./(mtp)/(service)/MtpSequencing"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function MtpDetailPage() {

  const params = useParams();
  console.log("params", params.slug[1]);
  const serviceType = params.slug[1];

  return (
    <Container disableGutters={true}>
      <Box
        sx={{
          // mb: 20,
          // mt: 11,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "space-between",
          padding: "50px 0 50px 0",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{
            // borderBottom: '1px solid #000',
            p: "12px 20px",
            borderRadius: "4px",
            backgroundColor: cjbsTheme.palette.grey["700"],
            color: "#FFF",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">MTP&nbsp;&nbsp;</Typography>
            <Typography variant="subtitle2" sx={{ pt: "3px" }}>
              Microbiome Taxonomic Profiling
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignContent: "start",
              alignItems: "center",
            }}
          >
            {serviceType === "fs" ? (
              <Typography variant="subtitle1">Full Service&nbsp;</Typography>
            ) : (
              ""
            )}
            {serviceType === "ngs" ? (
              <Typography variant="subtitle1">NGS 실험&nbsp;</Typography>
            ) : (
              ""
            )}
            {serviceType === "so" ? (
              <Typography variant="subtitle1">Sequencing Only&nbsp;</Typography>
            ) : (
              ""
            )}
          </Box>
        </Stack>
        <ErrorContainer FallbackComponent={Fallback}>
          {serviceType === "fs" ? <LazyMtpFullService /> : ""}
          {serviceType === "ngs" ? <LazyMtpNgsService /> : ""}
          {serviceType === "so" ? <LazyMtpSequencing /> : ""}
        </ErrorContainer>
      </Box>
    </Container>
  );
}