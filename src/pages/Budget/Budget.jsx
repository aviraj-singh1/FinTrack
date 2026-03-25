import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useBudget from '../../hooks/useBudget';
import BudgetCard from '../../components/BudgetCard/BudgetCard';
import './Budget.css';

const Budget = () => {
  const { budget, updateBudget, monthlyExpenses, remaining, percentageUsed } =
    useBudget();
  const [inputValue, setInputValue] = useState(budget.monthlyBudget || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(inputValue);
    if (isNaN(val) || val < 0) {
      toast.error('Please enter a valid budget amount');
      return;
    }
    updateBudget(val);
    toast.success('Budget updated successfully');
  };

  return (
    <motion.div
      className="budget-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Budget</h2>

      <div className="budget-form-card">
        <h3>Set Monthly Budget</h3>
        <form className="budget-input-row" onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.01"
            min="0"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter monthly budget..."
          />
          <button type="submit">Update Budget</button>
        </form>
      </div>

      <BudgetCard
        monthlyBudget={budget.monthlyBudget}
        monthlyExpenses={monthlyExpenses}
        remaining={remaining}
        percentageUsed={percentageUsed}
      />
    </motion.div>
  );
};

export default Budget;
