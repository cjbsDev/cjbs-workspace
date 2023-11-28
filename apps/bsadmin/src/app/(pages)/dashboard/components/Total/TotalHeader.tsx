import React from "react";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { SelectBox2 } from "cjbsDSTM";
import {
  dashboardMonthData,
  dashboardYearData,
} from "../../../../data/inputDataLists";
import SectionHeader from "../SectionHeader";
import { useRecoilState } from "recoil";
import { chartTypeAtom, totalMonthAtom, totalYearAtom } from "./totalAtom";
import { styled } from "@mui/material/styles";
import MyIcon from "icon/MyIcon";

const TotalHeader = () => {
  const [year, setYear] = useRecoilState(totalYearAtom);
  const [month, setMonth] = useRecoilState(totalMonthAtom);
  const [chartType, setChartType] = useRecoilState(chartTypeAtom);
  const handleYear = (event) => {
    const getYear = event.target.value;
    setYear(getYear);
  };

  const handleMonth = (event) => {
    const getMonth = event.target.value;
    setMonth(getMonth);
  };

  // const handleChartTypeChange = (type) => {
  //   setChartType(type);
  // };

  const handleChartTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newChartType: number,
  ) => {
    if (newChartType !== chartType) {
      setChartType(newChartType);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ position: "absolute", top: -77, left: -28 }}
      >
        <SelectBox2
          options={dashboardYearData}
          value={year}
          onChange={handleYear}
        />

        <SelectBox2
          options={dashboardMonthData}
          value={month}
          onChange={handleMonth}
        />
      </Stack>
      <SectionHeader>
        <SectionHeader.Title>총 매출</SectionHeader.Title>
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
              >
                <MyIcon icon={`${item}_chart`} size={18} />
                {item}
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
