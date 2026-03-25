import { useState, useEffect, useCallback } from 'react';
import { fetchExchangeRates } from '../services/api';

const useCurrency = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const loadRates = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates(baseCurrency);
        if (!cancelled) {
          setRates(data.rates || {});
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch exchange rates');
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadRates();
    return () => { cancelled = true; };
  }, [baseCurrency]);

  const convert = useCallback(
    (amount, targetCurrency) => {
      if (!rates[targetCurrency]) return amount;
      return amount * rates[targetCurrency];
    },
    [rates]
  );

  return { rates, loading, error, convert };
};

export default useCurrency;
