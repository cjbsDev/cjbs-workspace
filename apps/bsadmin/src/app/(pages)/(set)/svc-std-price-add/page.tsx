"use client";
import { ContainedButton, Form, OutlinedButton, Title1 } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";
import * as React from "react";
import BasicInfo from "./BasicInfo";
import LoadingWhiteSvg from "../../../components/LoadingWhiteSvg";
import { useRouter } from "next-nprogress-bar";
import { fetcher, POST } from "api";

export default function Page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const defaultValues = {
    prdcSizeMc: "BS_0100010001",
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("DATA ==>>", data);

    let saveObj = {
      anlsMtMc: data.anlsMtMc,
      anlsTypeMc: data.anlsTypeMc,
      prdcSizeMc: data.prdcSizeMc,
      srvcTypeMc: data.srvcTypeMc,
    };

    console.log("!!!==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `/mngr/stndPrice`; // Replace with your API URL

    await POST(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response);
        // console.log("request successful:", response.data);
        if (response.success) {
          router.push("/svc-std-price-list");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("request failed:", error);
      });
  };

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="서비스 기준가 등록" />
        <BasicInfo />
      </Box>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <OutlinedButton
          buttonName="목록"
          onClick={() => router.push("/svc-std-price-list")}
        />

        <ContainedButton
          type="submit"
          buttonName="등록"
          endIcon={isLoading ? <LoadingWhiteSvg /> : null}
        />
      </Stack>
    </Form>
  );
}
