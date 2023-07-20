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
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import AppBar from "../components/AppBar";
import { snbMenuListData } from "../data/snbMenuListData";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import MyIcon from "icon/myIcon";

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  marginLeft: 12,
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
export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const router = useRouter();
  const currentPathname = usePathname();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHomeClick = (item: {
    menuLabel?: string;
    menuIcon?: string;
    menuPath: any;
  }) => {
    console.log(";;;;;;;");
    router.push(item.menuPath.name);
    setSelectedIndex(0);
    // setOpen(false)
  };
  const handleClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(index);
    }
    // router.push(path)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />

      <Drawer variant="permanent" open={open} sx={{ zIndex: 1000 }}>
        <DrawerHeader>
          {/*<IconButton*/}
          {/*  onClick={!open ? handleDrawerOpen : handleDrawerClose}*/}
          {/*  sx={{ color: "red", right: -30, zIndex: 10 }}*/}
          {/*>*/}
          {/*  {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}*/}
          {/*</IconButton>*/}

          {open ? (
            <MyIcon icon="cj_mix" width={119} />
          ) : (
            <MyIcon icon="cj_mix_updown" width={28} />
          )}
        </DrawerHeader>
        <Divider />
        <List sx={{ color: "white" }}>
          {snbMenuListData.map((item, index) => {
            const depthOne = item.menuPath.name;
            //console.log("hhhh", currentPathname.includes(depthOne.split("/")));
            //console.log("pppp", depthOne.split("/")[1]);
            return (
              <ListItem
                key={item.menuLabel}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    item.menuPath.nestedPath.length === 0
                      ? handleHomeClick(item)
                      : handleClick(index);
                  }}
                  selected={currentPathname.includes(depthOne.split("/")[1])}
                  disabled={
                    item.menuPath.name === "" &&
                    item.menuPath.nestedPath.length === 0
                      ? true
                      : false
                  }
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.MuiListItemButton-root": {
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
                      mr: open ? 3 : "auto",
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
                  // in={currentPathname.includes(depthOne.split("/")[0])}
                  in={
                    index === selectedIndex ||
                    currentPathname.includes(depthOne.split("/")[1])
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" sx={{ p: 2 }} disablePadding>
                    {item.menuPath.nestedPath.map((item) => {
                      const isActive = currentPathname.startsWith(
                        item.menuPath
                      );
                      return (
                        // <ListItemButton
                        //   component="a"
                        //   key={item.menuLabel}
                        //   sx={{
                        //     pl: 8.3,
                        //     color: theme.palette.secondary.main,
                        //     "&.MuiListItemButton-root": {
                        //       "&:hover": {
                        //         backgroundColor: "transparent",
                        //         color: theme.palette.common.white,
                        //         fontWeight: "600",
                        //       },
                        //     },
                        //     "&.Mui-selected": {
                        //       backgroundColor: "transparent",
                        //       color: theme.palette.common.white,
                        //       fontWeight: "600",
                        //     },
                        //   }}
                        //   // onClick={() => router.replace(item.menuPath)}
                        //   href={item.menuPath}
                        //   selected={currentPathname === item.menuPath}
                        //   disabled={item.menuPath === "" ? true : false}
                        // >
                        //   <ListItemText primary={item.menuLabel} />
                        // </ListItemButton>
                        <Link
                          href={item.menuPath}
                          className={
                            "navLink" +
                            (isActive ? " activeLinkColor" : " normalLinkColor")
                          }
                        >
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
      </Drawer>

      <Box component="main" sx={{ display: "grid", flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
