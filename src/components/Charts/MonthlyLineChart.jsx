import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import '../Charts/Charts.css';

const MonthlyLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3>Monthly Spending Trend</h3>
        <div className="chart-empty">No spending data available</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3>Monthly Spending Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLine data={data}>
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
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spending']}
            contentStyle={{
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <Line
            type="monotone"
            dataKey="spending"
            stroke="#8b5cf6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#8b5cf6' }}
            activeDot={{ r: 6 }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default MonthlyLineChart;
