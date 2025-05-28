import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Login = () => <div>ログイン画面</div>;
const Register = () => <div>ユーザー登録画面</div>;
const NoteList = () => <div>ノート一覧画面</div>;
const NoteDetail = () => <div>ノート詳細画面</div>;
const NoteEdit = () => <div>ノート編集画面</div>;

function App() {
  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/login" style={{ marginRight: 10 }}>ログイン</Link>
        <Link to="/register" style={{ marginRight: 10 }}>ユーザー登録</Link>
        <Link to="/notes" style={{ marginRight: 10 }}>ノート一覧</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes" element={<NoteList />} />
        <Route path="/notes/:noteId" element={<NoteDetail />} />
        <Route path="/notes/:noteId/edit" element={<NoteEdit />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
