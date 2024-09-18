import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { lineChartData } from "../data/PatientData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const PatientGraph = () => {
  const gradientFill = (ctx) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(54, 162, 235, 0.5)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    return gradient;
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#fff",
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        }
      },
      title: {
        display: true,
        text: "Weekly Patients Overview",
        color: "#fff",
        font: {
          size: 20,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        bodyColor: "#fff",
        titleColor: "#fff",
        borderWidth: 1,
        borderColor: "#777",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#fff",
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#e5e5e5",
        },
        ticks: {
          stepSize: 2,
          color: "#fff",
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
        borderColor: gradientFill,
      },
    },
  };

  return (
    <div className="graph-container">
      <div className="app-graph">
        <Line options={options} data={lineChartData} />
      </div>
    </div>
  );
};
