import { Box, Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme, OutlinedButton } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { UrlObject } from "node:url";

interface NoDataViewProps {
  resetPath?: string;
  dataType?: string;
}

const NoDataView = ({ resetPath = "", dataType = "" }: NoDataViewProps) => {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  return (
    <Box
      sx={{
        width: "100%",
        pt: 7.5,
        pb: 7.5,
        mb: 5,
        border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      }}
    >
      <Stack spacing={0.8} justifyContent="center">
        <Stack justifyContent="center" alignItems="center" spacing={0.5}>
          <MyIcon icon="nodata" size={24} />
          {dataType !== "" ? (
            <Typography variant="body2">수정이력이 없습니다.</Typography>
          ) : resetPath !== "" ? (
            <Stack alignItems="center">
              <Typography variant="body1">
                {/*<b>&ldquo;{keyword}&rdquo;</b>에대한 */}
                데이터가 존재하지 않습니다.
              </Typography>
              <Typography variant="body1">
                <b>다른 검색어</b>로 검색해 주세요.
              </Typography>
            </Stack>
          ) : (
            <Stack alignItems="center">
              <Typography variant="body1">
                데이터가 존재하지 않습니다.
              </Typography>
            </Stack>
          )}
        </Stack>
        <Stack direction="row" justifyContent="center">
          {resetPath !== "" && (
            <Link href={resetPath}>
              <OutlinedButton buttonName="초기화" size="small" />
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default NoDataView;
