import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardContent, TextField, Button, Typography, Alert, Link } from '@mui/material';
import { LocalHospital, ArrowBack } from '@mui/icons-material';
import { authApi } from '../../api/auth';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await authApi.forgotPassword(data.email);
      setSubmitted(true);
    } catch {
      setError('Failed to send reset email. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1565C0 0%, #00897B 100%)',
      }}
    >
      <Card sx={{ maxWidth: 440, width: '100%', mx: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <LocalHospital sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h5" fontWeight={700}>Reset Password</Typography>
          </Box>

          {submitted ? (
            <Alert severity="success">
              If an account exists with that email, a reset link has been sent.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <TextField
                fullWidth label="Email" margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button fullWidth type="submit" variant="contained" size="large" sx={{ mt: 3 }} disabled={isSubmitting}>
                Send Reset Link
              </Button>
            </form>
          )}

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/login" variant="body2">
              <ArrowBack sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
              Back to login
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
