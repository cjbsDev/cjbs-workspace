import React from "react";
import { groupListData } from "../../../../../data/inputDataLists";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  chartTypeAtom,
  dashboardGroupCcAtom,
  groupTargetAtom,
} from "../../../recoil/dashboardAtom";

const Index = () => {
  const [groupCc, setGroupCc] = useRecoilState(dashboardGroupCcAtom);
  // const setChartType = useSetRecoilState(chartTypeAtom);
  // const resetRecoil = useResetRecoilState(groupTargetAtom);
  const setTarget = useSetRecoilState(groupTargetAtom);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newGroupCc: string,
  ) => {
    console.log("GroupCc Value ==>>", newGroupCc);
    if (newGroupCc !== groupCc) {
      setGroupCc(newGroupCc);
      setTarget("");
    }
    // if (newGroupCc === "BS_2100005" || newGroupCc === "BS_2100006") {
    //   setChartType("bar");
    // } else {
    //   setChartType("line");
    // }
  };

  return (
    <Stack direction="row" spacing={1}>
      <StyledToggleButtonGroup
        value={groupCc}
        exclusive
        onChange={handleAlignment}
        size="small"
        sx={{
          mb: `-12px !important`,
          mt: `-24px !important`,
        }}
      >
        {groupListData.map((group) => (
          <ToggleButton
            key={group.name}
            value={group.value}
            disabled={group.value === groupCc}
          >
            {group.name}
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
