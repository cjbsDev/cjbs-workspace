"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  AlertModal,
  CheckboxM5,
  CheckboxGV,
  ContainedButton,
  LinkButton,
  Form,
  RadioM1,
  RadioGV,
  SelectBox,
  OutlinedButton,
  InputValidation,
  ResetButton,
  XlargeButton,
  cjbsTheme,
} from "cjbsDSTM";
// Color
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import { useRouter } from "next-nprogress-bar";
import { Box, Typography } from "@mui/material";

const ListDashboardPage = () => {
  return (
    <Box>
      <Typography variant="h1">Dashboard Page.</Typography>
    </Box>
  );
};

export default ListDashboardPage;
