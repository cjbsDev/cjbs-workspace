import React from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { useParams, useSearchParams } from "next/navigation";
import { grey } from "cjbsDSTM/themes/color";
import { fetcher } from "api";
import SampleBEA from "./SampleBEA";
import AnalysisStatus from "./AnalysisStatus";
import TrackingProgress from "./TrackingProgress";
import Link from "next/link";
import { OutlinedButton } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import { useRouter } from "next-nprogress-bar";

const OrderShortInfo = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const orderUkey = params.slug;
  // const { data } = useSWR(`/order/${orderUkey}`, fetcher, {
  //   suspense: true,
  // });

  const resultObject = {};

  for (const [key, value] of searchParams.entries()) {
    resultObject[key] = value;
  }
  console.log(">>>>>>>>>", resultObject);

  const result = "?" + new URLSearchParams(resultObject).toString();
  console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/order/${orderUkey}${result}`
      : `/order/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("ORDER Detail DATA", data);

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
    getOrderPrevPost,
  } = data;

  const { preOrderUkey, postOrderUkey } = getOrderPrevPost;

  const prevOrderInfo = () => {
    console.log("PREV$%$%$%$%$%$$%", result);
    router.push("/order-list/" + preOrderUkey + result);
  };

  const postOrderInfo = () => {
    console.log("POST$%$%$%$%$%$$%", result);
    router.push("/order-list/" + postOrderUkey + result);
  };

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

      <Box sx={{ position: "absolute", top: -42, right: 0 }}>
        <Stack direction="row" spacing={1}>
          <OutlinedButton
            disabled={preOrderUkey === ""}
            onClick={prevOrderInfo}
            size="small"
            color="secondary"
            buttonName="이전 오더"
            startIcon={<MyIcon icon="cheveron-left" size={20} />}
          />
          <OutlinedButton
            disabled={postOrderUkey === ""}
            onClick={postOrderInfo}
            size="small"
            color="secondary"
            buttonName="다음 오더"
            endIcon={<MyIcon icon="cheveron-right" size={20} />}
          />
        </Stack>
      </Box>

      {/*<Container maxWidth={false} sx={{ }}>*/}
      {/*  <Grid container justifyContent="space-between">*/}
      {/*    <Grid item>*/}
      {/*      <Link href={from !== null ? from : "/order-list"}>*/}
      {/*        <OutlinedButton size="small" buttonName="목록" />*/}
      {/*      </Link>*/}
      {/*    </Grid>*/}
      {/*    <Grid item>*/}
      {/*      <Stack direction="row" spacing={1}>*/}
      {/*        <OutlinedButton*/}
      {/*          // disabled={true}*/}
      {/*          size="small"*/}
      {/*          color="secondary"*/}
      {/*          buttonName="이전"*/}
      {/*          startIcon={<MyIcon icon="cheveron-left" size={20} />}*/}
      {/*        />*/}
      {/*        <OutlinedButton*/}
      {/*          // disabled={true}*/}
      {/*          size="small"*/}
      {/*          color="secondary"*/}
      {/*          buttonName="다음"*/}
      {/*          endIcon={<MyIcon icon="cheveron-right" size={20} />}*/}
      {/*        />*/}
      {/*      </Stack>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</Container>*/}
    </Box>
  );
};

export default OrderShortInfo;
