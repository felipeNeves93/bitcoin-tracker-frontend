// src/views/CurrentPrice.tsx
import { useEffect, useState } from 'react';
import CurrentPriceCard from '../components/CurrentPriceCard';
import SummaryCard from '../components/SummaryCard';
import { getLatestPrice, getDailySummary } from '../api';

function CurrentPrice() {
  const [priceData, setPriceData] = useState<{ id: number; price: number; timestamp: string } | null>(null);
  const [summaryData, setSummaryData] = useState<{ id: number; max_price: number; min_price: number; date: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true); // Keep loading true until data is ready
    try {
      const priceRes = await getLatestPrice();
      setPriceData(priceRes.data);

      const now = new Date();
      const offsetMs = now.getTimezoneOffset() * 60 * 1000;
      const localDate = new Date(now.getTime() - offsetMs)
      .toISOString()
      .split('T')[0];

      const summaryRes = await getDailySummary(localDate);
      setSummaryData(summaryRes.data);

      setError(null);
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error';
      setError(`Failed to fetch data: ${errorMsg}`);
      console.error('API Error:', error.response || error);
    } finally {
      setLoading(false); // Only set false after all state updates
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {error && <p className="text-red-500 col-span-full text-center">{error}</p>}
      <CurrentPriceCard priceData={priceData} loading={loading} />
      <SummaryCard summaryData={summaryData} loading={loading} />
    </div>
  );
}

export default CurrentPrice;