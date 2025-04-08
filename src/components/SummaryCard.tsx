interface SummaryCardProps {
    summaryData: { id: number; max_price: number; min_price: number; date: string } | null;
    loading: boolean;
}

function SummaryCard({ summaryData, loading }: SummaryCardProps) {
    const variation = summaryData ? ((summaryData.max_price - summaryData.min_price) / summaryData.min_price * 100).toFixed(2) : 0;

     const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs)
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Summary ({summaryData?.date || 'Today'})</h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : summaryData ? (
                <div className="space-y-2">
                    <p>
                        <span className="font-medium">Max Price: </span>
                        <span className="text-green-600">${summaryData.max_price.toLocaleString()}</span>
                    </p>
                    <p>
                        <span className="font-medium">Min Price: </span>
                        <span className="text-green-600">${summaryData.min_price.toLocaleString()}</span>
                    </p>
                    <p>
                        <span className="font-medium">Variation: </span>
                        <span className={'text-green-600' }>{variation}%</span>
                    </p>
                    <p>
                        <span className="font-medium">Updated: </span>
                        <span className="text-sm  font-bold text-gray-600">{localDate}</span>
                    </p>
                </div>
            ) : (
                <p className="text-red-500">No Summary available</p>
            )}
        </div>
    );
}

export default SummaryCard;