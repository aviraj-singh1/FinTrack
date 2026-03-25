import { EXPENSE_CATEGORIES } from '../../data/categories';
import './Filters.css';

const Filters = ({ filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onChange({
      category: '',
      type: '',
      dateFrom: '',
      dateTo: '',
      sortOrder: 'newest',
    });
  };

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {EXPENSE_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Type</label>
        <select
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="filter-group">
        <label>From</label>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleChange('dateFrom', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>To</label>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleChange('dateTo', e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Order</label>
        <select
          value={filters.sortOrder}
          onChange={(e) => handleChange('sortOrder', e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>

      <button className="clear-filters-btn" onClick={clearFilters}>
        Clear
      </button>
    </div>
  );
};

export default Filters;
