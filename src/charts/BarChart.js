import { Bar } from "react-chartjs-2";

function BarChart ({ chartData }) {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Data Statistics"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};

export default BarChart;