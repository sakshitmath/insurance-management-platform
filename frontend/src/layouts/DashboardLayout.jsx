import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function DashboardLayout() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Customers', path: '/customers' },
    { name: 'Policies', path: '/policies' },
    { name: 'Premiums', path: '/premiums' },
    { name: 'Claims', path: '/claims' },
    { name: 'Documents', path: '/documents' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="w-64 bg-slate-800 p-6 flex flex-col">
        <h2 className="text-xl font-bold text-white mb-8">Insurance Platform</h2>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-slate-700 pt-4">
          <p className="text-slate-400 text-sm mb-2">Role: {role}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;