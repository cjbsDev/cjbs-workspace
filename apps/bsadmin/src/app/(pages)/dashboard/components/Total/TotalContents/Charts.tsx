import React from "react";
import { useRecoilValue } from "recoil";
import { chartTypeAtom } from "../totalAtom";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Stack } from "@mui/material";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface ChartProps {
  slsForLastYear: number[];
  slsForPreLastYear: number[];
  labels: string[];
}

const Charts = (props: ChartProps) => {
  const { labels, slsForLastYear, slsForPreLastYear } = props;
  const chartType = useRecoilValue(chartTypeAtom);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "최근",
        data: slsForLastYear,
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        type: chartType === "line" ? "line" : "bar",
      },
      {
        // fill: true,
        label: "작년",
        data: slsForPreLastYear,
        borderColor: "#DEE2E6",
        type: "line",
        // backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

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
          borderDash: [5, 5], // y축 그리드 선 스타일
          drawBorder: false, // y축 외곽 선 그리지 않음
        },
      },
    },
  };

  return (
    <Stack direction="row" justifyContent="flex-end">
      {chartType === "line" ? (
        <Line options={options} data={data} height={218} />
      ) : (
        <Bar options={options} data={data} height={218} />
      )}
    </Stack>
  );
};

export default Charts;
