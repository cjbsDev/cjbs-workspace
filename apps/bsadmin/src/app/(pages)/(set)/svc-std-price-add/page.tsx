"use client";
import { ContainedButton, Form, OutlinedButton, Title1 } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";
import * as React from "react";
import BasicInfo from "./BasicInfo";
import LoadingSvg from "public/svg/loading_wh.svg";
import { useRouter } from "next-nprogress-bar";

export default function Page() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const defaultValues = {
    prdcSizeMc: "BS_0100010001",
  };
  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log("DATA ==>>", data);

    /*
      {
        "anlsMtMc": "분석방법(플랫폼)코드",
        "anlsTypeMc": "분석종류코드",
        "prdcSizeMc": "생산량코드",
        "srvcTypeMc": "서비스분류코드",
        "stndPriceDetailList": [
          {
            "bi": 0,
            "isUse": "사용여부",
            "lib": 0,
            "prep": 0,
            "qc": 0,
            "sampleSizeEnd": 0,
            "sampleSizeStart": 0,
            "seq": 0,
            "stndDscntPctg": 0
          }
        ]
      }
    */
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
