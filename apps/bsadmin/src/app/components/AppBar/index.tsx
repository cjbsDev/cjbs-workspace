import React from 'react';
import {Menu, MenuItem, Toolbar, Typography, IconButton, Box, Badge, Stack} from '@mui/material'
import {styled} from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import {InputDefaultType} from "@components/index";

const drawerWidth = 228;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  borderBottom: '1px solid #CED4DA',
  boxShadow: 'none',
  padding: 0,
  margin: 0,
}));
const Header = ({open, handleDrawerOpen}) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'useInfoMenu' })
  return (
    <AppBar position="fixed" open={open} color='inherit'>
      <Toolbar>
        <Box sx={{}}>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        {/*<InputDefaultType*/}
        {/*  InputProps={{*/}
        {/*    startAdornment: <InputAdornment position="start">*/}
        {/*      <SearchRoundedIcon />검색*/}
        {/*    </InputAdornment>,*/}
        {/*    endAdornment: <InputAdornment position="end">*/}
        {/*      <IconButton>*/}
        {/*        <ClearRoundedIcon />*/}
        {/*      </IconButton>*/}
        {/*    </InputAdornment>*/}
        {/*  }}*/}
        {/*/>*/}
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <Stack
            direction='row'
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <IconButton size="large" color="inherit">
                <Badge overlap="circular" badgeContent=" " variant='dot' color="error">
                  <NotificationsOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>
            <Box>
              <Stack
                direction='row'
                justifyContent="center"
                alignItems="center"
              >
                <AccountCircleOutlinedIcon />
                <Typography variant='body2'>eunjung.lee9</Typography>
                <IconButton
                  {...bindTrigger(popupState)}
                  edge="end"
                  color="inherit"
                >
                  <ExpandMoreRoundedIcon />
                </IconButton>
              </Stack>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>
                  <Typography textAlign='center' variant='body2'>
                    Sign Out
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
