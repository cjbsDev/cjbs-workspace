"use client";
import React from "react";
import { Container, Stack } from "@mui/material";

const Index = () => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack spacing={1} alignItems="center">
        Password find Page!
      </Stack>
    </Container>
  );
};

export default Index;
