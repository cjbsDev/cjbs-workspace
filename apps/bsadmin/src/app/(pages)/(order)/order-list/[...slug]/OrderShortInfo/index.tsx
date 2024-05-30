import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
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
import { useResultObject } from "../../../../../components/KeywordSearch/useResultObject";

const OrderShortInfo = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const orderUkey = params.slug;
  const [resultObject, result] = useResultObject();

  // const resultObject = {};
  //
  // for (const [key, value] of searchParams.entries()) {
  //   resultObject[key] = value;
  // }
  // console.log(">>>>>>>>>", resultObject);
  //
  // const result = "?" + new URLSearchParams(resultObject).toString();
  // console.log("RESULT@#@#@#", JSON.stringify(result));

  const { data } = useSWR(
    JSON.stringify(resultObject) !== "{}"
      ? `/order/${orderUkey}${result}`
      : `/order/${orderUkey}`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("ORDER Info Detail DATA", data);

  // console.log("OrderShortInfo Value ==>>", data.data);

  const {
    agncNm,
    ordrAplcNm,
    ordrAplcTel,
    rhpiNm,
    rhpiEmail,
    bsnsMngrNm,
    anlsMngrNm,
    prepMngrNm,
    libMngrNm,
    seqMngrNm,
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
    // console.log("PREV$%$%$%$%$%$$%", result);
    router.push("/order-list/" + preOrderUkey + result);
  };

  const postOrderInfo = () => {
    // console.log("POST$%$%$%$%$%$$%", result);
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

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            거래처(PI) 및 신청인 정보
          </Typography>
          <Box>
            <Stack spacing={0.5}>
              <Box>
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">거래처(PI)</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {agncNm === null ? "-" : agncNm}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                {/*<Box component="dl" sx={{ display: "flex" }}>*/}
                {/*  <Box component="dt" sx={{ backgroundColor: "red" }}>*/}
                {/*    <Typography variant="body2">연구책임자</Typography>*/}
                {/*  </Box>*/}
                {/*  <Box component="dd">*/}
                {/*    <Typography variant="subtitle2">*/}
                {/*      {rhpiNm === null ? "-" : rhpiNm}({rhpiEmail})*/}
                {/*    </Typography>*/}
                {/*  </Box>*/}
                {/*</Box>*/}
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">연구책임자</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {rhpiNm === null ? "-" : rhpiNm}({rhpiEmail})
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">신청인</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {ordrAplcNm === null ? "-" : ordrAplcNm}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                {/*<Stack*/}
                {/*  direction="row"*/}
                {/*  spacing={1}*/}
                {/*  justifyContent="flex-start"*/}
                {/*  alignItems="flex-start"*/}
                {/*>*/}
                {/*  <Stack>*/}
                {/*    <Typography variant="body2">연락처</Typography>*/}
                {/*  </Stack>*/}
                {/*  <Stack flexWrap="wrap">*/}
                {/*    <Typography variant="subtitle2">*/}
                {/*      {ordrAplcTel === null ? "-" : ordrAplcTel}*/}
                {/*    </Typography>*/}
                {/*  </Stack>*/}
                {/*</Stack>*/}
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">연락처</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {ordrAplcTel === null ? "-" : ordrAplcTel}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
            담당자 정보
          </Typography>
          <Box>
            <Stack spacing={0.5}>
              <Box>
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">실험 담당자</Typography>
                  </Grid>
                  <Grid item>
                    {/*<Typography variant="subtitle2">*/}
                    {/*  {agncNm === null ? "-" : agncNm}*/}
                    {/*</Typography>*/}
                    <Stack direction="row" spacing={0.5}>
                      <Box>{prepMngrNm === null ? "-" : prepMngrNm}(Prep)</Box>
                      <Box>{libMngrNm === null ? "-" : libMngrNm}(Lib)</Box>
                      <Box>{seqMngrNm === null ? "-" : seqMngrNm}(Seq)</Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">분석 담당자</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {anlsMngrNm === null ? "-" : anlsMngrNm}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container gap={1}>
                  <Grid item>
                    <Typography variant="body2">영업 담당자</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      {bsnsMngrNm === null ? "-" : bsnsMngrNm}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Box>
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
    </Box>
  );
};

export default OrderShortInfo;
