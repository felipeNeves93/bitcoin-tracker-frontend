// src/views/CurrentPrice.tsx
import { useEffect, useState } from 'react';
import CurrentPriceCard from '../components/CurrentPriceCard';
import SummaryCard from '../components/SummaryCard';
import PriceChart from '../components/PriceChart';
import { getLatestPrice, getDailySummary, getAllSummaries } from '../api';
import { BitcoinSummaryResponse } from '../types/BitcoinSummaryResponse';

function CurrentPrice() {
  const [priceData, setPriceData] = useState<{ id: number; price: number; timestamp: string } | null>(null);
  const [summaryData, setSummaryData] = useState<{ id: number; max_price: number; min_price: number; date: string } | null>(null);
  const [historyData, setHistoryData] = useState<BitcoinSummaryResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [historyError, setHistoryError] = useState<string | null>(null);

  // Fetch priceData and summaryData every 30 seconds
  const fetchData = async () => {
    setLoading(true);
    try {
      const [priceRes, summaryRes] = await Promise.all([
        getLatestPrice(),
        getDailySummary(
          new Date()
            .toISOString()
            .split('T')[0]
        ),
      ]);

      setPriceData(priceRes.data);
      setSummaryData(summaryRes.data);
      setError(null);
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error';
      setError(`Failed to fetch data: ${errorMsg}`);
      console.error('API Error:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch historyData once per day
  const fetchHistoryData = async () => {
    setHistoryLoading(true);
    try {
      const historyRes = await getAllSummaries();
      setHistoryData(historyRes.data);
      setHistoryError(null);
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || error.message || 'Unknown error';
      setHistoryError(`Failed to fetch history data: ${errorMsg}`);
      console.error('History API Error:', error.response || error);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Polling for priceData and summaryData (every 30 seconds)
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Polling for historyData (once per day)
  useEffect(() => {
    // Fetch immediately on mount
    fetchHistoryData();

    // Calculate milliseconds until next midnight (local time)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight
    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set timeout to fetch at midnight, then every 24 hours
    const timeout = setTimeout(() => {
      fetchHistoryData();
      // Start daily interval after first midnight fetch
      const dailyInterval = setInterval(fetchHistoryData, 24 * 60 * 60 * 1000); // 24 hours
      // Clear interval on cleanup
      return () => clearInterval(dailyInterval);
    }, msUntilMidnight);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 col-span-full text-center mb-4">{error}</p>}
      {historyError && <p className="text-red-500 col-span-full text-center mb-4">{historyError}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CurrentPriceCard priceData={priceData} loading={loading} />
        <SummaryCard summaryData={summaryData} loading={loading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PriceChart data={historyData} chartType="max" title="Max Price per Day" loading={historyLoading} />
        <PriceChart data={historyData} chartType="min" title="Min Price per Day" loading={historyLoading} />
        <PriceChart data={historyData} chartType="average" title="Average Price per Day" loading={historyLoading} />
      </div>
    </div>
  );
}

export default CurrentPrice;