import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

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

  return <Pie data={chartData} options={options} />;
};

export default PieContent;
