import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { formatNumberWithCommas } from "cjbsDSTM";

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
    cutoutPercentage: 32,
    // layout: {
    //   padding: 32,
    // },
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
      datalabels: {
        color: "#ffffff", // 라벨의 색상
        borderColor: "white",
        borderRadius: 25,
        borderWidth: 1,
        textAlign: "right",
        anchor: "center",
        // align: "end",
        font: {
          size: 12, // 글꼴 크기
          // weight: "bold", // 글꼴 두께
        },
        // padding: 20,
        formatter: (value, context) => {
          // console.log("PIE@@@@@@@", context.chart.data.datasets[0].data);
          // console.log("PIE!!!!!!!", context.chart.data.datasets.data); context.chart.data.datasets[0].data[context.dataIndex]
          // console.log("PIE!!!!!!!", value);
          const label = context.chart.data.labels[context.dataIndex];
          const commasValue = formatNumberWithCommas(value);
          return `${label}-${commasValue}`;
        },
      },
    },
    layout: {
      autoPadding: true,
      // padding: {
      //   top: 20,
      //   right: 100,
      //   bottom: 20,
      //   left: 100,
      // },
    },
  };

  return <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />;
};

export default PieContent;
