"use client";

import { Box } from "@mui/material";

export default function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        backgroundImage: `url('./img/background/backgroundBlue.png'), url('./img/background/backgroundRed.png'), url('./img/background/backgroundYellow.png')`,
        backgroundPosition: "top left, top right, bottom left 160px",
        backgroundSize: "160px, 820px, 620px",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      {children}
    </Box>
  );
}
