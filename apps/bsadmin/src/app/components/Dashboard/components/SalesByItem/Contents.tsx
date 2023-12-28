import React from "react";
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
import useDashboardParams from "../../hooks/useDashboardParams";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilValue } from "recoil";
import {
  dashboardGroupCcAtom,
  dashboardTypeCcAtom,
  endYearAtom,
  groupTargetAtom,
  instTopSelectAtom,
  startYearAtom,
} from "../../recoil/dashboardAtom";
import { Box, Stack, Typography } from "@mui/material";
import useYearRange from "../../hooks/useYearRange";

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

const Contents = () => {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();
  const groupCc = useRecoilValue(dashboardGroupCcAtom);
  const targetCc = useRecoilValue(instTopSelectAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);
  const getStartYear = useRecoilValue(startYearAtom);
  const getEndYear = useRecoilValue(endYearAtom);
  const yearsRange = useYearRange(getStartYear, getEndYear);

  const { data: groupData } = useSWR(
    `/dashboard/sls/group?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}&typeCc=${typeCc}&groupCc=BS_2200001&target=${targetCc}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    },
  );

  console.log("항목별 매출", groupData);

  const { labels, colors, slsList, min, max, stepSize } = groupData;

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
    // type:
    //   type === "BS_2100004" || type === "BS_2100005" || type === "BS_2100006"
    //     ? "bar"
    //     : "line",
  });

  // datasets 배열 생성
  const datasets = slsList.map((data, index) =>
    createDataset(data, colors[index], getTypeCc, yearsRange[index]),
  );

  const data = {
    labels,
    datasets: datasets,
  };

  const options = {
    barThickness: getTypeCc === "BS_2100003" ? null : 30,
    // barPercentage: 0.5,
    maxBarThickness: 20,
    maintainAspectRatio: false,
    // responsive: true,
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
          display: false,
          align: "end",
          // text: "단위: 원",
          font: {
            size: 13,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 0, left: 0, right: 0, bottom: 0 },
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
    <Box sx={{ height: 288, mb: 2 }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2, mb: 1 }}>
        <Typography variant="body2">단위: 만원</Typography>
      </Stack>
      <Bar options={options} data={data} />
    </Box>
  );
};

export default Contents;
