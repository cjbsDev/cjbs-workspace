"use client";
import React from 'react';
import {Box, Container, Stack, Typography, Tabs, Tab, TabProps, styled, Button, Grid} from "@mui/material";
import MyIcon from "icon/MyIcon";
import HorizontalLinearStepper from "../HorizontalLinearStepper";
import {cjbsTheme, ContainedButton, OutlinedButton} from "cjbsDSTM";
import LoadingSvg from "@public/svg/loading_wh.svg";
import {useRouter} from "next-nprogress-bar";



const AntTabs = styled(Tabs)({
    marginTop: "10px",
    // border: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        // backgroundColor: '#006ECD',
        display: 'none',
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
            opacity: 1,
            backgroundColor: cjbsTheme.palette.grey[50],
        },
        '&.Mui-selected': {
            color: '#000',
            fontWeight: theme.typography.fontWeightMedium,
            backgroundColor: '#E6F0FA',
            border: '1px solid #006ECD',
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

interface StyledTabProps extends TabProps{
    label: React.ReactNode;
}

const Page = () => {
    const router = useRouter();
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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
                    sx={{borderBottom: '1px solid #000'}}
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

                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            borderRadius: '50%',
                            borderColor: 'text.primary',
                            mt: "36px",
                            width: '116px',
                            height: '116px',
                            backgroundColor: '#F1F9F1',
                        }}>
                            <MyIcon icon="check-circle-fill" size={35} color={cjbsTheme.palette.success.main}/>
                            <Typography variant="subtitle2" sx={{pt:"3px"}}>
                                주문 완료!
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            mt: "20px"
                        }}>
                            <Typography variant="body2" sx={{pt:"3px"}}>
                                아래 내용 참고하여 NGS 데이터를 전달 부탁드립니다.<br/>
                                보내주신 데이터와 주문 내용이 최종 확인되면, 접수완료 메일이 발송됩니다.
                            </Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignContent: 'start',
                            alignItems: 'center',
                            mt: "26px",
                            p: "40px 30px",
                            width: 772,
                            backgroundColor: cjbsTheme.palette.grey[50],
                            borderRadius: "4px",
                            border: "1px solid",
                            borderColor: cjbsTheme.palette.grey[400]
                        }}>
                            <Grid container spacing={2}>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2">
                                        샘플 접수
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Typography variant="subtitle2">
                                            NGS 실험실
                                        </Typography>
                                        <Typography variant="body2">
                                            (16495) 경기 수원시 영통구 광교로42번길 55 CJ 블로썸파크 블루동 12층
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2">
                                        연락처
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <MyIcon icon="telephone" size={20}/>
                                        <Typography variant="body2">
                                            Tel 02-6078-3456
                                        </Typography>
                                        <MyIcon icon="mail-fill" size={20}/>
                                        <Typography variant="subtitle2">
                                            E-mail bs.ngs@cj.net
                                        </Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="subtitle2">
                                        유의사항
                                    </Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                                        1. 보내주시는 샘플에는 주문서의 샘플명과 매칭되도록 각 샘플에 표기 바랍니다.
                                    </Typography>
                                    <Typography variant="body2" color={cjbsTheme.palette.error.main}>
                                        2. 분석 결과는 EzBioCloud로 업로드됩니다.
                                    </Typography>
                                    <Typography variant="body2">
                                        3. DNA는 요청 시에만 반송되며, 샘플(분변, 토양 및 기타 환경샘플)은 1개월 후 자동폐기됩니다.
                                    </Typography>
                                    <Typography variant="body2">
                                        4. Sequencing raw data 보관기간은 1년이오니, 만료 전에 데이터센터에서 다운로드 바랍니다.
                                    </Typography>
                                    <Typography variant="body2">
                                        5. 분석 결과는 연구용으로만 사용이 가능합니다.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="center"
                            sx={{ mt: "30px" }}
                        >
                            <OutlinedButton
                                buttonName="내 주문내역 조회"
                                onClick={() => router.push("/order-list")}
                            />
                            <ContainedButton
                                buttonName="메인으로 이동"
                                onClick={() => router.push("/main")}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Container>
    );
};

export default Page;