import * as React from "react";
import { Typography, Button, ButtonProps } from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
// import { useRouter } from 'next/navigation';

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
  // const router = useRouter();
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="text">
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};
