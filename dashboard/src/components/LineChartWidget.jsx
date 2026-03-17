import React, { useMemo } from 'react';
import { useStore } from '../store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartWidget = () => {
  const { orders } = useStore();

  const chartData = useMemo(() => {
    // Group orders by date
    const dateRevenue = {};
    orders.forEach(order => {
      const date = order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Unknown';
      if (dateRevenue[date]) {
        dateRevenue[date] += order.totalAmount;
      } else {
        dateRevenue[date] = order.totalAmount;
      }
    });

    const labels = Object.keys(dateRevenue);
    const data = Object.values(dateRevenue);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [
        {
          label: 'Revenue Over Time',
          data: data.length ? data : [0],
          borderColor: 'rgba(99, 102, 241, 1)', // indigo-500
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          tension: 0.4,
          fill: false,
        },
      ],
    };
  }, [orders]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Revenue Trend',
        font: { size: 16, weight: 'bold' }
      },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="p-4 w-full h-full flex flex-col bg-white">
      <div className="flex-1 relative">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default LineChartWidget;
