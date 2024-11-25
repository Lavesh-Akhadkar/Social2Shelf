import React, { useMemo } from "react";
import {
  Bar,
  Line,
  Pie,
  Radar,
  PolarArea,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
} from "chart.js";

// Register the required chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale
);

const AnalyticsDashboard = () => {
  // Static data; you can fetch this from your backend API
  const chartData = {
    barData: {
      labels: ["Product A", "Product B", "Product C"],
      values: [30, 50, 80],
    },
    lineData: {
      labels: ["Jan", "Feb", "Mar", "Apr"],
      values: [100, 200, 150, 300],
    },
    pieData: {
      labels: ["Electronics", "Clothing", "Accessories"],
      values: [40, 30, 30],
    },
    radarData: {
      labels: ["Feature A", "Feature B", "Feature C", "Feature D"],
      values: [60, 70, 80, 50],
    },
    polarAreaData: {
      labels: ["North", "South", "East", "West"],
      values: [20, 30, 50, 40],
    },
    doughnutData: {
      labels: ["Completed", "In Progress", "Pending"],
      values: [70, 20, 10],
    },
  };

  // Memoized chart data and options
  const barData = useMemo(
    () => ({
      labels: chartData.barData.labels,
      datasets: [
        {
          label: "Product Sales",
          data: chartData.barData.values,
          backgroundColor: ["#ff9900", "#ffcc00", "#ff6600"],
          borderWidth: 1,
        },
      ],
    }),
    [chartData]
  );

  const lineData = useMemo(
    () => ({
      labels: chartData.lineData.labels,
      datasets: [
        {
          label: "Monthly Sales",
          data: chartData.lineData.values,
          fill: false,
          borderColor: "#4CAF50",
          tension: 0.4,
        },
      ],
    }),
    [chartData]
  );

  const pieData = useMemo(
    () => ({
      labels: chartData.pieData.labels,
      datasets: [
        {
          data: chartData.pieData.values,
          backgroundColor: ["#42A5F5", "#FF7043", "#66BB6A"],
        },
      ],
    }),
    [chartData]
  );

  const radarData = useMemo(
    () => ({
      labels: chartData.radarData.labels,
      datasets: [
        {
          label: "Feature Scores",
          data: chartData.radarData.values,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
        },
      ],
    }),
    [chartData]
  );

  const polarAreaData = useMemo(
    () => ({
      labels: chartData.polarAreaData.labels,
      datasets: [
        {
          data: chartData.polarAreaData.values,
          backgroundColor: ["#FFC107", "#03A9F4", "#8BC34A", "#FF5722"],
        },
      ],
    }),
    [chartData]
  );

  const doughnutData = useMemo(
    () => ({
      labels: chartData.doughnutData.labels,
      datasets: [
        {
          data: chartData.doughnutData.values,
          backgroundColor: ["#29B6F6", "#FFA726", "#AB47BC"],
        },
      ],
    }),
    [chartData]
  );


  return (
    <div className="analytics-container h-[100vh] overflow-y-auto w-full space-y-10 p-5">
      <h1 className="text-2xl font-bold text-gray-700">Analytics Dashboard</h1>
      <div className="flex flex-col sm:flex-row sm:flex-wrap space-x-6 space-y-6 justify-evenly">
        {/* Bar Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Product Sales (Bar Chart)</h2>
          <Bar key="bar-chart" data={barData}  />
        </div>

        {/* Line Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales (Line Chart)</h2>
          <Line key="line-chart" data={lineData}  />
        </div>

        {/* Pie Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Category Distribution (Pie Chart)</h2>
          <Pie key="pie-chart" data={pieData}  />
        </div>

        {/* Radar Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Feature Scores (Radar Chart)</h2>
          <Radar key="radar-chart" data={radarData}  />
        </div>

        {/* Polar Area Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Regional Distribution (Polar Area)</h2>
          <PolarArea key="polar-area-chart" data={polarAreaData}  />
        </div>

        {/* Doughnut Chart */}
        <div className="chart-container bg-white shadow-md rounded-md p-5 ">
          <h2 className="text-lg font-semibold mb-4">Task Progress (Doughnut Chart)</h2>
          <Doughnut key="doughnut-chart" data={doughnutData}  />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
