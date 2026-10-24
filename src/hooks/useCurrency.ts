import { useState, useEffect } from 'react';

interface CurrencyApiResponse {
  date: string;
  [key: string]: Record<string, number> | string; 
}

const useCurrency = (currency: string) => {
  const [currencies, setCurrencies] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!currency) return;

    const fetchCurrencies = async () => {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CurrencyApiResponse = await response.json();
        
        const rates = data[currency.toLowerCase()] as Record<string, number>;
        
        if (rates) {
          setCurrencies(rates);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching currency data:", error.message);
        }
      }
    };

    fetchCurrencies();
  }, [currency]);

  return currencies;
};

export default useCurrency;
