import React from "react";
import { useRecoilValue } from "recoil";
import {
  chartTypeAtom,
  dashboardTypeCcAtom,
  endYearAtom,
  startYearAtom,
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

import { Box, Stack } from "@mui/material";
import useYearRange from "../../../hooks/useYearRange";
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
  colors: string[];
}

const Charts = ({
  labels,
  slsList,
  min,
  max,
  stepSize,
  colors,
}: ChartProps) => {
  const chartType = useRecoilValue(chartTypeAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const getStartYear = useRecoilValue(startYearAtom);
  const getEndYear = useRecoilValue(endYearAtom);
  const yearsRange = useYearRange(getStartYear, getEndYear);

  // 데이터셋 생성 함수
  const createDataset = (
    data: number,
    color: string | undefined,
    type: string,
    year: number | undefined,
  ) => ({
    label: year,
    data: data,
    borderColor: color,
    backgroundColor: color,
    type: type === "line" ? "line" : "bar",
  });

  // datasets 배열 생성
  const datasets = slsList.map((data, index) =>
    createDataset(data, colors[index], chartType, yearsRange[index]),
  );

  const data = {
    labels,
    datasets: datasets,
  };

  const options = {
    barThickness: getTypeCc === "BS_2100003" ? null : 60,
    maxBarThickness: getTypeCc === "BS_2100003" ? 20 : 50,
    maintainAspectRatio: false,
    responsive: true,
    // tension: 0.35,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 10,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: false,
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
          // borderDash: [5, 5], // y축 그리드 선 스타일
          drawBorder: false, // y축 외곽 선 그리지 않음
        },
        min: min,
        max: max,
        ticks: {
          // forces step size to be 50 units
          stepSize: stepSize,
        },

        title: {
          display: false,
          align: "end",
          text: "단위: 원",
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
        borderWidth: 3, // You can adjust the line width here
      },
    },
  };

  return (
    <>
      {chartType === "line" ? (
        <Line options={options} data={data} />
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  );
};

export default Charts;
