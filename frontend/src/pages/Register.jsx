import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'CUSTOMER',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await registerUser(formData);
      login(response.data.token, response.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-6">Register</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          type="text" name="name" placeholder="Name"
          value={formData.name} onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="email" name="email" placeholder="Email"
          value={formData.email} onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white" required
        />

        <input
          type="password" name="password" placeholder="Password"
          value={formData.password} onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white" required
        />

        <select
          name="role" value={formData.role} onChange={handleChange}
          className="w-full mb-4 p-2 rounded bg-slate-700 text-white"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="AGENT">Agent</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        <p className="text-slate-400 mt-4 text-center">
          Have an account? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;