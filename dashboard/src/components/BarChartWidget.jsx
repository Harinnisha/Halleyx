import React, { useMemo } from 'react';
import { useStore } from '../store/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartWidget = () => {
  const { orders } = useStore();

  const chartData = useMemo(() => {
    // Aggregate revenue by status or product
    const productRevenue = {};
    orders.forEach(order => {
      if (productRevenue[order.product]) {
        productRevenue[order.product] += order.totalAmount;
      } else {
        productRevenue[order.product] = order.totalAmount;
      }
    });

    const labels = Object.keys(productRevenue);
    const data = Object.values(productRevenue);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [
        {
          label: 'Revenue by Product',
          data: data.length ? data : [0],
          backgroundColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 4,
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
        text: 'Revenue Distribution',
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
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChartWidget;
