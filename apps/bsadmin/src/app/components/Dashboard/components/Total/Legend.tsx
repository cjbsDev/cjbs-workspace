import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import { endYearAtom, startYearAtom } from "../../recoil/dashboardAtom";
import useYearRange from "../../hooks/useYearRange";

const Legend = () => {
  const getStartYear = useRecoilValue(startYearAtom);
  const getEndYear = useRecoilValue(endYearAtom);
  const yearsRange = useYearRange(getStartYear, getEndYear);
  return (
    <Box sx={{ position: "absolute", bottom: 30, left: 30 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        {yearsRange.map((year, index) => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <Box
                sx={{
                  backgroundColor:
                    index === 0
                      ? "#6366F1"
                      : index === 1
                        ? "#8BDCD7"
                        : "#FFB8A2",
                  width: 12,
                  height: 12,
                }}
              />
              <Typography variant="body2">{year}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Legend;
