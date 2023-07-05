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
import { useFormContext } from "react-hook-form";

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

export const ResetButton = ({ buttonName, ...props }: CustomButtonProps) => {
  const methods = useFormContext();
  const { reset } = methods;
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        onClick={() => reset()}
        sx={{
          "&.MuiButton-containedSizeSmall": {
            p: "3px 10px",
          },
          "&.MuiButton-outlinedSizeSmall": {
            p: "3px 10px",
          },
          "&.MuiButton-outlinedSecondary": {
            color: cjbsTheme.palette.common.black,
          },
        }}
      >
        {buttonName}
      </Button>
    </ThemeProvider>
  );
};

export const XlargeButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        size="large"
        sx={{
          "&.MuiButton-containedSizeLarge": {
            padding: "12px 20px !important",
            fontSize: 18,
          },
          "&.MuiButton-textSizeLarge": {
            padding: "12px 20px !important",
            fontSize: 18,
          },
          "&.MuiButton-outlinedSizeLarge": {
            padding: "12px 20px !important",
            fontSize: 18,
          },
        }}
      >
        {buttonName}
      </Button>
    </ThemeProvider>
  );
};

export const ContainedButton = ({
  buttonName,
  ...props
}: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        variant="contained"
        sx={{
          "&.MuiButton-containedSizeSmall": {
            p: "3px 10px",
          },
        }}
      >
        {buttonName}
      </Button>
    </ThemeProvider>
  );
};

export const OutlinedButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        variant="outlined"
        sx={{
          "&.MuiButton-outlinedSecondary": {
            color: cjbsTheme.palette.common.black,
          },
        }}
      >
        {buttonName}
      </Button>
    </ThemeProvider>
  );
};

export const XsmallButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="xSmall">
        {buttonName}
      </Button>
    </ThemeProvider>
  );
};

export const LinkButton = ({ buttonName, ...props }: CustomButtonProps) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button {...props} variant="text" sx={{}}>
        {buttonName}
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
        {buttonName}
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
