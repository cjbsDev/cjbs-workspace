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

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import MyIcon from "icon/MyIcon";
import AppBar from '@mui/material/AppBar';
import { useSession, signOut } from "next-auth/react"
import {useRouter} from "next-nprogress-bar";

// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean;
// }

const Header = ({}) => {
    const router = useRouter();
    const { data: session, status } = useSession()

    const popupState = usePopupState({
        variant: "popover",
        popupId: "useInfoMenu",
    });

    const goMyOrderList = () => {
        router.push("/order-list");
    }

    return (
        <AppBar position="fixed" color="inherit" sx={{ zIndex: 1000 }}>
            <Toolbar>
                <Box sx={{width: 120, mt:1}}>
                    <Link href="/main" >
                        <MyIcon icon="cj_bk"/>
                    </Link>
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
                                <MenuItem
                                    onClick={() => {
                                        popupState.close();
                                        goMyOrderList();
                                    }}
                                >
                                    <Typography textAlign="center" variant="body2">
                                        내 주문내역
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        popupState.close();
                                        signOut();
                                    }}
                                >
                                    <Typography textAlign="center" variant="body2">
                                        로그아웃
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
