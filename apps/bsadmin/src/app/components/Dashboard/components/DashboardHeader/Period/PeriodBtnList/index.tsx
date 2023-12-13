import React, { useState } from "react";
import { periodListData } from "../../../../../../data/inputDataLists";
import { ContainedButton } from "cjbsDSTM";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import PeriodBtn from "./PeriodBtn";
import { styled } from "@mui/material/styles";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  chartTypeAtom,
  dashboardTargetAtom,
  dashboardTypeCcAtom,
} from "../../../../dashboardAtom";

const Index = () => {
  const [typeCc, setTypeCc] = useRecoilState(dashboardTypeCcAtom);
  const setChartType = useSetRecoilState(chartTypeAtom);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newTypeCc: string,
  ) => {
    console.log("TypeCc Value ==>>", newTypeCc);
    if (newTypeCc !== typeCc) {
      setTypeCc(newTypeCc);
    }
    if (newTypeCc === "BS_2100005" || newTypeCc === "BS_2100006") {
      setChartType("bar");
    } else {
      setChartType("line");
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      <StyledToggleButtonGroup
        value={typeCc}
        exclusive
        onChange={handleAlignment}
        size="small"
        sx={
          {
            // mb: `-12px !important`,
            // mt: `-12px !important`,
            // py: `0 !important`,
          }
        }
      >
        {periodListData.map((period) => (
          <ToggleButton
            key={period.name}
            value={period.value}
            disabled={period.value === typeCc}
          >
            {period.name}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Stack>
  );
};

export default Index;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: `1px solid ${theme.palette.grey["400"]}`,
    padding: "2.5px 12px",
    backgroundColor: "white",
    "&.Mui-disabled": {
      border: 0,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
      backgroundColor: "#000000",
      color: "white",
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      borderLeft: `1px solid ${theme.palette.grey["400"]}`,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
