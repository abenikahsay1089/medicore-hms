import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { People, LocalHospital, Event, AttachMoney } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h4" fontWeight={700}>{value}</Typography>
          </Box>
          <Box sx={{ bgcolor: color, borderRadius: 2, p: 1.5, color: 'white' }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

interface DashboardPageProps {
  title: string;
  stats?: StatCardProps[];
}

export default function DashboardPage({ title, stats }: DashboardPageProps) {
  const defaultStats: StatCardProps[] = stats || [
    { title: 'Total Patients', value: '—', icon: <People />, color: '#1565C0' },
    { title: 'Total Doctors', value: '—', icon: <LocalHospital />, color: '#00897B' },
    { title: 'Appointments Today', value: '—', icon: <Event />, color: '#F57C00' },
    { title: 'Revenue', value: '—', icon: <AttachMoney />, color: '#7B1FA2' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Welcome to MediCore Hospital Management System
      </Typography>
      <Grid container spacing={3}>
        {defaultStats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
