import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import {
  Box,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  OutlinedButton,
  XsmallButton,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import { styled } from "@mui/material/styles";

interface ComponentProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

interface ToggleBtnProps extends ComponentProps {
  buttonName: string;
  disabled?: boolean;
  onClick?: (() => void | undefined) | undefined;
  sx?: object;
}

const SectionHeaderContext = createContext<{
  toggleShow: boolean;
  setToggleShow: Dispatch<SetStateAction<boolean>>;
}>({
  toggleShow: false,
  setToggleShow: () => {},
});

const SectionHeader = ({ children, ...restProps }: ComponentProps) => {
  const [toggleShow, setToggleShow] = useState<boolean>(false);
  return (
    <SectionHeaderContext.Provider value={{ toggleShow, setToggleShow }}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-between"
        alignItems="center"
      >
        {children}
      </Stack>
      <Divider sx={{ mb: 1.85, mt: 1.85 }} />
    </SectionHeaderContext.Provider>
  );
};

export default SectionHeader;

const Title = ({ children, ...restProps }: ComponentProps) => {
  const { toggleShow } = useContext(SectionHeaderContext);
  return (
    <Box>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Box
          sx={{
            width: 3,
            background: `linear-gradient(180deg, #6366F1 0%, #38BDF8 100%)`,
          }}
        />
        <Typography variant="subtitle1" sx={{ lineHeight: 1 }}>
          {children}
        </Typography>
      </Stack>
    </Box>
  );
};

const Action = ({ children, ...restProps }: ComponentProps) => {
  // const [toggleShow, setToggleShow] = useState<boolean>(false);
  return (
    // <SectionHeaderContext.Provider value={{}}>
    <Stack direction="row" spacing={0.5} alignItems="center">
      {children}
    </Stack>
    // </SectionHeaderContext.Provider>
  );
};

const ToggleBtn = ({ children, ...restProps }: ToggleBtnProps) => {
  const { toggleShow, setToggleShow } = useContext(SectionHeaderContext);
  const handleClick = () => {
    console.log("Click@#@#@#");
    // setToggleShow(!toggleShow);
    restProps.onClick();
  };
  return (
    <OutlinedButton
      buttonName={restProps.buttonName}
      onClick={handleClick}
      size="small"
    />
  );
};

const MoreBtn = ({ children, ...restProps }: ToggleBtnProps) => {
  const { toggleShow, setToggleShow } = useContext(SectionHeaderContext);
  const { buttonName, onClick, disabled = false } = restProps;

  return (
    <>
      <XsmallButton
        disabled={disabled}
        buttonName={buttonName}
        onClick={onClick}
        color="secondary"
        endIcon={<MyIcon icon="cheveron-right" size={20} />}
        sx={{
          ...restProps.sx,
          mb: `-12px !important`,
          mt: `-12px !important`,
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
          lineHeight: 1,
          px: 1,
          pt: 0.35,
          pb: 0.5,
          verticalAlign: "center",
          ".MuiButton-endIcon": {
            pt: 0.15,
          },
        }}
      />
    </>
  );
};

const DurationBtn = ({ children, ...restProps }) => {
  const { sx, value, onChange } = restProps;

  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      size="small"
      sx={{
        mb: `-12px !important`,
        mt: `-12px !important`,
        py: `0 !important`,
      }}
    >
      {[1, 2, 3].map((item) => (
        <ToggleButton key={item} value={item} disabled={item === value}>
          {item}Y+
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

SectionHeader.Title = Title;
SectionHeader.Action = Action;
SectionHeader.ToggleBtn = ToggleBtn;
SectionHeader.MoreBtn = MoreBtn;
SectionHeader.DurationBtn = DurationBtn;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    padding: "0 12px",
    backgroundColor: theme.palette.grey["100"],
    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#6366F1",
      color: "white",
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
