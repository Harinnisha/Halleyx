import React, { useMemo } from 'react';
import { useStore } from '../store/store';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartWidget = () => {
  const { orders } = useStore();

  const chartData = useMemo(() => {
    // Count orders by status
    const statusCounts = {};
    orders.forEach(order => {
      const status = order.status || 'Unknown';
      if (statusCounts[status]) {
        statusCounts[status] += 1;
      } else {
        statusCounts[status] = 1;
      }
    });

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);

    return {
      labels: labels.length ? labels : ['No Data'],
      datasets: [
        {
          data: data.length ? data : [1],
          backgroundColor: [
            'rgba(34, 197, 94, 0.7)',  // green-500
            'rgba(234, 179, 8, 0.7)',  // yellow-500
            'rgba(239, 68, 68, 0.7)',  // red-500
            'rgba(59, 130, 246, 0.7)'  // blue-500
          ],
          borderColor: [
            'rgba(34, 197, 94, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(59, 130, 246, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [orders]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      title: {
        display: true,
        text: 'Order Status',
        font: { size: 16, weight: 'bold' }
      },
    },
  };

  return (
    <div className="p-4 w-full h-full flex flex-col items-center justify-center bg-white">
      <div className="w-full h-full relative p-2">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChartWidget;
