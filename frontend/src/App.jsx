import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CustomerForm from './pages/CustomerForm';
import Policies from './pages/Policies';
import PolicyForm from './pages/PolicyForm';
import Premiums from './pages/Premiums';
import Claims from './pages/Claims';
import Documents from './pages/Documents';
import CustomerHistory from './pages/CustomerHistory';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/new" element={<CustomerForm />} />
        <Route path="/customers/:id/edit" element={<CustomerForm />} />
        <Route path="/policies" element={<Policies />} />
<Route path="/policies/new" element={<PolicyForm />} />
<Route path="/premiums" element={<Premiums />} />
<Route path="/claims" element={<Claims />} />
<Route path="/documents" element={<Documents />} />
<Route path="/customers/:id/history" element={<CustomerHistory />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;