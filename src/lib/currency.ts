// Simple currency helper for displaying product prices in INR.
// Assumption: product prices in mock data are in USD; we convert to INR with a fixed rate.
// If you prefer raw values without conversion, set USD_TO_INR = 1.

export const USD_TO_INR = 83; // Assumed conversion rate (1 USD = 83 INR). Update as needed.

export function formatPriceINRFromUSD(usd: number) {
  const inr = Math.round((usd || 0) * USD_TO_INR);
  return inr.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
}
