"use client";

import React from "react";
import {
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { signOut } from "next-auth/react";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import MyIcon from "icon/MyIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSession } from "next-auth/react";
import { cjbsTheme, LinkButton } from "cjbsDSTM";
import Skeleton from "@mui/material/Skeleton";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

const drawerWidth = 228;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

const AppBarNew = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  borderBottom: "1px solid #CED4DA",
  boxShadow: "none",
  padding: 0,
  margin: 0,
}));
const AppBar = ({ open, handleDrawerOpen, handleDrawerClose }: AppBarProps) => {
  const router = useRouter();
  const currentPathname = usePathname();
  const { data: session, status } = useSession();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "useInfoMenu",
  });

  console.log("SESSION", session);

  return (
    <AppBarNew
      position="fixed"
      open={open}
      color="inherit"
      sx={{
        zIndex: 1000,
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
      }}
    >
      <Toolbar sx={{}}>
        <Box sx={{}}>
          <IconButton
            color="inherit"
            onClick={!open ? handleDrawerOpen : handleDrawerClose}
            edge="start"
            sx={{
              p: 0,
              m: 0,
              ml: 3.5,
              minWidth: "fit-content",
              ...(open && { ml: -3 }),
            }}
          >
            {/*<MenuIcon />*/}
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {status === "authenticated" ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              {/* 알림 */}
              {/*<Box sx={{ mr: 1 }}>*/}
              {/*  <IconButton size="large" color="inherit">*/}
              {/*    <Badge*/}
              {/*      overlap="circular"*/}
              {/*      badgeContent=" "*/}
              {/*      variant="dot"*/}
              {/*      color="error"*/}
              {/*    >*/}
              {/*      <MyIcon icon="bell" size={24} />*/}
              {/*    </Badge>*/}
              {/*  </IconButton>*/}
              {/*</Box>*/}
              <Box>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <MyIcon icon="profile-circle-fill" size={24} />
                  <Typography variant="body2">{session.user.email}</Typography>
                  <IconButton
                    {...bindTrigger(popupState)}
                    edge="end"
                    color="inherit"
                    size="small"
                  >
                    <ExpandMoreRoundedIcon />
                  </IconButton>
                </Stack>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      router.push("/my-pwchk");
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MyIcon icon="pencil-alt" size={20} />
                      <Typography variant="body2">내 정보관리</Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      popupState.close();
                      signOut({ callbackUrl: "/sign-in" });
                    }}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <MyIcon icon="logout" size={20} />
                      <Typography variant="body2">Sign Out</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          ) : (
            <Skeleton
              animation="wave"
              width={150}
              height={30}
              sx={{ backgroundColor: cjbsTheme.palette.grey["100"] }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBarNew>
  );
};

export default AppBar;
