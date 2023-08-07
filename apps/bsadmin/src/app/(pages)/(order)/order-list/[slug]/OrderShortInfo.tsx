import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";
import useSWR from "swr";
import fetcher from "../../../../func/fetcher";
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

  console.log("OrderShortInfo Value ==>>", data.data);

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
    <Stack direction="row" spacing={2}>
      <Box
        sx={{
          backgroundColor:
            orderStatusVal === "진행"
              ? cjbsTheme.palette.primary.light
              : orderStatusVal === "완료"
              ? cjbsTheme.palette.success.light
              : orderStatusVal === "취소"
              ? cjbsTheme.palette.error.light
              : cjbsTheme.palette.secondary.light,

          borderRadius: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            width: 176,
            height: 176,
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No.{orderId}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          border: `1px solid ${grey["400"]}`,
          borderRadius: 4,
          padding: "26px 30px",
          width: "-webkit-fill-available",
        }}
      >
        <Box>
          <Stack direction="row" spacing={0.5} sx={{ mb: 1 }}>
            {isFastTrack === "Y" && (
              <Chip label="Fast Track" variant="outlined" size="small" />
            )}

            <Chip label={intnExtrClVal} variant="outlined" size="small" />
          </Stack>
          <Box
            sx={{
              backgroundColor: grey["100"],
              borderRadius: 2,
              padding: "20px 30px",
            }}
          >
            <Stack
              direction="row"
              spacing={"30px"}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Box
                sx={{
                  borderRadius: 2,
                }}
              >
                <Typography variant="subtitle2">분석 종류</Typography>
                <Typography variant="h5">{anlsTypeVal}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">서비스 타입</Typography>
                <Typography variant="h5">
                  {srvcTypeVal === null ? "-" : srvcTypeVal}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">분석 방법</Typography>
                <Typography variant="h5">
                  {pltfVal === null ? "-" : pltfVal}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1">
            샘플 {bcount + ecount + acount}개
          </Typography>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${cjbsTheme.palette.primary.light}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: cjbsTheme.palette.primary.main }}
              >
                B
              </Typography>

              <Typography variant="h3">
                {bcount}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${cjbsTheme.palette.success.light}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: cjbsTheme.palette.success.main }}
              >
                E
              </Typography>
              <Typography variant="h3">
                {ecount}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${cjbsTheme.palette.tertiary.light}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography
                variant="h4"
                sx={{ color: cjbsTheme.palette.tertiary.main }}
              >
                A
              </Typography>
              <Typography variant="h3">
                {acount}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle1">분석현황</Typography>
          <Stack direction="row" spacing={1}>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${grey["400"]}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                PCR/Lib 완료
              </Typography>

              <Typography variant="h3">
                {pcrLibComp}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${grey["400"]}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Seq 완료
              </Typography>
              <Typography variant="h3">
                {seqComp}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
            <Box
              sx={{
                padding: "10px 20px",
                border: `1px solid ${grey["400"]}`,
                borderRadius: 4,
                width: "130px",
              }}
            >
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                분석 완료
              </Typography>
              <Typography variant="h3">
                {anlsComp}
                <small style={{ fontSize: 14, paddingLeft: 4 }}>개</small>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default OrderShortInfo;
