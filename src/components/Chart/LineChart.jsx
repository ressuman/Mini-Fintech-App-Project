import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const options = [];

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "stats",
        data: [65, 59, 80, 81, 56, 32, 55, 40, 45, 23, 67, 98, 54],
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return <Line data={data} options={options} className="h-full" />;
};
