"use client";
import React, {useState} from "react";
import {
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Stack,
    Link,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import MyIcon from "icon/myIcon";
import AppBar from '@mui/material/AppBar';
import { useSession, signOut } from "next-auth/react"

// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }

const Header = ({}) => {
    const { data: session, status } = useSession()

    const popupState = usePopupState({
        variant: "popover",
        popupId: "useInfoMenu",
    });
    return (
        <AppBar position="fixed" color="inherit" sx={{ zIndex: 1000 }}>
            <Toolbar>
                <Box sx={{width: 120, mt:1}}>
                    <MyIcon icon="cj_bk"/>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box>
                    <Stack direction="row" justifyContent="center" alignItems="center">
                        {/*<Box sx={{ mr: 1 }}>*/}
                        {/*    <IconButton size="large" color="inherit">*/}
                        {/*        <Badge*/}
                        {/*            overlap="circular"*/}
                        {/*            badgeContent=" "*/}
                        {/*            variant="dot"*/}
                        {/*            color="error"*/}
                        {/*        >*/}
                        {/*            <MyIcon icon="bell" size={24} />*/}
                        {/*        </Badge>*/}
                        {/*    </IconButton>*/}
                        {/*</Box>*/}
                        <Box>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                            >
                                <MyIcon icon="profile-circle-fill" size={24} />
                                <Typography variant="body2">
                                    {status === "authenticated" ? session.user.email : "..."}

                                </Typography>
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
                                <MenuItem onClick={popupState.close}>
                                    <Link href="#" underline="none">
                                        <Typography textAlign="center" variant="body2">
                                            내 주문내역
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                    <Link href="/signout" underline="none">
                                        <Typography textAlign="center" variant="body2">
                                            로그아웃
                                        </Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        popupState.close();
                                        signOut();
                                    }}
                                >
                                    로그아웃
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
