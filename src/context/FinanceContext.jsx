import { createContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const FinanceContext = createContext();

const STORAGE_KEY_TXN = 'fintrack_transactions';
const STORAGE_KEY_BUDGET = 'fintrack_budget';

const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() =>
    loadFromStorage(STORAGE_KEY_TXN, [])
  );
  const [budget, setBudget] = useState(() =>
    loadFromStorage(STORAGE_KEY_BUDGET, { monthlyBudget: 0 })
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TXN, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BUDGET, JSON.stringify(budget));
  }, [budget]);

  const addTransaction = useCallback((data) => {
    const newTransaction = {
      ...data,
      id: uuidv4(),
      amount: parseFloat(data.amount),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransaction = useCallback((id, data) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...data, amount: parseFloat(data.amount) } : t
      )
    );
  }, []);

  const updateBudget = useCallback((monthlyBudget) => {
    setBudget({ monthlyBudget: parseFloat(monthlyBudget) });
  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        budget,
        updateBudget,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
