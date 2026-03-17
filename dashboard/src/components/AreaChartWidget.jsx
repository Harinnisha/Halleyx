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
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AreaChartWidget = () => {
  const { orders } = useStore();

  const chartData = useMemo(() => {
    // Group orders by date for area chart
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
          borderColor: 'rgba(52, 211, 153, 1)', // emerald-400
          backgroundColor: 'rgba(52, 211, 153, 0.4)', // transparent emerald
          tension: 0.4,
          fill: true, // This makes it an area chart
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
        text: 'Cumulative Revenue',
        font: { size: 16, weight: 'bold' }
      },
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="p-4 w-full h-full flex flex-col bg-white">
      <div className="flex-1 relative mt-[10px]">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AreaChartWidget;
