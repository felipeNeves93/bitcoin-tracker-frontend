import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_HOST || 'http://localhost:8000',
})

interface BitcoinPriceResponse {
    id: number;
    price: number;
    timestamp: string;
}

interface BitcoinSummaryResponse {
    id: number;
    max_price: number;
    min_price: number;
    date: string;
}

export const getLatestPrice = () => api.get<BitcoinPriceResponse>('/bitcoin/prices/latest');
export const getDailySummary = (date: string) => api.get<BitcoinSummaryResponse>(`/bitcoin/prices/summary/${date}`);
export const getAllSummaries = () => api.get<BitcoinSummaryResponse[]>('/bitcoin/prices/summaries');