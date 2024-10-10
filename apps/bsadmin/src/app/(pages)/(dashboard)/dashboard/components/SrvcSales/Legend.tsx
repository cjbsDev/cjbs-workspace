import React from "react";
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";

interface LegendProps {
  salesData: number[];
  salesLabels: string[];
  salesColors: string[];
  salesPerColors: string[];
  salesPercent: number[];
}

const Legend = (props: LegendProps) => {
  const { salesData, salesLabels, salesColors, salesPerColors, salesPercent } =
    props;

  return (
    <Box>
      <Typography variant="body2" sx={{ textAlign: "right", pb: 5 }}>
        단위: 천 원
      </Typography>
      <Grid container columnSpacing={5}>
        {salesLabels.map(
          (
            label:
              | boolean
              | React.Key
              | React.ReactElement<
                  any,
                  string | React.JSXElementConstructor<any>
                >
              | Iterable<React.ReactNode>
              | React.PromiseLikeOfReactNode
              | null
              | undefined,
            index: number,
          ) => {
            return (
              <Grid
                item
                xs={12}
                key={label}
                sx={{
                  color: salesColors[index],
                  // mb: 0.5,
                  width: "50%",
                  float: "left",
                }}
              >
                <Stack
                  direction="row"
                  spacing={5}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: 0.25,
                        backgroundColor: salesColors[index],
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ lineHeight: 1, color: "black" }}
                    >
                      {label}
                      {/*{index}*/}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" sx={{ color: "black" }}>
                      {formatNumberWithCommas(salesData[index])}
                    </Typography>
                    <Chip
                      label={`${salesPercent[index]}%`}
                      size="small"
                      sx={{
                        minWidth: 43,
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        borderRadius: 0.5,
                        // color: salesColors[index],
                        backgroundColor: salesPerColors[index],
                        justifyContent: "flex-end",
                      }}
                    />
                  </Stack>
                </Stack>
                <Divider sx={{ my: 1.25 }} />
              </Grid>
            );
          },
        )}
      </Grid>
    </Box>
  );
};

export default Legend;
