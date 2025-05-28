import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Login from './pages/Login';
import Register from './pages/Register';
import NoteList from './pages/NoteList';
import NoteDetail from './pages/NoteDetail';
import NoteEdit from './pages/NoteEdit';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            サッカーノート
          </Typography>
          <Button color="inherit" component={Link} to="/login">ログイン</Button>
          <Button color="inherit" component={Link} to="/register">ユーザー登録</Button>
          <Button color="inherit" component={Link} to="/notes">ノート一覧</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<NoteList />} />
          <Route path="/notes/:noteId" element={<NoteDetail />} />
          <Route path="/notes/:noteId/edit" element={<NoteEdit />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
