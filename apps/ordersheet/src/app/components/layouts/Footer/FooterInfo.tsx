import React from 'react';
import {Box, Button, Chip, Divider, Grid, Stack, Typography} from '@mui/material';
import Image from 'next/image';
//import {themeJeju} from '@components/variables/themeJeju';
import {CompanyInfoProps} from '@components/layouts/Footer/interface/footerInfoProps';
import {useSetRecoilState} from 'recoil';

interface FooterInfoProps extends CompanyInfoProps {
    info1: string;
    info2: string;
    info3: string;
}

const FooterInfo = (props: FooterInfoProps) => {
    const {companyLogo, country, countryFlag, info1, info2, info3} = props;
    // const setAboutUsModalOpenIs = useSetRecoilState(aboutUsModalAtom);
    return (
        <Grid item xs={6} sx={{}}>
            <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Image src={companyLogo} alt='cjbioscience' width={110} />
            </Box>

            {/*<Divider sx={{mb: 2, backgroundColor: "#adb5bd"}} />*/}

            <Box sx={{mb: 2}}>
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
            </Box>

        </Grid>
    );
};

export default FooterInfo;