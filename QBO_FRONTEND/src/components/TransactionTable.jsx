// Renders the list of rent expense transactions with a total footer row

function formatDate(raw) {
  return new Date(raw).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

function formatAmount(amount) {
  return parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 });
}

export default function TransactionTable({ transactions, total }) {
  if (transactions?.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-gray-400">
          No rent expense transactions found for Q1 2024.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-12 px-5 py-3 bg-gray-50 border-b border-gray-100">
        <span className="col-span-3 text-xs text-gray-400 uppercase tracking-widest">
          Date
        </span>
        <span className="col-span-6 text-xs text-gray-400 uppercase tracking-widest">
          Description
        </span>
        <span className="col-span-3 text-xs text-gray-400 uppercase tracking-widest text-right">
          Amount
        </span>
      </div>

      {/* Rows */}
      {transactions.map((txn, i) => (
        <div
          key={i}
          className="grid grid-cols-12 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
        >
          <span className="col-span-3 text-sm text-gray-500 font-mono">
            {formatDate(txn.transactionDate)}
          </span>
          <span className="col-span-6 text-sm text-gray-700 truncate pr-4">
            {txn.description}
          </span>
          <span className="col-span-3 text-sm text-gray-900 font-medium text-right tabular-nums">
            ${formatAmount(txn.amount)}
          </span>
        </div>
      ))}

      {/* Footer total */}
      <div className="grid grid-cols-12 px-5 py-4 bg-gray-50 border-t border-gray-100">
        <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">
          Total
        </span>
        <span className="col-span-6" />
        <span className="col-span-3 text-sm font-semibold text-gray-900 text-right tabular-nums">
          ${formatAmount(total)}
        </span>
      </div>
    </div>
  );
}