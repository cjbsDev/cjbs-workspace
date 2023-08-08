import React from "react";
import {
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Stack,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { signOut } from "next-auth/react";

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import MyIcon from "icon/myIcon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useSession } from "next-auth/react";
import { cjbsTheme, LinkButton } from "cjbsDSTM";
import Skeleton from "@mui/material/Skeleton";

const drawerWidth = 228;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
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
const Header = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const { data: session, status } = useSession();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "useInfoMenu",
  });
  return (
    <AppBar position="fixed" open={open} color="inherit" sx={{ zIndex: 1000 }}>
      <Toolbar>
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
                      signOut();
                    }}
                  >
                    Sign Out
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
    </AppBar>
  );
};

export default Header;
