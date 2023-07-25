import React, {MouseEvent, useState, useEffect} from 'react';
import {Box, Button, ListItemIcon, Menu, MenuItem, MenuList, Typography} from '@mui/material';
import useSWR from 'swr';
// import {fetcher} from '@components/fnc/fetcher';
import Image from 'next/image';
import cheveronBk from '@public/img/icons/cheveron-bk.png';
import personCircleBk from '@public/img/icons/person_circle_bk.png';
import creditImg from '@public/img/icons/credit.png';
import logoutImg from '@public/img/icons/logout.png';
import couponImg from '@public/img/icons/icon_coupon.png';
import {useRecoilState} from 'recoil';
import {couponCodeModalAtom} from '@src/recoil/atoms/modalAtom';

const UserInfos = (props) => {
    // const [currentDomainValue, setCurrentDomainValue] = useState<string>('');
    // const [userEmail, setUserEmail] = useState('');

    const [couponCodeModalOpen, setCouponCodeModalOpen] = useRecoilState(couponCodeModalAtom);

    const {email, anchorElUser, handleOpenUserMenu, handleCloseUserMenu, handleSignOut} = props;

    // useEffect(() => {
    //   setUserEmail(email);
    // }, [email]);

    // const {data: creditData, error: creditError} = useSWR('/credit/info', fetcher, {
    //     refreshInterval: 0,
    //     suspense: true,
    // });

    return (
        <>
            <Button
                onClick={handleOpenUserMenu}
                // startIcon={<AccountCircleOutlinedIcon />}
                sx={{color: '#000000', textTransform: 'lowercase'}}
                size='medium'
            >
                <Image
                    // src={router.pathname === '/credit' ? exBoimeWhite : ezBiome}
                    src={personCircleBk}
                    alt=''
                    width={20}
                    height={20}
                    style={{marginRight: '4px'}}
                />
                {/*<Typography variant='body2'>{userEmail}</Typography>*/}
                <Image
                    // src={router.pathname === '/credit' ? exBoimeWhite : ezBiome}
                    src={cheveronBk}
                    alt=''
                    width={20}
                    height={20}
                    style={{marginLeft: '4px'}}
                />
            </Button>
            <Menu
                sx={{mt: '35px'}}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuList sx={{p: 0}}>
                    <MenuItem
                        disabled={true}
                        sx={{
                            '&.Mui-disabled': {
                                opacity: 1,
                            },
                        }}
                    >
                        <Image src={personCircleBk} alt='' width={20} height={20} style={{marginRight: '10px'}} />
                        <Typography textAlign='center' variant='body2'>
                            {email}
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        disabled={true}
                        sx={{
                            '&.Mui-disabled': {
                                opacity: 1,
                            },
                        }}
                    >
                        <Image src={creditImg} alt='' width={20} height={20} style={{marginRight: '10px'}} />
                        <Typography textAlign='center' variant='body2'>
                            {creditData ? creditData.balance : 0} Credits <small>({creditData.expiredAt})</small>
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            setCouponCodeModalOpen(true);
                            handleCloseUserMenu();
                        }}
                    >
                        <Image src={couponImg} alt='' width={20} height={20} style={{marginRight: '10px'}} />
                        <Typography textAlign='center' variant='body2'>
                            Register Coupon
                        </Typography>
                    </MenuItem>
                    <MenuItem sx={{textAlign: 'center'}} onClick={handleSignOut}>
                        {/* <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon> */}
                        <Image
                            // src={router.pathname === '/credit' ? exBoimeWhite : ezBiome}
                            src={logoutImg}
                            alt=''
                            width={20}
                            height={20}
                            style={{marginRight: '10px'}}
                        />
                        <Typography variant='body2'>Sign out</Typography>
                    </MenuItem>
                </MenuList>
            </Menu>
        </>
    );
};

export default UserInfos;
