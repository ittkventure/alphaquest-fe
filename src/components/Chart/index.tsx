import React, { FC, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData } from "@/api-client/types/TwitterType";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ILineChart {
  chartData: ChartData[];
  labelText: string;
  labelDataSet: string;
}

const LineChart: FC<ILineChart> = ({ chartData, labelText, labelDataSet }) => {
  const [data, setData] = useState({
    labels: chartData.map((value) => value.followerCount),
    datasets: [
      {
        label: labelDataSet,
        data: chartData.map((value) => value.followerCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: true,
        text: labelText,
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default LineChart;
