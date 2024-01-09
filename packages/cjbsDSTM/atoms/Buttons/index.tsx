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
import MyIcon from "icon/MyIcon";
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
            padding: "12px 20px",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "26px",
          },
          "&.MuiButton-textSizeLarge": {
            padding: "12px 20px",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "26px",
          },
          "&.MuiButton-outlinedSizeLarge": {
            padding: "12px 20px",
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "26px",
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
          ...props.sx,
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
          ...props.sx,
          backgroundColor: "white",
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
      <Button {...props} variant="text" sx={{ ...props.sx }}>
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
          ...props.sx,
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
          // pr: 2,
          // pl: 2,
          backgroundColor: "transparent",
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
          "&.MuiToggleButton-root": {
            p: 0,
            pl: 1.5,
            pr: 1.5,
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

export const DeletedButton = (props) => {
  return (
    <ThemeProvider theme={cjbsTheme}>
      <Button
        {...props}
        variant="outlined"
        color="error"
        size="small"
        sx={{
          ...props.sx,
        }}
        // startIcon={<MyIcon icon="trash" size={20} />}
      >
        {props.buttonName}
      </Button>
    </ThemeProvider>
  );
};
