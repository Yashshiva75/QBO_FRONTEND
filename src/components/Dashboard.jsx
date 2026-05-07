import { useState, useEffect, useCallback } from "react";
import Logo from "./ui/Logo";
import Spinner from "./ui/Spinner";
import SummaryCard from "./SummaryCard";
import TransactionTable from "./TransactionTable";
import { fetchRentExpenses } from "../apis/api";
import toast from "react-hot-toast";

const QBO_ACCOUNTS = [
  {
    group: "Income",
    accounts: [
      "Sales",
      "Services",
      "Product Income",
      "Discounts Given",
      "Other Primary Income",
      "Unapplied Cash Payment Income",
    ],
  },
  {
    group: "Cost of Goods Sold",
    accounts: [
      "Cost of Goods Sold",
      "Equipment Rental",
      "Other Costs of Service - COS",
      "Shipping, Freight & Delivery - COS",
      "Subcontractors - COS",
      "Supplies & Materials - COGS",
    ],
  },
  {
    group: "Expenses",
    accounts: [
      "Advertising & Marketing",
      "Auto",
      "Bad Debts",
      "Bank Charges & Fees",
      "Charitable Contributions",
      "Commissions & Fees",
      "Cost of Labor",
      "Dues & Subscriptions",
      "Entertainment",
      "Entertainment Meals",
      "Equipment Rental",
      "Finance Costs",
      "Global Tax Expense",
      "Income Tax Expense",
      "Insurance",
      "Interest Paid",
      "Janitorial Expense",
      "Legal & Professional Services",
      "Licenses & Permits",
      "Management Fees",
      "Meals & Entertainment",
      "Office Expenses",
      "Office Supplies & Software",
      "Other Business Expenses",
      "Other Miscellaneous Service Cost",
      "Payroll Expenses",
      "Penalties & Settlements",
      "Postage & Delivery",
      "Printing & Reproduction",
      "Professional Development",
      "Promotional Meals",
      "Rent Expense",
      "Rent or Lease of Buildings",
      "Repair & Maintenance",
      "Shipping, Freight & Delivery",
      "Stationery & Printing",
      "Supplies",
      "Taxes & Licenses",
      "Travel",
      "Travel Meals",
      "Unapplied Cash Bill Payment Expense",
      "Utilities",
      "Vehicle",
      "Vehicle Insurance",
      "Vehicle Registration",
      "Vehicle Repairs",
    ],
  },
  {
    group: "Other Income",
    accounts: [
      "Dividend Income",
      "Interest Earned",
      "Other Investment Income",
      "Other Miscellaneous Income",
      "Tax-Exempt Interest",
    ],
  },
  {
    group: "Other Expense",
    accounts: [
      "Amortization",
      "Depreciation",
      "Exchange Gain or Loss",
      "Gas And Fuel",
      "Home Office",
      "Homeowner Rental Insurance",
      "Mortgage Interest Home Office",
      "Other Home Office Expenses",
      "Other Miscellaneous Expense",
      "Parking and Tolls",
      "Penalties & Settlements",
      "Wash and Road Services",
    ],
  },
  {
    group: "Assets — Bank",
    accounts: [
      "Checking",
      "Money Market",
      "Petty Cash",
      "Savings",
      "Trust Accounts",
    ],
  },
  {
    group: "Assets — Accounts Receivable",
    accounts: [
      "Accounts Receivable (A/R)",
    ],
  },
  {
    group: "Assets — Current",
    accounts: [
      "Employee Cash Advances",
      "Inventory Asset",
      "Investment — Mortgage/Real Estate Loans",
      "Investment — Tax-Exempt Securities",
      "Investment — U.S. Government Obligations",
      "Investments",
      "Loans To Officers",
      "Loans to Others",
      "Loans to Stockholders",
      "Notes Receivable",
      "Other Current Assets",
      "Prepaid Expenses",
      "Retainage",
      "Undeposited Funds",
    ],
  },
  {
    group: "Assets — Fixed",
    accounts: [
      "Accumulated Depletion",
      "Accumulated Depreciation",
      "Buildings",
      "Depletable Assets",
      "Equipment",
      "Furniture & Fixtures",
      "Intangible Assets",
      "Land",
      "Leasehold Improvements",
      "Machinery & Equipment",
      "Other Fixed Assets",
      "Vehicles",
    ],
  },
  {
    group: "Assets — Other",
    accounts: [
      "Accumulated Amortization of Other Assets",
      "Goodwill",
      "Lease Buyout",
      "Licenses",
      "Organizational Costs",
      "Other Long-Term Assets",
      "Security Deposits",
    ],
  },
  {
    group: "Liabilities — Accounts Payable",
    accounts: [
      "Accounts Payable (A/P)",
    ],
  },
  {
    group: "Liabilities — Credit Card",
    accounts: [
      "Credit Card",
    ],
  },
  {
    group: "Liabilities — Current",
    accounts: [
      "Deferred Revenue",
      "Federal Income Tax Payable",
      "Insurance Payable",
      "Line of Credit",
      "Loan Payable",
      "Other Current Liabilities",
      "Payroll Clearing",
      "Payroll Tax Payable",
      "Prepaid Expenses Payable",
      "Rents in Trust",
      "Sales Tax Payable",
      "State Income Tax Payable",
      "Trust Accounts — Liabilities",
    ],
  },
  {
    group: "Liabilities — Long-Term",
    accounts: [
      "Notes Payable",
      "Other Long-Term Liabilities",
      "Shareholder Notes Payable",
    ],
  },
  {
    group: "Equity",
    accounts: [
      "Accumulated Adjustment",
      "Common Stock",
      "Estimated Taxes",
      "Healthcare",
      "Opening Balance Equity",
      "Owner's Equity",
      "Paid-in Capital or Surplus",
      "Partner Contributions",
      "Partner Distributions",
      "Partner's Equity",
      "Personal Expense",
      "Personal Income",
      "Preferred Stock",
      "Retained Earnings",
      "Treasury Stock",
    ],
  },
];

