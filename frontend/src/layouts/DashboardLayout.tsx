import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItemButton,
  ListItemIcon, ListItemText, IconButton, Avatar, Divider,
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard, People, LocalHospital, Event,
  Receipt, Medication, Science, Inventory, Assessment, Settings, Logout,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { logout } from '../store/slices/authSlice';

const DRAWER_WIDTH = 260;

const roleMenus: Record<string, { label: string; path: string; icon: React.ReactNode }[]> = {
  ADMIN: [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <Dashboard /> },
    { label: 'Users', path: '/admin/users', icon: <People /> },
    { label: 'Doctors', path: '/admin/doctors', icon: <LocalHospital /> },
    { label: 'Patients', path: '/admin/patients', icon: <People /> },
    { label: 'Reports', path: '/admin/reports', icon: <Assessment /> },
    { label: 'Inventory', path: '/admin/inventory', icon: <Inventory /> },
    { label: 'Settings', path: '/admin/settings', icon: <Settings /> },
  ],
  DOCTOR: [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: <Dashboard /> },
    { label: 'Appointments', path: '/doctor/appointments', icon: <Event /> },
    { label: 'Patients', path: '/doctor/patients', icon: <People /> },
    { label: 'Medical Records', path: '/doctor/medical-records', icon: <LocalHospital /> },
    { label: 'Prescriptions', path: '/doctor/prescriptions', icon: <Medication /> },
    { label: 'Lab Results', path: '/doctor/lab-results', icon: <Science /> },
  ],
  RECEPTIONIST: [
    { label: 'Dashboard', path: '/receptionist/dashboard', icon: <Dashboard /> },
    { label: 'Patients', path: '/receptionist/patients', icon: <People /> },
    { label: 'Appointments', path: '/receptionist/appointments', icon: <Event /> },
    { label: 'Billing', path: '/receptionist/billing', icon: <Receipt /> },
  ],
  PHARMACIST: [
    { label: 'Dashboard', path: '/pharmacist/dashboard', icon: <Dashboard /> },
    { label: 'Medicines', path: '/pharmacist/medicines', icon: <Medication /> },
    { label: 'Prescriptions', path: '/pharmacist/prescriptions', icon: <Receipt /> },
    { label: 'Inventory', path: '/pharmacist/inventory', icon: <Inventory /> },
  ],
  LAB_TECHNICIAN: [
    { label: 'Dashboard', path: '/lab/dashboard', icon: <Dashboard /> },
    { label: 'Lab Requests', path: '/lab/requests', icon: <Science /> },
    { label: 'Lab Results', path: '/lab/results', icon: <Assessment /> },
  ],
  NURSE: [
    { label: 'Dashboard', path: '/nurse/dashboard', icon: <Dashboard /> },
    { label: 'Patients', path: '/nurse/patients', icon: <People /> },
    { label: 'Appointments', path: '/nurse/appointments', icon: <Event /> },
  ],
};

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const menuItems = user ? roleMenus[user.role] || [] : [];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const drawer = (
    <Box>
      <Toolbar>
        <LocalHospital sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight={700} color="primary">
          MediCore
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Hospital Management System
          </Typography>
          <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <Typography variant="body2" sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
            {user?.firstName} {user?.lastName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
