"use client";
import * as React from "react";
import { Title1 } from "cjbsDSTM";
import { Box, Stack, Tab } from "@mui/material";
import dynamic from "next/dynamic";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/navigation";

const LazyCustPayList = dynamic(() => import("./CustPayList"), {
  ssr: false,
});
const LazyPrePymtList = dynamic(() => import("./PrePymtList"), {
  ssr: false,
});
const LazyLicenseList = dynamic(() => import("./LicenseList"), {
  ssr: false,
});

const CustPayTab = () => {
  const [value, setValue] = React.useState("1");
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    // 페이지 경로 유지하며 URL 수정: 특정 경로에 머무르면서 URL을 수정
    router.replace("/ledger-cust-pay-list", undefined, { shallow: true });
  };

  return (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 0 }}>
        <Title1 titleName="거래처별 결제 현황" />
      </Stack>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="결제 현황" value="1" />
              <Tab label="선결제" value="2" />
              <Tab label="라이선스" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0, pt: 2 }}>
            <LazyCustPayList />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0, pt: 2 }}>
            <LazyPrePymtList />
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0, pt: 2 }}>
            <LazyLicenseList />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default CustPayTab;
