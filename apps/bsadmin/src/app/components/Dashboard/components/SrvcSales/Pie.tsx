import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { cjbsTheme, formatNumberWithCommas } from "cjbsDSTM";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieProps {
  salesLabels: string[];
  salesData: number[];
  salesColors: string[];
}

const PieContent = (props: PieProps) => {
  const { salesLabels, salesData, salesColors } = props;
  const chartData = {
    labels: salesLabels,
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

  const options = {
    // Core options
    // aspectRatio: 4 / 3,
    // cutoutPercentage: 32,
    plugins: {
      // cutout: "80%",
      maintainAspectRatio: false,
      tooltip: false,
      legend: {
        display: false,
        position: "right",
      },
      elements: {
        arc: {
          borderWidth: 5,
        },
      },
      datalabels: {
        // color: "#ffffff", // 라벨의 색상
        // offset: 80,
        borderColor: cjbsTheme.palette.grey["300"],
        backgroundColor: cjbsTheme.palette.grey.A100,
        borderRadius: 8,
        borderWidth: 1.5,
        // textAlign: "right",
        // anchor: "end",
        align: "end",
        padding: 3,
        font: {
          size: 12, // 글꼴 크기
          // weight: "bold", // 글꼴 두께
        },
        formatter: (value, context) => {
          // console.log("PIE@@@@@@@", context.chart.data.datasets[0].data);
          // console.log("PIE!!!!!!!", context.chart.data.datasets.data); context.chart.data.datasets[0].data[context.dataIndex]
          // console.log("PIE!!!!!!!", value);
          const label = context.chart.data.labels[context.dataIndex];
          const commasValue = formatNumberWithCommas(value);
          return `${label}\n${commasValue}만원`;
        },
      },
    },
    layout: {
      autoPadding: true,
      padding: {
        top: 20,
        right: 52,
        bottom: 20,
        left: 52,
      },
    },
  };

  return <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />;
};

export default PieContent;
