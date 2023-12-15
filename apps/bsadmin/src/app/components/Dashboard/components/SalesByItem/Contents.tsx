import React from "react";
// import { Box, Stack, Typography } from "@mui/material";
// import MyIcon from "icon/MyIcon";
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
  groupTargetAtom,
} from "../../recoil/dashboardAtom";
import { Box } from "@mui/material";

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
  const targetCc = useRecoilValue(groupTargetAtom);
  const getTypeCc = useRecoilValue(dashboardTypeCcAtom);

  const { data: groupData } = useSWR(
    `/dashboard/sls/group?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}&typeCc=${typeCc}&groupCc=${groupCc}&target=${targetCc}`,
    fetcher,
    {
      suspense: true,
      revalidateOnFocus: false,
    },
  );

  console.log("항목별 매출", groupData);

  const {
    labels,
    totalSales,
    changeSales,
    isIcs,
    slsList,
    min,
    max,
    stepSize,
  } = groupData;

  const data = {
    labels,
    datasets: [
      {
        // fill: true,
        label: "올해",
        data: slsList[0],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.9)",
        type: "line",
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
        borderWidth: 4, // You can adjust the line width here
      },
    },
  };

  return (
    <Box sx={{ height: 273 }}>
      <Line options={options} data={data} height={273} />
      {/*{chartType === "line" ? (*/}
      {/*  <Line options={options} data={data} height={273} />*/}
      {/*) : (*/}
      {/*  <Bar options={options} data={data} height={273} />*/}
      {/*)}*/}
    </Box>
    // <Box
    //   sx={{
    //     position: "absolute",
    //     left: "50%",
    //     top: "50%",
    //     transform: "translate(-50%, -50%)",
    //   }}
    // >
    //   <Stack direction="row" justifyContent="center">
    //     <MyIcon icon="nodata" size={20} />
    //     <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>
    //   </Stack>
    // </Box>
  );
};

export default Contents;
