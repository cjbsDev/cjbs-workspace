import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next-nprogress-bar";
import { useRecoilState } from "recoil";
import { idleDurationValueAtom } from "./idleAtom";
import { totalYearAtom } from "../Total/totalAtom";

const IdleHeader = () => {
  const searchParams = useSearchParams();
  const params = searchParams.get("idleduration");
  const router = useRouter();
  const pathname = usePathname();
  const [duration, setDuration] = useRecoilState(idleDurationValueAtom);

  useEffect(() => {
    if (params === null) {
      setDuration(1);
    }
  }, [params]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newDuration: number,
  ) => {
    if (newDuration !== duration) {
      setDuration(newDuration);
    }
  };

  return (
    <SectionHeader>
      <SectionHeader.Title>유휴 거래처 (장기 미거래)</SectionHeader.Title>
      <SectionHeader.Action>
        <StyledToggleButtonGroup
          value={duration}
          exclusive
          onChange={handleAlignment}
          size="small"
          sx={{
            mb: `-12px !important`,
            mt: `-12px !important`,
            py: `0 !important`,
          }}
        >
          {[1, 2, 3].map((value) => (
            <ToggleButton
              key={value}
              value={value}
              disabled={value === duration}
            >
              {value}Y+
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </SectionHeader.Action>
    </SectionHeader>
  );
};

export default IdleHeader;

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
