import axios from "axios";
import { BitcoinPriceResponse } from "./types/BitcoinPriceResponse";
import { BitcoinSummaryResponse } from "./types/BitcoinSummaryResponse";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_HOST || 'http://localhost:8000',
})

export const getLatestPrice = () => api.get<BitcoinPriceResponse>('/bitcoin/prices/latest');
export const getDailySummary = (date: string) => api.get<BitcoinSummaryResponse>(`/bitcoin/prices/summary/${date}`);
export const getAllSummaries = () => api.get<BitcoinSummaryResponse[]>('/bitcoin/prices/summaries');