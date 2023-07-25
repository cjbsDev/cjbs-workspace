import React from 'react';
import {Box, Container, Grid, Alert, Snackbar} from '@mui/material';
//import {themeJeju} from '@components/variables/themeJeju';
import {styled} from '@mui/material/styles';
//import FooterInfo from '@components/layouts/Footer/FooterInfo';
import FooterInfo from '@components/layouts/Footer/FooterInfo';
import {footerInfoData} from '@components/layouts/Footer/Data/footerData';
import uuid from 'react-uuid';
import {useRecoilState} from 'recoil';
// import {snackbarAtom} from '@src/recoil/atoms/modalAtom';
// import SuccessSnackbar from '@components/organisms/CouponModal/SuccessSnackbar';
import { cjbsTheme } from "cjbsDSTM";

const Footer = () => {
    // const [snackbarOpenIs, setSnackbarOpenIs] = useRecoilState(snackbarAtom);

    return (
        <>
            <Box
                component='footer'
                sx={{
                    width: '100%',
                    backgroundColor: cjbsTheme.palette.grey['900'],
                    // backgroundColor: "#222529",
                    // paddingTop: '30px',
                    // paddingBottom: '30px',
                    // mt: '40px',
                    height: '120px',
                }}
            >
                <Container maxWidth='lg' disableGutters={true}>
                    <Grid container spacing={0} sx={{marginTop: 0}}>
                        {footerInfoData.map((item) => (
                            <FooterInfo
                                key={uuid()}
                                companyLogo={item.logoWh}
                                country={item.country}
                                countryFlag={item.countryFlag}
                                info1={item.info1}
                                info2={item.info2}
                                info3={item.info3}
                            />
                        ))}
                    </Grid>
                </Container>
            </Box>
            {/*<SuccessSnackbar />*/}
        </>
    );
};
export default Footer;