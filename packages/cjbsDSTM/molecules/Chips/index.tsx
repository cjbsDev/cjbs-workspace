import * as React from "react";
import { Chip, ChipProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import MyIcon from "icon/myIcon";

export const LeaderCip = ({ ...props }: ChipProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Chip
        icon={
          <MyIcon
            icon="profile-circle-fill"
            size={18}
            color={cjbsTheme.palette.primary.main}
          />
        }
        label={"Leader"}
        size="small"
        sx={{
          backgroundColor: "#E6F0FA",
          color: "#006ECD",
        }}
      />
    </ThemeProvider>
  );
};
