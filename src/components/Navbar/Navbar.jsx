import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdReceipt,
  MdAddCircle,
  MdAccountBalanceWallet,
  MdBarChart,
} from 'react-icons/md';
import logo from '../../assets/final-logo.png';
import './Navbar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <MdDashboard /> },
  { path: '/transactions', label: 'Transactions', icon: <MdReceipt /> },
  { path: '/transactions/new', label: 'Add New', icon: <MdAddCircle /> },
  { path: '/budget', label: 'Budget', icon: <MdAccountBalanceWallet /> },
  { path: '/analytics', label: 'Analytics', icon: <MdBarChart /> },
];

const Navbar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="navbar">
        <NavLink to="/dashboard" className="navbar-brand">
          <img src={logo} alt="FinTrack" className="navbar-logo-img" />
          <h1>FinTrack</h1>
        </NavLink>
        <ul className="navbar-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/transactions'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Top Header */}
      <div className="mobile-header">
        <div className="mobile-brand">
          <img src={logo} alt="FinTrack" className="mobile-logo" />
          <h1>FinTrack</h1>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-bottom-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/transactions'}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
