import React from "react";
import { Chip, Stack } from "@mui/material";
import MyIcon from "icon/myIcon";

interface IconDescBarProps {
  reOrder?: boolean;
  fastTrack?: boolean;
  vipDisabled?: boolean;
  freeDisabled?: boolean;
}

const IconDescBar = (props: IconDescBarProps) => {
  const {
    reOrder = false,
    fastTrack = false,
    vipDisabled = false,
    freeDisabled = false,
  } = props;
  return (
    <Stack direction="row">
      {!reOrder && (
        <Chip
          label="재실험"
          size="small"
          icon={<MyIcon icon="re" size={20} />}
          sx={{ backgroundColor: "transparent" }}
        />
      )}
      {!fastTrack && (
        <Chip
          label="Fast Track"
          size="small"
          icon={<MyIcon icon="fast" size={20} />}
          sx={{ backgroundColor: "transparent" }}
        />
      )}
      {!vipDisabled && (
        <Chip
          label="특별관리 기관"
          size="small"
          icon={<MyIcon icon="vip-fill" size={20} color="#FFAB33" />}
          sx={{ backgroundColor: "transparent" }}
        />
      )}
      {!freeDisabled && (
        <Chip
          label="무료"
          size="small"
          icon={<MyIcon icon="check2-round" size={20} />}
          sx={{ backgroundColor: "transparent" }}
        />
      )}
    </Stack>
  );
};

export default IconDescBar;
