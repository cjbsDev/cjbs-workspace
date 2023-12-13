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
      {/*{periodListData.map((period, index) => {*/}
      {/*  return (*/}
      {/*    <Box key={period.name}>*/}
      {/*      <PeriodBtn value={period.value} name={period.name} />*/}
      {/*    </Box>*/}
      {/*  );*/}
      {/*})}*/}

      <StyledToggleButtonGroup
        value={typeCc}
        exclusive
        onChange={handleAlignment}
        size="small"
        sx={{
          mb: `-12px !important`,
          mt: `-12px !important`,
          py: `0 !important`,
        }}
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
