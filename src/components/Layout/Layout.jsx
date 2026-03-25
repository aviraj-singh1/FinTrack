import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
