import React from "react";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import useSWR from "swr";
import { useParams } from "next/navigation";
import {
  blue,
  yellow,
  red,
  orange,
  cyan,
  grey,
  green,
} from "cjbsDSTM/themes/color";
import fetcher from "../../../../../func/fetcher";
import SampleBEA from "./SampleBEA";
import AnalysisStatus from "./AnalysisStatus";
import TrackingProgress from "./TrackingProgress";

const OrderShortInfo = () => {
  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    }
  );

  // console.log("OrderShortInfo Value ==>>", data.data);

  const {
    orderId,
    sampleCount,
    anlsTypeMc,
    anlsTypeVal,
    srvcTypeMc,
    srvcTypeVal,
    pltfMc,
    pltfVal,
    isFastTrack,
    intnExtrClCc,
    intnExtrClVal,
    typeCc,
    typeVal,
    orderStatusCc,
    orderStatusVal,
    pcrLibComp,
    seqComp,
    anlsComp,
    bcount,
    ecount,
    acount,
  } = data.data;

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
          orderId={orderId}
          isFastTrack={isFastTrack}
          intnExtrClVal={intnExtrClVal}
          anlsTypeVal={anlsTypeVal}
          srvcTypeVal={srvcTypeVal}
          pltfVal={pltfVal}
          orderStatusVal={orderStatusVal}
        />

        <SampleBEA bcount={bcount} ecount={ecount} acount={acount} />

        <AnalysisStatus
          pcrLibComp={pcrLibComp}
          seqComp={seqComp}
          anlsComp={anlsComp}
        />
      </Stack>
    </Box>
  );
};

export default OrderShortInfo;