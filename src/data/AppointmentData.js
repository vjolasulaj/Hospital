export const lineChartData = {
  labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  datasets: [
    {
      label: "Appointments",
      data: [2, 1, 4, 6, 8, 7, 0],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      pointBackgroundColor: "rgba(54, 162, 235, 1)", 
      pointBorderColor: "#fff", 
      pointHoverBackgroundColor: "#fff", 
      pointHoverBorderColor: "rgba(54, 162, 235, 1)", 
      pointRadius: 6, 
      pointHoverRadius: 8, 
      pointStyle: 'circle', 
      fill: true, 
      tension: 0.4,
    },
  ],
};
