import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import PlaceholderPage from './pages/PlaceholderPage';
import { useAppSelector } from './hooks/redux';

function RoleRedirect() {
  const { user } = useAppSelector((state) => state.auth);
  const map: Record<string, string> = {
    ADMIN: '/admin/dashboard',
    DOCTOR: '/doctor/dashboard',
    NURSE: '/nurse/dashboard',
    RECEPTIONIST: '/receptionist/dashboard',
    PHARMACIST: '/pharmacist/dashboard',
    LAB_TECHNICIAN: '/lab/dashboard',
  };
  return <Navigate to={user ? map[user.role] || '/login' : '/login'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/" element={<RoleRedirect />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Admin */}
          <Route path="/admin/dashboard" element={<DashboardPage title="Admin Dashboard" />} />
          <Route path="/admin/users" element={<PlaceholderPage title="User Management" />} />
          <Route path="/admin/doctors" element={<PlaceholderPage title="Doctor Management" />} />
          <Route path="/admin/patients" element={<PlaceholderPage title="Patient Management" />} />
          <Route path="/admin/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/admin/inventory" element={<PlaceholderPage title="Inventory" />} />
          <Route path="/admin/settings" element={<PlaceholderPage title="Settings" />} />

          {/* Doctor */}
          <Route path="/doctor/dashboard" element={<DashboardPage title="Doctor Dashboard" />} />
          <Route path="/doctor/appointments" element={<PlaceholderPage title="Appointments" />} />
          <Route path="/doctor/patients" element={<PlaceholderPage title="Patients" />} />
          <Route path="/doctor/medical-records" element={<PlaceholderPage title="Medical Records" />} />
          <Route path="/doctor/prescriptions" element={<PlaceholderPage title="Prescriptions" />} />
          <Route path="/doctor/lab-results" element={<PlaceholderPage title="Lab Results" />} />

          {/* Receptionist */}
          <Route path="/receptionist/dashboard" element={<DashboardPage title="Receptionist Dashboard" />} />
          <Route path="/receptionist/patients" element={<PlaceholderPage title="Patients" />} />
          <Route path="/receptionist/appointments" element={<PlaceholderPage title="Appointments" />} />
          <Route path="/receptionist/billing" element={<PlaceholderPage title="Billing" />} />

          {/* Pharmacist */}
          <Route path="/pharmacist/dashboard" element={<DashboardPage title="Pharmacy Dashboard" />} />
          <Route path="/pharmacist/medicines" element={<PlaceholderPage title="Medicines" />} />
          <Route path="/pharmacist/prescriptions" element={<PlaceholderPage title="Prescriptions" />} />
          <Route path="/pharmacist/inventory" element={<PlaceholderPage title="Inventory" />} />

          {/* Lab Technician */}
          <Route path="/lab/dashboard" element={<DashboardPage title="Lab Dashboard" />} />
          <Route path="/lab/requests" element={<PlaceholderPage title="Lab Requests" />} />
          <Route path="/lab/results" element={<PlaceholderPage title="Lab Results" />} />

          {/* Nurse */}
          <Route path="/nurse/dashboard" element={<DashboardPage title="Nurse Dashboard" />} />
          <Route path="/nurse/patients" element={<PlaceholderPage title="Patients" />} />
          <Route path="/nurse/appointments" element={<PlaceholderPage title="Appointments" />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
