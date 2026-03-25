import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalance,
  MdCategory,
  MdReceiptLong,
} from 'react-icons/md';
import useTransactions from '../../hooks/useTransactions';
import useCurrency from '../../hooks/useCurrency';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import { formatCurrency } from '../../utils/currencyFormatter';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const { rates, loading: ratesLoading } = useCurrency();
  const navigate = useNavigate();

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

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const handleEdit = (txn) => {
    navigate('/transactions/new', { state: { editTransaction: txn } });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  const summaryCards = [
    {
      label: 'Total Income',
      value: formatCurrency(stats.totalIncome),
      icon: <MdTrendingUp />,
      iconClass: 'income',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(stats.totalExpenses),
      icon: <MdTrendingDown />,
      iconClass: 'expense',
    },
    {
      label: 'Net Balance',
      value: formatCurrency(stats.netBalance),
      icon: <MdAccountBalance />,
      iconClass: 'balance',
    },
    {
      label: 'Top Category',
      value: stats.topCategory,
      icon: <MdCategory />,
      iconClass: 'category',
      isSmall: true,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>Your financial overview at a glance</p>
        </div>
      </div>

      <div className="summary-cards">
        {summaryCards.map((card, i) => (
          <motion.div
            className="summary-card"
            key={card.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="summary-card-header">
              <span className="summary-card-label">{card.label}</span>
              <div className={`summary-card-icon ${card.iconClass}`}>
                {card.icon}
              </div>
            </div>
            <span className={`summary-card-value${card.isSmall ? ' small' : ''} ${card.iconClass}`}>
              {card.value}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="recent-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="recent-header">
          <h3>Recent Transactions</h3>
          <Link to="/transactions">View All</Link>
        </div>
        {recentTransactions.length > 0 ? (
          <div className="recent-list">
            {recentTransactions.map((txn) => (
              <TransactionCard
                key={txn.id}
                transaction={txn}
                onEdit={handleEdit}
                onDelete={deleteTransaction}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <MdReceiptLong />
            <p>No transactions yet. Start tracking your finances!</p>
            <Link to="/transactions/new">Add Transaction</Link>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
