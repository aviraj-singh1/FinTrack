import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MdEdit, MdDelete, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { formatCurrency } from '../../utils/currencyFormatter';
import './TransactionCard.css';

const TransactionCard = ({ transaction, onEdit, onDelete }) => {
  const { id, title, amount, category, type, date, recurring } = transaction;

  return (
    <motion.div
      className={`transaction-card${recurring ? ' recurring' : ''}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="txn-left">
        <div className={`txn-icon ${type}`}>
          {type === 'income' ? <MdTrendingUp /> : <MdTrendingDown />}
        </div>
        <div className="txn-info">
          <div className="txn-title-row">
            <h4>{title}</h4>
            {recurring && <span className="recurring-badge">Recurring</span>}
          </div>
          <div className="txn-meta">
            <span className="txn-category">
              {category?.toLowerCase() === 'income' ? 'Income' : (category || (type ? type.charAt(0).toUpperCase() + type.slice(1) : ''))}
            </span>
            <span className="txn-date">
              {format(new Date(date), 'MMM dd, yyyy')}
            </span>
          </div>
        </div>
      </div>
      <div className="txn-right">
        <span className={`txn-amount ${type}`}>
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </span>
        <div className="txn-actions">
          <button title="Edit" onClick={() => onEdit(transaction)}>
            <MdEdit />
          </button>
          <button
            title="Delete"
            className="delete"
            onClick={() => onDelete(id)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
