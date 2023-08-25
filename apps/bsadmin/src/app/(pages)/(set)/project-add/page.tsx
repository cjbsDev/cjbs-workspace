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
  InputValidation,
  PostCodeBtn,
  SelectBox,
  RadioGV,
  Form,
} from "cjbsDSTM";
import useSWR from "swr";
import {
  Typography,
  Box,
  Stack,
  Container,
  Table,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import SkeletonLoading from "../../../components/SkeletonLoading";
import axios from "axios";

// 먼저 Header & Detail 분리부터 해야될듯.

const LazyProjectHeader = dynamic(() => import("./ProjectHeader"), {
  ssr: false,
  loading: () => <SkeletonLoading height={82} />,
});

// 프로젝트 등록
const ProjectAdd = () => {
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="과제 등록" />
      </Box>
      <LazyProjectHeader />
    </Container>
  );
};

export default ProjectAdd;
