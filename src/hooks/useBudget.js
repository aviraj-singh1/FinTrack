import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const useBudget = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useBudget must be used within a FinanceProvider');
  }
  const { budget, updateBudget, transactions } = context;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = transactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === 'expense' &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = budget.monthlyBudget - monthlyExpenses;
  const percentageUsed =
    budget.monthlyBudget > 0
      ? Math.min((monthlyExpenses / budget.monthlyBudget) * 100, 100)
      : 0;

  return {
    budget,
    updateBudget,
    monthlyExpenses,
    remaining,
    percentageUsed,
  };
};

export default useBudget;
