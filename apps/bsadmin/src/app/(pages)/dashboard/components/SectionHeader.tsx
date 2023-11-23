import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { cjbsTheme, OutlinedButton, XsmallButton } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";

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
          {/*서비스 별 매출*/}
          {children}
          {/*{JSON.stringify(toggleShow)}*/}
        </Typography>
      </Stack>
    </Box>
  );
};

const Action = ({ children, ...restProps }: ComponentProps) => {
  // const [toggleShow, setToggleShow] = useState<boolean>(false);
  return (
    // <SectionHeaderContext.Provider value={{}}>
    <Box>{children}</Box>
    // </SectionHeaderContext.Provider>
  );
};

const ToggleBtn = ({ children, ...restProps }: ToggleBtnProps) => {
  const { toggleShow, setToggleShow } = useContext(SectionHeaderContext);
  const handleClick = () => {
    console.log("Click@#@#@#");
    setToggleShow(!toggleShow);
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
  const { sx, buttonName, onClick, disabled = false } = restProps;

  return (
    <OutlinedButton
      sx={{ ...restProps.sx, mb: `-12px !important`, mt: `-12px !important` }}
      buttonName={buttonName}
      onClick={onClick}
      color="secondary"
      size="small"
      endIcon={<MyIcon icon="cheveron-right" size={20} />}
      disabled={disabled}
    />
  );
};

SectionHeader.Title = Title;
SectionHeader.Action = Action;
SectionHeader.ToggleBtn = ToggleBtn;
SectionHeader.MoreBtn = MoreBtn;