export default function Dashboard({ realmId, onDisconnect }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [account, setAccount] = useState("Rent Expense");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-03-31");

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchRentExpenses(realmId, account, startDate, endDate);
      if (result && result.success) {
        setData(result.data);
        toast.success(`Fetched ${result.data.transactions?.length} transactions`, { id: "fetch-toast" });
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to sync", { id: "fetch-toast" });
    } finally {
      setLoading(false);
    }
  }, [realmId, account, startDate, endDate]);

  useEffect(() => {
    loadTransactions();
  }, []);

  function handleApply() {
    loadTransactions();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Logo size="sm" />
            <span className="text-sm font-semibold text-gray-900">Ledger
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima laudantium dolor sequi exercitationem eveniet id nemo rerum quasi error. Consequuntur ipsum, soluta dolores quaerat hic ducimus deserunt quidem eligendi dignissimos.
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded truncate max-w-[120px] sm:max-w-none">
              {realmId}
            </span>
            <button
              onClick={onDisconnect}
              className="text-xs text-gray-400 hover:text-gray-700 transition-colors whitespace-nowrap"
            >
              Disconnectasdfasdf
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Page title */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 tracking-tight">
            Expense Ledger
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Filter by account and date range
          </p>
        </div>

        {/* Filters */}
        <div className="border border-gray-100 rounded-xl p-4 sm:p-5 bg-gray-50 mb-6">
          <div className="flex flex-wrap gap-3">
            {/* Account select — full width on mobile */}
            <div className="w-full sm:flex-1 sm:min-w-[160px]">
  <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">
    Account
  </label>
  <select
    value={account}
    onChange={(e) => setAccount(e.target.value)}
    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
  >
    {QBO_ACCOUNTS.map(({ group, accounts }) => (
      <optgroup key={group} label={group}>
        {accounts.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </optgroup>
    ))}
  </select>
</div>

            {/* Date row */}
            <div className="flex gap-3 w-full sm:w-auto sm:flex-1">
              <div className="flex-1 sm:min-w-[120px]">
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">
                  From
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>

              <div className="flex-1 sm:min-w-[120px]">
                <label className="block text-xs text-gray-400 uppercase tracking-widest mb-1.5">
                  To
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:border-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* Apply */}
            <div className="w-full sm:w-auto sm:self-end">
              <button
                onClick={handleApply}
                disabled={loading}
                className="w-full sm:w-auto bg-black text-white text-sm font-medium py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "..." : "Apply"}
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-3 py-16 justify-center">
            <Spinner />
            <span className="text-sm text-gray-400">Fetching transactions…</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="border border-red-100 bg-red-50 rounded-lg px-4 py-3 flex items-start gap-3">
            <span className="text-red-400 text-xs mt-0.5">!</span>
            <div>
              <p className="text-sm text-red-600 font-medium">Failed to load</p>
              <p className="text-xs text-red-400 mt-0.5">{error}</p>
              <button onClick={loadTransactions} className="text-xs text-red-500 underline mt-2">
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Data */}
        {!loading && !error && data && (
          <>
            <SummaryCard total={data.total} count={data?.transactions?.length} />
            <TransactionTable transactions={data?.transactions} total={data?.total} />
            <p className="text-xs text-gray-300 text-center mt-6">
              Currency: {data.currency} · Data from QuickBooks sandbox
            </p>
          </>
        )}
      </main>
    </div>
  );
}