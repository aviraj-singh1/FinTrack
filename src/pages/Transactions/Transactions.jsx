import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAdd, MdReceiptLong } from 'react-icons/md';
import useTransactions from '../../hooks/useTransactions';
import useDebounce from '../../hooks/useDebounce';
import TransactionCard from '../../components/TransactionCard/TransactionCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import { toast } from 'react-toastify';
import './Transactions.css';

const Transactions = () => {
  const { transactions, deleteTransaction } = useTransactions();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    dateFrom: '',
    dateTo: '',
    sortOrder: 'newest',
  });

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search by title & notes
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    // Filter by type
    if (filters.type) {
      result = result.filter((t) => t.type === filters.type);
    }

    // Filter by date range
    if (filters.dateFrom) {
      result = result.filter((t) => new Date(t.date) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      result = result.filter((t) => new Date(t.date) <= new Date(filters.dateTo));
    }

    // Sort
    result.sort((a, b) => {
      if (filters.sortOrder === 'oldest') {
        const diff = new Date(a.date) - new Date(b.date);
        return diff !== 0 ? diff : transactions.indexOf(b) - transactions.indexOf(a);
      }
      if (filters.sortOrder === 'lowest') {
        const diff = a.amount - b.amount;
        return diff !== 0 ? diff : transactions.indexOf(b) - transactions.indexOf(a);
      }
      if (filters.sortOrder === 'highest') {
        const diff = b.amount - a.amount;
        return diff !== 0 ? diff : transactions.indexOf(a) - transactions.indexOf(b);
      }
      const diff = new Date(b.date) - new Date(a.date);
      return diff !== 0 ? diff : transactions.indexOf(a) - transactions.indexOf(b);
    });

    return result;
  }, [transactions, debouncedSearch, filters]);

  const handleEdit = (txn) => {
    navigate('/transactions/new', { state: { editTransaction: txn } });
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    toast.success('Transaction deleted');
  };

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>

      <div className="txn-controls">
        <div className="txn-controls-top">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <Link to="/transactions/new" className="add-txn-btn">
            <MdAdd /> Add Transaction
          </Link>
        </div>
        <Filters filters={filters} onChange={setFilters} />
      </div>

      <span className="txn-count">
        {filteredTransactions.length} transaction
        {filteredTransactions.length !== 1 ? 's' : ''}
      </span>

      {filteredTransactions.length > 0 ? (
        <div className="transactions-list">
          <AnimatePresence>
            {filteredTransactions.map((txn) => (
              <TransactionCard
                key={txn.id}
                transaction={txn}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          className="empty-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MdReceiptLong />
          <p>
            {debouncedSearch || filters.category || filters.type
              ? 'No transactions match your filters'
              : 'No transactions yet. Add your first one!'}
          </p>
          {!debouncedSearch && !filters.category && !filters.type && (
            <Link to="/transactions/new">Add Transaction</Link>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Transactions;
