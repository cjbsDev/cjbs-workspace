"use client";

import * as React from "react";
import AppBar from "./components/AppBar";
import Link from "next/link";
import MyIcon from "icon/MyIcon";
import {
  Box,
  Collapse,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { snbMenuListData } from "./data/snbMenuListData";
import { cjbsTheme, yellow } from "cjbsDSTM";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import { useRouter } from "next-nprogress-bar";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import dayjs from "dayjs";
import PasswordChangeModal from "./components/PasswordChangeModal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import useArrayContainsCharacter from "./hooks/useArrayContainsCharacter";

interface ContextProps {
  children: React.ReactNode;
}

const drawerWidth = 228;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6.5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6.5)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 0),
  marginLeft: 16,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ".MuiDrawer-paper": {
    backgroundColor: "#1C2434",
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DrawerProvider({ children }: ContextProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>();
  const [currentIndex, setCurrentIndex] = React.useState<number>();
  const router = useRouter();
  const currentPathname = usePathname();
  // const segment = useSelectedLayoutSegments();
  // console.log("segment", segment);
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const { data: session, status } = useSession();
  const authority = session?.authorities;

  // console.log("authority ==>>", authority);

  const containsChar1 = useArrayContainsCharacter(authority, [
    "IT",
    "NGS_BI",
    "NGS_SALES",
  ]);
  // console.log("NGS_BI or NGS_SALES 체크 ==>>", containsChar1);

  const containsChar2 = useArrayContainsCharacter(authority, [
    "IT",
    "NGS_BI",
    "NGS_ANALYSIS",
  ]);
  // console.log("NGS_BI or NGS_ANALYSIS 체크 ==>>", containsChar2);

  // 3개월 후 계산
  const currentDate = dayjs();
  const futureDate = currentDate.add(3, "month");
  console.log("3개월 후", futureDate.format("YYYY-MM-DD"));

  const handleDrawerOpen = () => {
    setOpen(true);
    console.log("selectedIndex", selectedIndex);
    setSelectedIndex(currentIndex);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedIndex(snbMenuListData.length + 1);
  };

  const handleClick = (index: number) => {
    // console.log([selectedIndex, index]);
    setCurrentIndex(index);
    if (selectedIndex === index) {
      setSelectedIndex(snbMenuListData.length + 1);
    } else {
      setSelectedIndex(index);
    }
  };

  const handleMenuOpenClick = React.useCallback(() => {
    setOpen(true);
  }, []);

  // if () {}

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            // display:
            //   currentPathname === "/sign-in" ||
            //   currentPathname === "/sampleListPopup" ||
            //   currentPathname === "/sampleSimpleListPopup" ||
            //   currentPathname === "/agncListPopup" ||
            //   currentPathname === "/tnsfAgncListPopup" ||
            //   currentPathname === "/custListPopup" ||
            //   currentPathname === "/instListPopup" ||
            //   currentPathname === "/hsptListPopup" ||
            //   currentPathname === "/projectListPopup"
            //     ? "none"
            //     : "block",
            zIndex: 1000,
          }}
        >
          <DrawerHeader>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Link
                href="/"
                replace={true}
                onClick={() => setSelectedIndex(-1)}
              >
                {open ? (
                  <MyIcon icon="cj_mix" width={118} height={36} />
                ) : (
                  <MyIcon icon="cj_mix_updown" width={28} />
                )}
              </Link>
              <IconButton
                // onClick={!open ? handleDrawerOpen : handleDrawerClose}
                onClick={handleDrawerClose}
                sx={{
                  color: "white",
                  mr: 2,
                  // minWidth: "fit-content",
                  // ...(open && { ml: -3 }),
                }}
              >
                {/*{!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}*/}
                <ChevronLeftIcon />
              </IconButton>
            </Stack>
          </DrawerHeader>
          <Divider />
          <List
            sx={{
              color: "white",
              display: currentPathname === "sign-in" ? "none" : "block",
            }}
          >
            {snbMenuListData.map((item, index) => {
              const depthOne = item.menuPath.name;
              return (
                <ListItem
                  key={item.menuIcon + index.toString()}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    onClick={() => {
                      handleMenuOpenClick();
                      handleClick(index);
                      // item.menuPath.nestedPath.length === 0
                      //   ? handleHomeClick(item)
                      //   : handleClick(index);
                    }}
                    selected={currentPathname.includes(depthOne.split("/")[1])}
                    disabled={
                      item.menuPath.name === "" &&
                      item.menuPath.nestedPath.length === 0
                    }
                    sx={{
                      minHeight: 50,
                      justifyContent: open ? "initial" : "center",
                      px: 2,
                      "&.MuiListItemButton-root": {
                        borderRadius: "0px !important",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.main,
                        },
                      },
                      "&.Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 2 : "auto",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      <MyIcon icon={item.menuIcon} size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.menuLabel}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                    {item.menuPath.nestedPath.length !== 0 && open ? (
                      nestedOpen ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItemButton>

                  <Collapse
                    in={
                      index === selectedIndex
                      // index === selectedIndex ||
                      // currentPathname.includes(depthOne.split("/")[1])
                    }
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      sx={{ mt: 2, mb: 2, mr: 2, opacity: open ? 1 : 0 }}
                      disablePadding
                    >
                      {/*{depthOne === "/order" && (*/}
                      {/*  <>*/}
                      {/*    <Link*/}
                      {/*      key="/order-intn-reg"*/}
                      {/*      href="/order-intn-reg"*/}
                      {/*      className={*/}
                      {/*        "navLink" +*/}
                      {/*        (currentPathname === "/order-intn-reg"*/}
                      {/*          ? " activeLinkColor"*/}
                      {/*          : " normalLinkColor")*/}
                      {/*      }*/}
                      {/*      style={{*/}
                      {/*        display: containsChar2 ? "block" : "none",*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      내부 오더 등록*/}
                      {/*    </Link>*/}

                      {/*    <Link*/}
                      {/*      key="/order-extr-reg"*/}
                      {/*      href="/order-extr-reg"*/}
                      {/*      className={*/}
                      {/*        "navLink" +*/}
                      {/*        (currentPathname === "/order-extr-reg"*/}
                      {/*          ? " activeLinkColor"*/}
                      {/*          : " normalLinkColor")*/}
                      {/*      }*/}
                      {/*      style={{*/}
                      {/*        display: containsChar1 ? "block" : "none",*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      고객 오더 등록*/}
                      {/*    </Link>*/}
                      {/*  </>*/}
                      {/*)}*/}

                      {item.menuPath.nestedPath.map((item) => {
                        const isActive = currentPathname.startsWith(
                          item.menuPath,
                        );

                        return (
                          <Link
                            key={item.menuPath}
                            href={item.menuPath}
                            className={
                              "navLink" +
                              (isActive
                                ? " activeLinkColor"
                                : " normalLinkColor")
                            }
                            style={{
                              display:
                                item.menuPath === "/order-intn-reg" &&
                                !containsChar2
                                  ? "none"
                                  : item.menuPath === "/order-extr-reg" &&
                                      !containsChar1
                                    ? "none"
                                    : "block",
                            }}
                          >
                            {/*{item.menuLabel === "내부 오더 등록" &&*/}
                            {/*!containsChar2*/}
                            {/*  ? null*/}
                            {/*  : item.menuLabel === "고객 오더 등록" &&*/}
                            {/*      !containsChar1*/}
                            {/*    ? null*/}
                            {/*    : item.menuLabel}*/}
                            {item.menuLabel}
                          </Link>
                        );
                      })}
                    </List>
                  </Collapse>
                </ListItem>
              );
            })}
          </List>
          {/*<List>*/}
          {/*  <ListItem sx={{ color: "white" }}>*/}
          {/*    <Link href="/code-box" onClick={() => setSelectedIndex(-1)}>*/}
          {/*      <Stack direction="row" spacing={2}>*/}
          {/*        <MyIcon icon="lightning" size={20} color={yellow["300"]} />*/}
          {/*        <Box component="span">CodeBox</Box>*/}
          {/*      </Stack>*/}
          {/*    </Link>*/}
          {/*  </ListItem>*/}
          {/*</List>*/}
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor:
              currentPathname === "/" ? cjbsTheme.palette.grey["100"] : "white",

            flexGrow: 1,
            p: currentPathname === "/sign-in" ? 0 : 2.5,
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <DrawerHeader
            sx={
              {
                // display:
                //   currentPathname === "/custListPopup" ||
                //   currentPathname === "/sampleListPopup" ||
                //   currentPathname === "/sampleSimpleListPopup" ||
                //   currentPathname === "/agncListPopup" ||
                //   currentPathname === "/tnsfAgncListPopup" ||
                //   currentPathname === "/projectListPopup" ||
                //   currentPathname === "/instListPopup" ||
                //   currentPathname === "/hsptListPopup" ||
                //   currentPathname === "/sign-in"
                //     ? "none"
                //     : "block",
              }
            }
          />
          {children}
        </Box>
      </Box>

      <PasswordChangeModal
        onClose={handleModalClose}
        open={showModal}
        modalWidth={500}
      />
    </>
  );
}
