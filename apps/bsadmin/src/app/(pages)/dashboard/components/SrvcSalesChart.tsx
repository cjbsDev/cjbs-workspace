import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red1234345345", "Blue", "Yellow", "Green", "Purple", "Orange"],
  // labels: Utils.months({ count: DATA_COUNT }),
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    cutout: "80%",
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 5,
      },
    },
  },
};

const SrvcSalesChart = () => {
  const { data: srvcSalesData } = useSWR(
    `/dashboard/sls/srvc?year=2023&month=11`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("PieChart", srvcSalesData);

  const salesLabels = srvcSalesData.labels;
  const salesData = srvcSalesData.slsForAnlsResList.map((item) => item.sales);
  const salesPercent = srvcSalesData.slsForAnlsResList.map(
    (item) => item.percent,
  );
  const salesColors = srvcSalesData.colors;
  const salesPerColors = srvcSalesData.perColors;

  const chartData = {
    labels: srvcSalesData.labels,
    datasets: [
      {
        label: "금액",
        data: salesData,
        backgroundColor: salesColors,
        borderColor: salesColors,
        borderWidth: 1,
      },
    ],
  };

  const customLegend = (
    <Box component="ul" sx={{ listStyle: "none" }}>
      {salesLabels.map((label, index) => (
        <Box
          component="li"
          key={label}
          sx={{
            color: chartData.datasets[0].borderColor[index],
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
                {formatNumberWithCommas(chartData.datasets[0].data[index])}
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
      ))}
    </Box>
  );

  return (
    <Box sx={{ my: 5.7 }}>
      <Box sx={{ height: 150, mt: 3.75, px: 1.25, position: "relative" }}>
        <Pie data={chartData} options={options} />
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: "58%",
            transform: "translateY(-50%)",
          }}
        >
          {customLegend}
        </Box>
      </Box>
    </Box>
  );
};

export default SrvcSalesChart;
