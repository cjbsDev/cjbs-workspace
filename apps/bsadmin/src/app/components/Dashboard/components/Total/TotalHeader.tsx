import React from "react";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SectionHeader from "../SectionHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { chartTypeAtom, dashboardTypeCcAtom } from "../../recoil/dashboardAtom";
import { styled } from "@mui/material/styles";
import MyIcon from "icon/MyIcon";

const TotalHeader = () => {
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const [chartType, setChartType] = useRecoilState(chartTypeAtom);
  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: string,
  ) => {
    if (newChartType !== chartType) {
      setChartType(newChartType);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <SectionHeader>
        <SectionHeader.Title>전체</SectionHeader.Title>
        <SectionHeader.Action>
          <StyledToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            size="small"
            sx={{
              mb: `-12px !important`,
              mt: `-12px !important`,
              py: `0 !important`,
            }}
          >
            {["line", "bar"].map((item) => (
              <ToggleButton
                key={item}
                value={item}
                disabled={item === chartType}
                sx={{ borderRadius: `0 !important` }}
              >
                <MyIcon icon={`${item}_chart`} size={18} />
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </SectionHeader.Action>
      </SectionHeader>
    </Box>
  );
};

export default TotalHeader;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  borderRadius: 0,
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    padding: "0 2px",
    backgroundColor: theme.palette.grey["100"],
    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#6366F1",
      color: "white",
    },
    "&:not(:first-of-type)": {
      // borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      // borderRadius: theme.shape.borderRadius,
    },
  },
}));
