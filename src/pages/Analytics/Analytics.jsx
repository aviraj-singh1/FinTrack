import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useTransactions from '../../hooks/useTransactions';
import SpendingPieChart from '../../components/Charts/SpendingPieChart';
import MonthlyLineChart from '../../components/Charts/MonthlyLineChart';
import IncomeExpenseBarChart from '../../components/Charts/IncomeExpenseBarChart';
import { formatCurrency } from '../../utils/currencyFormatter';
import { format } from 'date-fns';
import './Analytics.css';

const Analytics = () => {
  const { transactions } = useTransactions();

  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    const categoryTotals = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      });
    const topCategory =
      Object.keys(categoryTotals).length > 0
        ? Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0]
        : 'N/A';

    return { totalIncome, totalExpenses, netBalance, topCategory };
  }, [transactions]);

  // Pie chart data: spending by category
  const pieData = useMemo(() => {
    const categoryMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });
    return Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  // Line chart data: monthly spending trend
  const lineData = useMemo(() => {
    const monthMap = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const key = format(new Date(t.date), 'MMM yyyy');
        monthMap[key] = (monthMap[key] || 0) + t.amount;
      });
    return Object.entries(monthMap)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([month, spending]) => ({ month, spending }));
  }, [transactions]);

  // Bar chart data: income vs expense by month
  const barData = useMemo(() => {
    const monthMap = {};
    transactions.forEach((t) => {
      const key = format(new Date(t.date), 'MMM yyyy');
      if (!monthMap[key]) monthMap[key] = { month: key, income: 0, expense: 0 };
      monthMap[key][t.type] += t.amount;
    });
    return Object.values(monthMap).sort(
      (a, b) => new Date(a.month) - new Date(b.month)
    );
  }, [transactions]);

  const summaryItems = [
    { label: 'Total Income', value: formatCurrency(stats.totalIncome), cls: 'income' },
    { label: 'Total Expenses', value: formatCurrency(stats.totalExpenses), cls: 'expense' },
    { label: 'Net Balance', value: formatCurrency(stats.netBalance), cls: '' },
    { label: 'Top Category', value: stats.topCategory, cls: '' },
  ];

  return (
    <div className="analytics-page">
      <h2>Analytics</h2>

      <div className="analytics-summary">
        {summaryItems.map((item, i) => (
          <motion.div
            key={item.label}
            className="analytics-stat"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="analytics-stat-label">{item.label}</div>
            <div className={`analytics-stat-value ${item.cls}`}>{item.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <SpendingPieChart data={pieData} />
        <MonthlyLineChart data={lineData} />
        <IncomeExpenseBarChart data={barData} />
      </div>
    </div>
  );
};

export default Analytics;
