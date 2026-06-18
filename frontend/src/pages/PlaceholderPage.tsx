import { Typography, Box } from '@mui/material';

interface PlaceholderPageProps {
  title: string;
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary">
        This module will be available in the next development phase.
      </Typography>
    </Box>
  );
}
