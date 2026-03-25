import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import '../Charts/Charts.css';

const IncomeExpenseBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3>Income vs Expenses</h3>
        <div className="chart-empty">No data available</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <h3>Income vs Expenses</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBar data={data} barGap={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickFormatter={(v) => `$${v}`}
          />
          <Tooltip
            formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
            contentStyle={{
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8rem' }} />
          <Bar dataKey="income" fill="#22C55E" radius={[6, 6, 0, 0]} barSize={28} />
          <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={28} />
        </RechartsBar>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default IncomeExpenseBarChart;
