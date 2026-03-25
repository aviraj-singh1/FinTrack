import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/currencyFormatter';
import './BudgetCard.css';

const BudgetCard = ({ monthlyBudget, monthlyExpenses, remaining, percentageUsed }) => {
  const radius = 75;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentageUsed / 100) * circumference;

  const getColor = () => {
    if (percentageUsed >= 80) return '#ef4444';
    if (percentageUsed >= 50) return '#f59e0b';
    return '#22C55E';
  };

  return (
    <motion.div
      className="budget-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3>Monthly Budget Overview</h3>
      <div className="budget-progress-ring">
        <div className="progress-circle">
          <svg viewBox="0 0 170 170">
            <circle className="bg" cx="85" cy="85" r={radius} />
            <circle
              className="fill"
              cx="85"
              cy="85"
              r={radius}
              stroke={getColor()}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="progress-center">
            <div className="progress-percent">{Math.round(percentageUsed)}%</div>
            <div className="progress-label">used</div>
          </div>
        </div>

        <div className="budget-stats">
          <div className="budget-stat">
            <div className="budget-stat-label">Budget</div>
            <div className="budget-stat-value">{formatCurrency(monthlyBudget)}</div>
          </div>
          <div className="budget-stat">
            <div className="budget-stat-label">Spent</div>
            <div className="budget-stat-value danger">
              {formatCurrency(monthlyExpenses)}
            </div>
          </div>
          <div className="budget-stat">
            <div className="budget-stat-label">Remaining</div>
            <div className={`budget-stat-value ${remaining >= 0 ? 'success' : 'danger'}`}>
              {formatCurrency(Math.abs(remaining))}
              {remaining < 0 ? ' over' : ''}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetCard;
