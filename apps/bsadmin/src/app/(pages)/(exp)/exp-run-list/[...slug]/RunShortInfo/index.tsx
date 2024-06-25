import React from "react";
import { useParams } from "next/navigation";
import { fetcher } from "api";
import useSWR from "swr";
import { grey } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";
import TrackingProgress from "./TrackingProgress";
import SampleBEA from "../../../../(order)/order-list/[...slug]/OrderShortInfo/SampleBEA";
import RunMemo from "./RunMemo";

const RunShortInfo = () => {
  const params = useParams();
  const ukey = params.slug;
  const { data } = useSWR(`/run/${ukey}`, fetcher, {
    suspense: true,
  });

  console.log(data);

  const {
    runUkey,
    runId,
    runSamplesCnt,
    runTypeMc,
    runTypeVal,
    runMngrNm,
    seqAgncMc,
    seqAgncVal,
    runDttm,
    machineMc,
    machineVal,
    kitMc,
    kitVal,
    biRqstCnt,
    isBiRqst,
    biRqstDttm,
    memo,
    bcount,
    ecount,
    acount,
  } = data;

  return (
    <Box
      sx={{
        border: `1px solid ${grey["400"]}`,
        borderRadius: 4,
        padding: "26px 30px",
        width: "-webkit-fill-available",
      }}
    >
      <Stack direction="row" spacing={5}>
        <TrackingProgress
          runId={runId}
          runTypeVal={runTypeVal}
          runDttm={runDttm}
          machineVal={machineVal}
          kitVal={kitVal}
          seqAgncVal={seqAgncVal}
          runMngrNm={runMngrNm}
        />

        <SampleBEA bcount={bcount} ecount={ecount} acount={acount} />

        <RunMemo memo={memo} />
      </Stack>
    </Box>
  );
};

export default RunShortInfo;
