"use client";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import {Box, Typography, Stack, Container, Link} from "@mui/material";
import AppBar from '@components/layouts/AppBar';
import Footer from '@components/layouts/Footer';
import {cjbsTheme, OutlinedButton} from "cjbsDSTM";
import Image from 'next/image'
import mailImg from '@public/img/icons/mail.png';
import React from "react";
import MyIcon from "icon/MyIcon";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    return (
        <>
            <Box
                component="main"
                sx={{
                    minHeight: "calc(100% - 300px)",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    backgroundSize: "100% 308px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top 58px left",
                    position: 'relative'
                }}
            >

                <Box
                    sx={{
                        // mb: 0,
                        mt: "65px",
                        // mr: 0,
                        // pl: 45,
                        width: "100%",
                        height: "181px",
                        backgroundImage: `url(/img/banner/mainTopBanner.png)`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 181px",
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <Container disableGutters={true}>
                        <Typography
                            variant="h2"
                            color="white"
                            sx={{ fontWeight: "600", marginTop: "59px", marginBottom: "15px" }}
                        >
                            NGS 주문
                        </Typography>
                        <Typography variant="body1" color="white" sx={{}}>
                            독자적인 in-house pipeline을 이용한 최고의 분석 결과를 One-Stop 서비스로 확인하세요.
                        </Typography>
                    </Container>
                </Box>

                {children}

            </Box>

            <Box
                sx={{
                    mb: 0,
                    mt: 0,
                    mr: 0,
                    // pl: 45,
                    width: "100%",
                    height: "116px",
                    backgroundColor: cjbsTheme.palette.grey["50"],
                    flexDirection: "column",
                }}
            >
                <Container disableGutters={true} sx={{display: "flex", justifyContent: 'space-between', alignItems: 'space-between'}}>
                    <Box sx={{ marginTop: 4 }}>
                        <Stack direction="row" spacing={3}>
                            <Box sx={{mt:1.5}}>
                                <Image src={mailImg} alt="mailImg" width={60} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: "600" }} >
                                    상담이 필요하신가요?
                                </Typography>
                                <Typography variant="body2" sx={{}} >
                                    Email 로 문의를 보내주시면 빠른 시일 내로 회신드리겠습니다. CG
                                    및 GRIIS 서비스는 별도 문의 부탁드립니다.
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Link href="mailto:bs.ngs@cj.net" target="_top">
                            <OutlinedButton
                                sx={{ width: "300px", borderRadius:'10px', marginTop: 5, backgroundColor: '#FFF'}}
                                buttonName='문의하기'
                                startIcon={<MyIcon icon="mail" size={18} />}
                                size="medium"
                            />
                        </Link>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
