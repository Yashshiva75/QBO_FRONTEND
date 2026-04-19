// Shows total rent amount and transaction count at the top of the dashboard

export default function SummaryCard({ total, count }) {
  const formatted = parseFloat(total).toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });

  return (
    <div className="border border-gray-100 rounded-xl p-6 mb-6 flex items-center justify-between bg-gray-50">
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          Total Rent
        </p>
        <p className="text-3xl font-semibold text-gray-900 tracking-tight">
          ${formatted}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
          Transactions
        </p>
        <p className="text-3xl font-semibold text-gray-900">{count}</p>
      </div>
    </div>
  );
}