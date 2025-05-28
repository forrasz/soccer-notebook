import React from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';

const Register: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          ユーザー登録
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="normal"
            required
            fullWidth
            label="ユーザー名"
            autoComplete="username"
          />
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
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            登録
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 