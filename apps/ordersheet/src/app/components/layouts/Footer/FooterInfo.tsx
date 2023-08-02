import React from 'react';
import {Box, Button, Chip, Divider, Grid, Link, Menu, MenuItem, Stack, Typography} from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Image from 'next/image';
//import {themeJeju} from '@components/variables/themeJeju';
import {CompanyInfoProps} from '@components/layouts/Footer/interface/footerInfoProps';
import {useSetRecoilState} from 'recoil';
import MyIcon from "icon/myIcon";
import {OutlinedButton} from "cjbsDSTM";

interface FooterInfoProps extends CompanyInfoProps {
    info1: string;
    info2: string;
    info3: string;
    twIcon: string;
    lkIcon: string;
    fbIcon: string;
}

const FooterInfo = (props: FooterInfoProps) => {
    const {companyLogo, country, countryFlag, info1, info2, info3, twIcon, lkIcon, fbIcon,} = props;
    // const setAboutUsModalOpenIs = useSetRecoilState(aboutUsModalAtom);
    return (
        <Grid item xs={12} sx={{mt:0, pt:3, display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width:600 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Image src={companyLogo} alt='cjbioscience' width={110} />
                    </Grid>
                    <Grid item xs={8}>
                        <Stack>
                            <Typography
                                component='span'
                                variant='subtitle2'
                                sx={{fontWeight: '400 !important', color: "#adb5bd", whitSpace: 'pre'}}
                            >
                                {info3}
                            </Typography>
                            <Typography
                                component='span'
                                variant='subtitle2'
                                sx={{fontWeight: '400 !important', color: "#adb5bd", whitSpace: 'pre'}}
                            >
                                {info1}
                            </Typography>
                            <Typography
                                component='span'
                                variant='subtitle2'
                                sx={{fontWeight: '400 !important', color: "#adb5bd", whitSpace: 'pre'}}
                            >
                                {info2}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', width:'210px', pt:3}}>
                <Link href="https://www.facebook.com/chunlab" target="_blank">
                    <Image src={fbIcon} alt='fbIcon' width={20} style={{marginTop:'6px'}}/>
                </Link>
                <Link href="https://kr.linkedin.com/company/cjbioscience" target="_blank">
                    <Image src={lkIcon} alt='lkIcon' width={20} style={{marginTop:'6px'}}/>
                </Link>
                <Link href="https://twitter.com/ezbiocloud" target="_blank">
                    <Image src={twIcon} alt='fbIcon' width={20} style={{marginTop:'6px'}}/>
                </Link>
                <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                        <React.Fragment>
                            <OutlinedButton
                                sx={{ width: "100px", color:'#FFFFFF', height: '30px', borderColor: '#FFFFFF', ml:1 }}
                                buttonName='Family Site'
                                endIcon={<MyIcon icon="cheveron-down" size={18} />}
                                size="medium"
                                {...bindTrigger(popupState)}
                            />
                            <Menu {...bindMenu(popupState)}>
                                <MenuItem onClick={popupState.close}>
                                    <Link href="https://www.cjbioscience.com" target="_blank" underline='none'>
                                        www.cjbioscience.com
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                    <Link href="https://www.ezbiocloud.net" target="_blank" underline='none'>
                                        www.ezbiocloud.net
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={popupState.close}>
                                    <Link href="https://www.truebacid.com" target="_blank" underline='none'>
                                        www.truebacid.com
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </React.Fragment>
                    )}
                </PopupState>
            </Box>
        </Grid>
    );
};

export default FooterInfo;