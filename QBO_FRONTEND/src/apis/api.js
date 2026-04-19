const API_BASE = import.meta.env.VITE_BASE_API_URL

export async function fetchRentExpenses(realmId, account = "Rent Expense", startDate = "2024-01-01", endDate = "2024-03-31") {
  const encodedAccount = encodeURIComponent(account);
  const res = await fetch(
    `${API_BASE}/quickbooks/rent-expenses/${realmId}/${encodedAccount}/${startDate}/${endDate}`
  );
  return res.json();
}

export function getConnectUrl() {
  return `${API_BASE}/quickbooks/connect`;
}