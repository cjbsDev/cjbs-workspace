import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";

const Contents = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Stack direction="row" justifyContent="center">
        <MyIcon icon="nodata" size={20} />
        <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>
      </Stack>
    </Box>
  );
};

export default Contents;
