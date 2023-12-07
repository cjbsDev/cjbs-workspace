import React, { useState } from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { styled, Typography, TypographyProps } from "@mui/material";

import dynamic from "next/dynamic";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import SampleAddSection from "./SampleAddSection";

const LazySampleTabDataTable = dynamic(() => import("./SampleTabDataTable"), {
  ssr: false,
});

const SampleTab = () => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(20);
  const params = useParams();
  const uKey = params.slug;
  const { data } = useSWR(
    `/run/sample/${uKey}?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    }
  );

  if (data.pageInfo.totalElements === 0) {
    return <SampleAddSection />;
  }
  return (
    <>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazySampleTabDataTable
        // isClear={isClear}
        // handleAlertOpen={handleAlertOpen}
        // handleAlertClose={handleAlertClose}
        // handleExPrgsChngModalOpen={handleExPrgsChngModalOpen}
        // handleSampleAddModalOpen={handleSampleAddModalOpen}
        />
      </ErrorContainer>
    </>
  );
};

export default SampleTab;

const Caption = styled(Typography)<TypographyProps>(({ className, theme }) => ({
  lineHeight: 1,
  fontSize: 12,
  textAlign: "center",
}));
