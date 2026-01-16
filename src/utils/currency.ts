// Currency utility functions
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatUSD = (amount: number): string => {
  return formatCurrency(amount, 'USD');
};

// Default currency for the app
export const DEFAULT_CURRENCY = 'USD';
export const formatPrice = (amount: number): string => {
  return formatCurrency(amount, DEFAULT_CURRENCY);
};

