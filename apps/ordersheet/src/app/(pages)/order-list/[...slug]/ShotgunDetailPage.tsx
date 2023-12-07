"use client";

import {cjbsTheme, ConfirmModal, ErrorContainer, Fallback, Title1} from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import {Box, Container, Stack, styled, Typography} from "@mui/material";
import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "@components/SkeletonLoading";
import {useParams} from "next/navigation";


const LazyShotgunFullService = dynamic(() => import("./(shotgun)/(service)/ShotgunFullService"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});
const LazyShotgunAnalysis = dynamic(() => import("./(shotgun)/(service)/ShotgunAnalysis"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});
const LazyShotgunSequencing = dynamic(() => import("./(shotgun)/(service)/ShotgunSequencing"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function OrshMtpDetailPage() {
  const router = useRouter();

  const params = useParams();
  console.log("params", params.slug[1]);
  const serviceType = params.slug[1];

  return (

    <Container disableGutters={true}>
      <Box
        sx={{
          // mb: 20,
          // mt: 11,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'space-between',
          padding: '50px 0 50px 0',
          flexDirection: 'column',
          height:"100%"
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={0}
          sx={{
            // borderBottom: '1px solid #000',
            p: '12px 20px',
            borderRadius: '4px',
            backgroundColor: cjbsTheme.palette.grey['700'],
            color: "#FFF",
          }}
        >
          <Box sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'center',
          }}>
            <Typography variant="h4">Shotgun Metagenome&nbsp;&nbsp;</Typography>
            <Typography variant="subtitle2" sx={{ pt: "3px" }}>
              Shotgun Sequencing
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignContent: 'start',
            alignItems: 'center',
          }}>
            {serviceType === 'fs' ? (
              <Typography variant="subtitle1">
                Full Service&nbsp;
              </Typography>
            ) : ('')}
            {serviceType === 'ao' ? (
              <Typography variant="subtitle1">
                Analysis Only&nbsp;
              </Typography>
            ) : ('')}
            {serviceType === 'so' ? (
              <Typography variant="subtitle1">
                Sequencing Only&nbsp;
              </Typography>
            ) : ('')}
          </Box>
        </Stack>

        <ErrorContainer FallbackComponent={Fallback}>
          {serviceType === 'fs' ? (
            <LazyShotgunFullService />
          ) : ('')}
          {serviceType === 'ao' ? (
            <LazyShotgunAnalysis />
          ) : ('')}
          {serviceType === 'so' ? (
            <LazyShotgunSequencing />
          ) : ('')}
        </ErrorContainer>

      </Box>

    </Container>
  );
}
