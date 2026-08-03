import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { getDashboardStats } from '../services/reportService';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data))
      .catch(() => setError('Failed to load stats'));
  }, []);

  if (error) return <p className="text-red-400">{error}</p>;
  if (!stats) return <p className="text-slate-300">Loading...</p>;

  const policyData = {
    labels: ['Active', 'Expired', 'Cancelled'],
    datasets: [{
      data: [stats.activePolicies, stats.expiredPolicies, stats.cancelledPolicies],
      backgroundColor: ['#22c55e', '#eab308', '#ef4444'],
    }],
  };

  const claimData = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{
      label: 'Claims',
      data: [stats.pendingClaims, stats.approvedClaims, stats.rejectedClaims],
      backgroundColor: '#3b82f6',
    }],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">Total Customers</p>
          <p className="text-2xl font-bold text-white">{stats.totalCustomers}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">Active Policies</p>
          <p className="text-2xl font-bold text-white">{stats.activePolicies}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">Pending Claims</p>
          <p className="text-2xl font-bold text-white">{stats.pendingClaims}</p>
        </div>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">Premium Collected</p>
          <p className="text-2xl font-bold text-white">₹{stats.totalPremiumCollected}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-white font-semibold mb-4">Policies by Status</h2>
          <Pie data={policyData} />
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-white font-semibold mb-4">Claims by Status</h2>
          <Bar data={claimData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;