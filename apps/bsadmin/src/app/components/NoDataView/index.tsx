import { Box, Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { cjbsTheme, OutlinedButton } from "cjbsDSTM";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import React from "react";

interface NoDataViewProps {
  resetPath?: string;
  dataType? : string;
}

const NoDataView = (props: NoDataViewProps) => {
  const router = useRouter();
  const { resetPath = "", dataType = "" } = props;

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
        <Stack direction="row" justifyContent="center">
          <MyIcon icon="nodata" size={20} />
          {dataType !== "" ? (
            <Typography variant="body2">수정이력이 없습니다.</Typography>
          ) : (
            <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>
          )}

        </Stack>
        <Stack direction="row" justifyContent="center">
          {resetPath !== "" && (
            <Link href={resetPath}>
              <OutlinedButton buttonName="초기화" size="small" />
              {/*<Typography variant="body2">초기화</Typography>*/}
            </Link>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default NoDataView;
