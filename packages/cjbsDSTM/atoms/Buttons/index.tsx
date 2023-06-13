import * as React from "react";
import { Typography, Button, ButtonProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";

interface CustomButtonProps extends ButtonProps {
  buttonName: string;
}

interface LinkButtonProps extends CustomButtonProps {
  pathName: string;
}

export const ContainedButton = ({
                                  buttonName,
                                  ...props
                                }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="contained">
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export const OutlinedButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="outlined">
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export const LinkButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="text">
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export const UnStyledButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="outlined" sx={{
        "&.MuiButton-outlined": {
          border: "1px solid #CED4DA",
          color: "black"
        }
      }}>
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};
