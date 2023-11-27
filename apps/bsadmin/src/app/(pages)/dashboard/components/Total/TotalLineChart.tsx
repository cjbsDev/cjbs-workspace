import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Grid, Stack, Typography } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { formatNumberWithCommas } from "cjbsDSTM/commonFunc";
import MyIcon from "icon/MyIcon";
import { blue, red } from "cjbsDSTM/themes/color";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalMonthAtom, totalYearAtom } from "./totalAtom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  tension: 0.35,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        // color: "red", // y축 그리드 색상
        // borderColor: "green", // y축 그리드 선 색상
        borderDash: [5, 5], // y축 그리드 선 스타일
        drawBorder: false, // y축 외곽 선 그리지 않음
      },
      // min: 0,
      // max: 100,
      // ticks: {
      //   stepSize: 10,
      // },
    },
  },
};

const TotalLineChart = () => {
  // const [year, setYear] = useState(2023);
  // const [month, setMonth] = useState(11);
  const year = useRecoilValue(totalYearAtom);
  const month = useRecoilValue(totalMonthAtom);

  const { data: totalData } = useSWR(
    `/dashboard/sls/year?year=${year}&month=${month}`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Total Data", totalData);

  const {
    labels,
    totalSales,
    changeSales,
    isIcs,
    slsForLastYear,
    slsForPreLastYear,
  } = totalData;

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "최근",
        data: slsForLastYear,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
      {
        // fill: true,
        label: "작년",
        data: slsForPreLastYear,
        borderColor: "#DEE2E6",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Box sx={{ height: 200, mt: 3, mb: 3 }}>
      <Grid container>
        <Grid item xs={3.5}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h1">
                &#8361;{formatNumberWithCommas(totalSales)}
              </Typography>
            </Box>
            <Box>
              <Stack direction="row" spacing={2}>
                <Typography variant="body2" sx={{ color: "#868E95" }}>
                  Last Month
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MyIcon icon="arrow_drop_up" size={14} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isIcs === "Y" ? "#FF5050" : blue,
                      fontWeight: 700,
                    }}
                  >
                    {changeSales}&#37;
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={8.5}
          sx={{ position: "relative", justifyContent: "flex-end" }}
        >
          <Stack direction="row" justifyContent="flex-end">
            <Line options={options} data={data} height={220} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TotalLineChart;
