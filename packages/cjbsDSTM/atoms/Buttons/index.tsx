import * as React from "react";
import {
  Typography,
  Button,
  ButtonProps,
  ToggleButton,
  ToggleButtonProps,
} from "@mui/material";
import { cjbsTheme } from "../../themes";
import { ThemeProvider } from "@mui/material/styles";
import MyIcon from "icon/myIcon";

interface CustomButtonProps extends ButtonProps {
  buttonName: string;
}

interface LinkButtonProps extends CustomButtonProps {
  pathName: string;
}

interface CustomToggleButtonProps extends ToggleButtonProps {
  value: string;
  selected: boolean;
  onChange: () => void;
}

export const ContainedButton = ({
  buttonName,
  ...props
}: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        variant="contained"
        size="small"
        sx={{
          ".MuiButton-containedSizeSmall": {
            p: 0,
          },
        }}
      >
        <Typography variant="body2">{buttonName}</Typography>
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

export const XsmallButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="xSmall">
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
      <Button
        {...props}
        variant="outlined"
        sx={{
          "&.MuiButton-outlined": {
            border: "1px solid #CED4DA",
            color: "black",
          },
        }}
      >
        <Typography variant="buttonMD">{buttonName}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export const CustomToggleButton = ({
  value,
  selected,
  onChange,
  ...props
}: CustomToggleButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <ToggleButton
        {...props}
        sx={{
          pr: 2,
          pl: 2,
          backgroundColor: "transparent",
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
          "&.MuiToggleButton-root": {
            color: "black",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
          "&.Mui-selected": {
            backgroundColor: "transparent",
            ":hover": {
              backgroundColor: "transparent",
            },
          },
        }}
        value={value}
        size="small"
        selected={selected}
        onChange={onChange}
      >
        <Typography variant="button" sx={{ mr: 1 }}>
          {value}
        </Typography>
        {selected ? (
          <MyIcon icon="cheveron-up" size={16} />
        ) : (
          <MyIcon icon="cheveron-down" size={16} />
        )}
      </ToggleButton>
    </ThemeProvider>
  );
};
