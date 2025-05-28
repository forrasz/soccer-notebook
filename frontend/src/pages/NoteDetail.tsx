import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import SoccerFieldCanvas from '../components/SoccerFieldCanvas'; // 閲覧用Canvasも使うか検討

// ダミーデータ（APIからの取得を想定）
const dummyNote = {
  id: 1,
  date: '2024-06-01',
  place: 'Aグラウンド',
  goals: [
    { text: '1点取る', score: 3 },
    { text: '守備を頑張る', score: 2 },
    { text: 'パス精度を上げる', score: null },
  ],
  records: [
    { opponent: '相手チームA', score1: '5', score2: '6' },
    { opponent: '相手チームB', score1: '2', score2: '0' },
  ],
  review: {
    did: ['積極的にシュートできた', '声出しを意識した'],
    learned: ['ポジショニングの重要性'],
    next: ['トラップ練習', '判断力を早くする'],
  },
  memorablePlay: {
    description: '後半の決勝ゴール',
    // 描画データもここに持つ想定
    drawData: [
      { type: 'circle', data: [{ x: 300, y: 200 }], color: 'blue' },
      { type: 'path', data: [{ x: 100, y: 100 }, { x: 200, y: 150 }, { x: 300, y: 100 }], color: 'yellow' },
    ]
  },
};

const NoteDetail: React.FC = () => {
  const { noteId } = useParams();
  // 本来はnoteIdでAPI取得
  const note = dummyNote; // ダミーデータを表示

  // 星評価表示
  const renderStars = (score: number|null) => (
    <span>
      {[0,1,2,3].map(i => (
        <StarIcon
          key={i}
          style={{ color: i <= (score ?? -1) ? '#FFD600' : '#CCC', fontSize: 24, verticalAlign: 'middle' }}
        />
      ))}
    </span>
  );

  return (
    <Container maxWidth="sm" sx={{ pb: 8 }}>
      {/* タイトル部 */}
      <Box display="flex" alignItems="center" mb={2} mt={2}>
        <Link to="/notes" style={{ color: '#1976d2', display: 'flex', alignItems: 'center', textDecoration: 'none', marginRight: 1 }}>
          <ArrowBackIcon />
          <span style={{ marginLeft: 4 }}>戻る</span>
        </Link>
        <Typography variant="h6" sx={{ ml: 2 }}>ノート詳細</Typography>
      </Box>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: "#fafbfc", borderRadius: 2, boxShadow: 1 }}>
        {/* 日付・場所 */}
        <Box display="flex" gap={2} mb={2}>
          <Typography><Box component="span" fontWeight="bold">日付:</Box> {note.date}</Typography>
          <Typography><Box component="span" fontWeight="bold">場所:</Box> {note.place}</Typography>
        </Box>
        {/* 今日のテーマ */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">今日のテーマ</Typography>
          {note.goals.map((g, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <Typography sx={{ flex: 1 }}>{g.text}</Typography>
              <span>評価:</span>
              {renderStars(g.score)}
            </Box>
          ))}
        </Box>
        {/* 試合結果 */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">試合結果</Typography>
          {note.records.map((r, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <Typography>vs {r.opponent} [{r.score1}-{r.score2}]</Typography>
            </Box>
          ))}
        </Box>
        {/* ふりかえり */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">ふりかえり</Typography>
          <Box mb={1}>
            <Typography fontWeight="bold" fontSize={14}>やったこと</Typography>
            {note.review.did.map((v, i) => (
              <Typography key={i} mb={0.5}>・{v}</Typography>
            ))}
          </Box>
          <Box mb={1}>
            <Typography fontWeight="bold" fontSize={14}>わかったこと</Typography>
            {note.review.learned.map((v, i) => (
              <Typography key={i} mb={0.5}>・{v}</Typography>
            ))}
          </Box>
          <Box>
            <Typography fontWeight="bold" fontSize={14}>次にやること</Typography>
            {note.review.next.map((v, i) => (
              <Typography key={i} mb={0.5}>・{v}</Typography>
            ))}
          </Box>
        </Box>
        {/* 記憶に残ったプレー */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">記憶に残ったプレー</Typography>
          {/* 閲覧用のSoccerFieldCanvasを表示 */}
          {/* <SoccerFieldCanvas drawData={note.memorablePlay.drawData} readOnly /> */}
          <Typography>描画エリア（閲覧用）</Typography>
        </Box>
      </Paper>

      {/* フッター部（編集ボタンなど） */}
      <Box position="fixed" left={0} bottom={0} width="100%" bgcolor="#fff" py={2} borderTop="1px solid #eee" display="flex" justifyContent="center" gap={2} zIndex={100}>
        <Button component={Link} to={`/notes/${noteId}/edit`} variant="contained">編集</Button>
        {/* 削除ボタンは一覧に戻ってから操作するなどが一般的 */}
        {/* <Button variant="text" color="error">削除</Button> */}
      </Box>
    </Container>
  );
};

export default NoteDetail; 