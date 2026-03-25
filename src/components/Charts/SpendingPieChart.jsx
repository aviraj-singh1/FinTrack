import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import '../Charts/Charts.css';

const COLORS = [
  '#7c3aed',
  '#2563eb',
  '#ec4899',
  '#f97316',
  '#22C55E',
  '#06b6d4',
  '#e11d48',
  '#8b5cf6',
];

const SpendingPieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3>Spending by Category</h3>
        <div className="chart-empty">No expense data available</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h3>Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPie>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            nameKey="name"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
            contentStyle={{
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '0.8rem' }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SpendingPieChart;
