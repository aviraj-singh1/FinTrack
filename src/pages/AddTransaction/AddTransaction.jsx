import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import useTransactions from '../../hooks/useTransactions';
import { EXPENSE_CATEGORIES } from '../../data/categories';
import { format } from 'date-fns';
import './AddTransaction.css';

const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(100, 'Max 100 characters'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().when('type', {
    is: 'expense',
    then: (s) => s.required('Category is required for expenses'),
    otherwise: (s) => s.notRequired(),
  }),
  type: yup.string().oneOf(['income', 'expense']).required('Type is required'),
  date: yup.string().required('Date is required'),
  notes: yup.string().max(500, 'Max 500 characters'),
  recurring: yup.boolean(),
});

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction, updateTransaction } = useTransactions();

  const editTxn = location.state?.editTransaction || null;
  const isEditing = !!editTxn;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: format(new Date(), 'yyyy-MM-dd'),
      notes: '',
      recurring: false,
    },
  });

  useEffect(() => {
    if (editTxn) {
      reset({
        title: editTxn.title,
        amount: editTxn.amount,
        category: editTxn.category || '',
        type: editTxn.type,
        date: editTxn.date
          ? format(new Date(editTxn.date), 'yyyy-MM-dd')
          : format(new Date(), 'yyyy-MM-dd'),
        notes: editTxn.notes || '',
        recurring: editTxn.recurring || false,
      });
    }
  }, [editTxn, reset]);

  const selectedType = watch('type');
  const isRecurring = watch('recurring');

  const onSubmit = (data) => {
    try {
      if (isEditing) {
        updateTransaction(editTxn.id, data);
        toast.success('Transaction updated successfully');
      } else {
        addTransaction(data);
        toast.success('Transaction added successfully');
      }
      navigate('/transactions');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <motion.div
      className="add-transaction-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2>{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>

      <form className="txn-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Transaction Type</label>
          <div className="type-toggle">
            <button
              type="button"
              className={selectedType === 'income' ? 'active-income' : ''}
              onClick={() => setValue('type', 'income')}
            >
              Income
            </button>
            <button
              type="button"
              className={selectedType === 'expense' ? 'active-expense' : ''}
              onClick={() => setValue('type', 'expense')}
            >
              Expense
            </button>
          </div>
          <input type="hidden" {...register('type')} />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input id="title" {...register('title')} placeholder="e.g. Grocery Shopping" />
          {errors.title && <span className="form-error">{errors.title.message}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount')}
              placeholder="0.00"
            />
            {errors.amount && (
              <span className="form-error">{errors.amount.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input id="date" type="date" {...register('date')} />
            {errors.date && <span className="form-error">{errors.date.message}</span>}
          </div>
        </div>

        {selectedType === 'expense' && (
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" {...register('category')}>
              <option value="">Select a category</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">{errors.category.message}</span>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            {...register('notes')}
            placeholder="Add any additional notes..."
          />
          {errors.notes && <span className="form-error">{errors.notes.message}</span>}
        </div>

        <div className="recurring-toggle">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setValue('recurring', e.target.checked)}
            />
            <span className="toggle-slider" />
          </label>
          <label onClick={() => setValue('recurring', !isRecurring)}>
            Recurring transaction
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            {isEditing ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddTransaction;
