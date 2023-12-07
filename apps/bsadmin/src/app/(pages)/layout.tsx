"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Stack,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import AppBar from "../components/AppBar";
import { snbMenuListData } from "../data/snbMenuListData";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { yellow } from "cjbsDSTM/themes/color";
import Link from "next/link";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "cjbsDSTM";

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <section>{children}</section>;
}
