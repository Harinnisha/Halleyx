import React, { useMemo } from 'react';
import { useStore } from '../store/store';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ScatterChartWidget = () => {
  const { orders } = useStore();

  const chartData = useMemo(() => {
    // We'll show Order Date vs Total Amount for scatter plot
    const dataPoints = orders.map((order, idx) => ({
      x: parseInt(order.quantity || 1, 10),
      y: parseInt(order.totalAmount || 0, 10),
    }));

    return {
      datasets: [
        {
          label: 'Order Volume vs Price',
          data: dataPoints.length ? dataPoints : [{ x: 0, y: 0 }],
          backgroundColor: 'rgba(239, 68, 68, 0.7)', // red-500
          borderColor: 'rgba(239, 68, 68, 1)',
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [orders]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity Ordered'
        }
      },
      y: { 
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Amount ($)'
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Volume Analysis',
        font: { size: 16, weight: 'bold' }
      },
    }
  };

  return (
    <div className="p-4 w-full h-full flex flex-col bg-white">
      <div className="flex-1 relative mt-[10px]">
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ScatterChartWidget;
