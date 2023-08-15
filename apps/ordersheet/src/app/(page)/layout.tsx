"use client";
import { useRouter } from "next/navigation";
import {Box, Typography, Stack, Container, Link} from "@mui/material";
import AppBar from '@components/layouts/AppBar';
import Footer from '@components/layouts/Footer';
import {cjbsTheme, OutlinedButton} from "cjbsDSTM";
import Image from 'next/image'
import mailImg from '@public/img/icons/mail.png';
import React from "react";
import MyIcon from "icon/myIcon";


export default function SubLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    return (
        <>
            <AppBar />

            <Box
                component="main"
                sx={{
                    minHeight: "calc(100% - 185px)",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    backgroundSize: "100% 308px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "top 58px left",
                    position: 'relative',
                    mt: "65px",
                }}
            >
                {children}
            </Box>

            <Footer />
        </>
    );
}
