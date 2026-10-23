import {useState, useEffect} from 'react';

const useCurrency = (currency) => {
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`);
        const data = await response.json();
        setCurrencies(data[currency]);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
    
  }, [currency]);

  return currencies;
};

export default useCurrency