import { Box, Stack, Typography } from "@mui/material";
import MyIcon from "icon/myIcon";
import { cjbsTheme } from "cjbsDSTM";

const NoDataView = () => {
  return (
    <Box
      sx={{
        width: "100%",
        pt: 7.5,
        pb: 7.5,
        border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
      }}
    >
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <MyIcon icon="nodata" size={20} />
        <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>
      </Stack>
    </Box>
  );
};

export default NoDataView;
