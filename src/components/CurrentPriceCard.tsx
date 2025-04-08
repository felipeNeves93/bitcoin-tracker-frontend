interface CurrentPriceCardProps {
    priceData: { id: number; price: number; timestamp: string } | null;
    loading: boolean;
  }
  
  function CurrentPriceCard({ priceData, loading }: CurrentPriceCardProps) {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(now.getTime() - offsetMs)
    .toISOString()
    .split('.')[0]
    .replace('T', ' ');
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Bitcoin Price</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : priceData ? (
          <div>
            <p className="text-3xl font-bold text-green-600">${priceData.price.toLocaleString()}</p>
            <p className="text-sm font-bold text-gray-600">Updated: {localDate}</p>
          </div>
        ) : (
          <p className="text-red-500">No data available</p>
        )}
      </div>
    );
  }
  
  export default CurrentPriceCard;