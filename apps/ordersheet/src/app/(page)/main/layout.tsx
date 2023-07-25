"use client";
import { Inter } from "next/font/google";
import Provider from "client-provider";
import JeJuProvider from "@app/jejuProvider";
//import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import AppBar from '@components/layouts/AppBar';
import Footer from '@components/layouts/Footer';


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

// export const metadata: Metadata = {
//   title: "...",
//   description: "...",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const router = useRouter();
    return (
        <>
            <AppBar />

            <Box
                component='main'
                sx={{
                  minHeight: 'calc(100% - 185px)',
                  boxSizing: 'border-box',
                  //// mt: '-65px',
                  // pt: '50px',
                  // mb: '-40px',
                  // pb: '50px',
                  backgroundColor: 'white',
                  // backgroundImage: `url(/img/main/main_bg.png)`,
                  backgroundSize: '100% 308px',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top 58px left',
                }}
            >

                <Box
                    sx={{
                        mb: 0,
                        mt: '65px',
                        mr: 0,
                        pl: 40,
                        width: '100%',
                        height: '181px',
                        backgroundImage: `url(/img/banner/mainTopBanner.png)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 181px',
                        display: 'flex',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Typography variant='title1' color='white' sx={{fontWeight: "600", marginTop:7 }}>NGS 주문</Typography>
                    <Typography
                        variant='body1'
                        color='white'
                        sx={{}}
                    >
                        독자적인 in-house pipeline을 이용한 최고의 분석 결과를 One-Stop 서비스로 확인하세요.
                    </Typography>
                </Box>

                {children}

            </Box>

            <Footer />
        </>
    );
}
