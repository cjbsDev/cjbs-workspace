import React from "react";
import { useRecoilValue } from "recoil";
import {
  chartTypeAtom,
  dashboardTypeCcAtom,
} from "../../../recoil/dashboardAtom";
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
  slsList: number[];
  labels: string[];
  min: number;
  max: number;
  stepSize: number;
}

const Charts = ({ labels, slsList, min, max, stepSize }: ChartProps) => {
  const chartType = useRecoilValue(chartTypeAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  const data = {
    labels,
    datasets: [
      {
        // fill: true,
        label: "올해",
        data: slsList[0],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.9)",
        type: chartType === "line" ? "line" : "bar",
      },
      {
        // fill: true,
        label: "작년",
        data: slsList[1],
        borderColor: "#8BDCD7",
        backgroundColor: "#8BDCD7",
        type: "line",
      },
      {
        // fill: true,
        label: "재작년",
        data: slsList[2],
        borderColor: "#FFB8A2",
        backgroundColor: "#FFB8A2",
        type: "line",
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
        title: {
          display: true,
          text:
            getTypeCc === "BS_2100003"
              ? "월"
              : getTypeCc === "BS_2100004"
                ? "분기"
                : getTypeCc === "BS_2100005"
                  ? "반기"
                  : "년",
          font: {
            size: 13,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        grid: {
          borderDash: [5, 5], // y축 그리드 선 스타일
          drawBorder: false, // y축 외곽 선 그리지 않음
        },
        min: min,
        max: max,
        ticks: {
          // forces step size to be 50 units
          stepSize: stepSize,
        },

        title: {
          display: true,
          align: "end",
          // text: "단위: 원",
          font: {
            size: 13,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 0, left: 0, right: 0, bottom: 20 },
        },
        position: "left",
      },
    },
    elements: {
      line: {
        borderWidth: 4, // You can adjust the line width here
      },
    },
  };

  return (
    <Stack direction="row" justifyContent="flex-end">
      {chartType === "line" ? (
        <Line options={options} data={data} height={273} />
      ) : (
        <Bar options={options} data={data} height={273} />
      )}
    </Stack>
  );
};

export default Charts;