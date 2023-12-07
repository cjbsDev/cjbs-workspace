import * as React from "react";
import { Typography, TypographyProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface Title1Props extends TypographyProps {
  titleName: string;
}

export const Title1 = ({ titleName, ...props }: Title1Props) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Typography variant={"h4"} {...props}>
        {titleName}
      </Typography>
    </ThemeProvider>
  );
};
