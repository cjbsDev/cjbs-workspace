"use client";
import { ContainedButton, Form, OutlinedButton, Title1 } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";
import * as React from "react";
import BasicInfo from "./BasicInfo";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";
import axios from "axios";

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

    console.log("==saveObj", saveObj);
    console.log("saveObj stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/stndPrice`; // Replace with your API URL

    await axios
      .post(apiUrl, saveObj)
      .then((response) => {
        console.log("request successful:", response.data);
        if (response.data.success) {
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
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>
    </Form>
  );
}
