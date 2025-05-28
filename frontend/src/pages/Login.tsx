import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          ログイン
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="normal"
            required
            fullWidth
            label="メールアドレス"
            type="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="パスワード"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            ログイン
          </Button>
          <Box mt={2} textAlign="center">
            <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
              <Button variant="text">
                パスワードを忘れた
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 