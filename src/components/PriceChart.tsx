// src/components/PriceChart.tsx
import { Line } from 'react-chartjs-2';
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
import { BitcoinSummaryResponse } from '../types/BitcoinSummaryResponse';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PriceChartProps {
  data: BitcoinSummaryResponse[];
  chartType: 'max' | 'min' | 'average';
  title: string;
  loading: boolean;
}

function PriceChart({ data, chartType, title, loading }: PriceChartProps) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center h-64">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  // Prepare chart data
  const sortedData = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const labels = sortedData.map((item) => item.date);
  const prices = sortedData.map((item) => {
    if (chartType === 'max') return item.max_price;
    if (chartType === 'min') return item.min_price;
    return (item.max_price + item.min_price) / 2;
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: prices,
        borderColor: chartType === 'max' ? 'rgba(75, 192, 192, 1)' : chartType === 'min' ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
        backgroundColor: chartType === 'max' ? 'rgba(75, 192, 192, 0.2)' : chartType === 'min' ? 'rgba(255, 99, 132, 0.2)' : 'rgba(54, 162, 235, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;