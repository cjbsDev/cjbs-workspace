"use client";
import React from 'react';
import {Box, Container, Stack, Typography, Tabs, Tab, TabProps, styled, Button} from "@mui/material";
import {TabContext, TabList, TabPanel} from '@mui/lab';
import MyIcon from "icon/myIcon";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import {cjbsTheme} from "cjbsDSTM";
import MtpFullService from "./mtp/MtpFullService";
import MtpAnalysis from "./mtp/MtpAnalysis";
import MtpSequencing from "./mtp/MtpSequencing";

const AntTabs = styled(Tabs)({
    marginTop: "10px",
    // border: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#006ECD',
    },
    '& .MuiTabs-flexContainer': {
        display: 'flex',
        justifyContent: 'space-between',
    }
});

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        width: "394px",
        maxWidth: "394px",
        border: '1px solid #e8e8e8',
        margin:0,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        color: 'rgba(0, 0, 0, 0.85)',
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#006ECD',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface StyledTabProps extends TabProps{
    label: React.ReactNode;
}

const Page = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <Container disableGutters={true}>
            <Box
                sx={{
                    // mb: 20,
                    // mt: 11,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'space-between',
                    padding: '50px 0 50px 0',
                    flexDirection: 'column',
                    height:"100%"
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                >
                    <Box sx={{
                        display: 'flex',
                        alignContent: 'start',
                        alignItems: 'center',
                    }}>
                        <Typography variant="h4">
                            MTP&nbsp;
                        </Typography>
                        <Typography variant="subtitle2" sx={{pt:"3px"}}>
                            Microbiome Taxonomic Profiling
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignContent: 'start',
                        alignItems: 'center',
                        width: 600,
                        mr: '-30px'
                    }}>
                        <HorizontalLinearStepper />
                    </Box>
                </Stack>

                <Box sx={{
                    display: 'flex',
                    alignContent: 'start',
                    alignItems: 'center',
                    width: '100%',
                    //backgroundColor: cjbsTheme.palette.grey["700"],
                    backgroundColor: "#5a86c7",
                    p: '12px 20px',
                    borderRadius: '4px',
                }}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={0}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignContent: 'start',
                            alignItems: 'center',
                            color: "#FFF"
                        }}>
                            <Typography variant="subtitle1">
                                서비스 타입
                            </Typography>
                            <Typography variant="body2" sx={{ml:2}}>
                                서비스 타입을 선택해주세요
                            </Typography>
                        </Box>
                    </Stack>
                </Box>


                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                        <AntTab label={
                            <Box sx={{
                                textAlign: 'start',
                                width: '100%',
                            }}>
                                <Typography variant="subtitle1" sx={{}}>
                                    Full Service
                                </Typography>
                                <Typography variant="body2" sx={{}}>
                                    시퀀싱 및 BI 분석을 함께 의뢰합니다
                                </Typography>
                            </Box>
                        } />
                        <AntTab label={
                            <Box sx={{
                                textAlign: 'start',
                                width: '100%'
                            }}>
                                <Typography variant="subtitle1" sx={{}}>
                                    Analysis Only
                                </Typography>
                                <Typography variant="body2" sx={{}}>
                                    BI 분석만 의뢰합니다
                                </Typography>
                            </Box>
                        } />
                        <AntTab label={
                            <Box sx={{
                                textAlign: 'start',
                                width: '100%'
                            }}>
                                <Typography variant="subtitle1" sx={{}}>
                                    Sequencing Only
                                </Typography>
                                <Typography variant="body2" sx={{}}>
                                    시퀀싱만 의뢰합니다
                                </Typography>
                            </Box>
                        } />
                    </AntTabs>
                </Box>
                {value === 0 ? (
                    <MtpFullService />
                ) : ('')}
                {value === 1 ? (
                    <MtpAnalysis />
                ) : ('')}
                {value === 2 ? (
                    <MtpSequencing />
                ) : ('')}
            </Box>
        </Container>
    );
};

export default Page;