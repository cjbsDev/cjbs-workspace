import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

const CommentList = () => {
  const params = useParams();
  const orderUkey = params.slug;
  const APIPATH = `/order/${orderUkey}/cmnt/list`;
  const { data } = useSWR(APIPATH, fetcher, {
    suspense: true,
  });

  console.log("COMMENT LIST", data);

  const comntTotal = data.length;

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="subtitle2" sx={{ mt: 0.6 }}>
          코멘트
        </Typography>
        <Box>
          총
          <Box
            component="span"
            sx={{
              color: cjbsTheme.palette.primary.main,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {comntTotal}
          </Box>
          건
        </Box>
      </Stack>

      <Box>
        {data.map((item) => {
          return (
            <Box key={item.totalCmntUkey} sx={{ mb: 1.5 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1">
                  {item.writerNm}({item.writerDepartVal})
                </Typography>
                <Stack
                  direction="row"
                  divider={<Typography variant="body2">|</Typography>}
                  spacing={0.5}
                  sx={{ color: cjbsTheme.palette.grey["600"] }}
                >
                  <Typography variant="body2">
                    작성일 {item.createdDttm}
                  </Typography>
                  <Typography variant="body2">
                    최종 수정일{" "}
                    {item.modifiedDttm === null ? "-" : item.modifiedDttm}
                  </Typography>
                </Stack>
              </Stack>

              <Box>
                <Typography variant="subtitle2">
                  To. {item.rcpnNmList.join(", ")}
                  {/*{item.rcpnNmList.map((item) => item)}*/}
                </Typography>

                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {item.memo}
                </Typography>
              </Box>
            </Box>
          );
        })}
        {/*{JSON.stringify(data)}*/}
      </Box>
    </>
  );
};

export default CommentList;
