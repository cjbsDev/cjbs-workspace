import React from "react";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
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
    <Box
      sx={{
        position: "absolute",
        right: 10,
        top: "58%",
        transform: "translateY(-50%)",
      }}
    >
      <Box component="ul" sx={{ listStyle: "none" }}>
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
              <Box
                component="li"
                key={label}
                sx={{
                  color: salesColors[index],
                  mb: 1,
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
                        width: 55,
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        borderRadius: 0.5,
                        color: salesColors[index],
                        backgroundColor: salesPerColors[index],
                      }}
                    />
                  </Stack>
                </Stack>
                {index === salesLabels.length - 1 ? null : (
                  <Divider sx={{ my: 1.25 }} />
                )}
              </Box>
            );
          },
        )}
      </Box>
    </Box>
  );
};

export default Legend;
