import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, Stack, Typography } from "@mui/material";

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
  const customLegend = (
    <Box component="ul" sx={{ listStyle: "none" }}>
      {data.labels.map((label, index) => (
        <Box
          component="li"
          key={index}
          sx={{
            color: data.datasets[0].borderColor[index],
            mb: 1,
          }}
          // style={{ color: data.datasets[0].borderColor[index] }}
        >
          <Stack direction="row" spacing={5} justifyContent="space-between">
            <Stack
              direction="row"
              spacing={1}
              // alignItems="center"
              justifyContent="center"
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 0.25,
                  backgroundColor: data.datasets[0].borderColor[index],
                }}
              />
              <Typography variant="body2" sx={{ lineHeight: 1 }}>
                {label}
              </Typography>
            </Stack>
            <Box>{data.datasets[0].data[index]}</Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ my: 5.7 }}>
      <Box sx={{ height: 150, mt: 3.75, px: 1.25, position: "relative" }}>
        <Pie data={data} options={options} />
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: "54%",
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
