import React from "react";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { cjbsTheme } from "cjbsDSTM";

interface TabsWrapProps {
  tabValue: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const TabBox = (props: TabsWrapProps) => {
  const { tabValue, handleTabChange } = props;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 5 }}>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        aria-label="order tabs"
        TabIndicatorProps={{
          style: { background: "black" },
        }}
      >
        <StyledTab label="오더" {...a11yProps(0)} />
        <StyledTab label="샘플" {...a11yProps(1)} />
        <StyledTab label="파일" {...a11yProps(2)} />
        <StyledTab label="코멘트" {...a11yProps(3)} />
      </Tabs>
    </Box>
  );
};

export default TabBox;

interface StyledTabProps {
  label: string;
}
const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "#000000",
    fontWeight: 600,
  },
  // "&.Mui-focusVisible": {
  //   backgroundColor: "rgba(100, 95, 228, 0.32)",
  // },
}));
