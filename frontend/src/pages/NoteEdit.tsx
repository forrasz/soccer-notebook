import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SoccerFieldCanvas from '../components/SoccerFieldCanvas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const dummyNote = {
  goal: '1点取る',
  result: '2-1 勝利',
  review: '積極的にシュートできた',
  memorablePlay: '後半の決勝ゴール',
};

const NoteEdit: React.FC = () => {
  const { noteId } = useParams();
  const [themeList, setThemeList] = useState<{text: string, score: number|null}[]>([
    {text: '', score: null},
    {text: '', score: null},
    {text: '', score: null},
  ]);
  const [records, setRecords] = useState<{opponent: string, score1: string, score2: string}[]>([{opponent: '', score1: '', score2: ''}]);
  const [didList, setDidList] = useState<string[]>(['']);
  const [learnedList, setLearnedList] = useState<string[]>(['']);
  const [nextList, setNextList] = useState<string[]>(['']);

  // 星評価UI
  const renderStars = (score: number|null, onChange: (v: number|null) => void) => (
    <span>
      {[0,1,2,3].map(i => (
        <StarIcon
          key={i}
          onClick={() => onChange(i === score ? null : i)}
          style={{ color: i <= (score ?? -1) ? '#FFD600' : '#CCC', cursor: 'pointer', fontSize: 24, verticalAlign: 'middle' }}
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
        <Typography variant="h6" sx={{ ml: 2 }}>{noteId ? 'ノート編集' : 'ノート作成'}</Typography>
      </Box>
      {/* 日付・場所 */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="日付"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <TextField
          label="場所"
          sx={{ flex: 2 }}
        />
      </Box>
      {/* 今日のテーマ */}
      <Box mb={2} p={2} bgcolor="#fafbfc" borderRadius={2} boxShadow={1}>
        <Typography variant="subtitle1" fontWeight="bold">今日のテーマ</Typography>
        {themeList.map((t, i) => (
          <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
            <TextField
              value={t.text}
              onChange={e => setThemeList(themeList.map((tt, idx) => idx === i ? { ...tt, text: e.target.value } : tt))}
              placeholder={`テーマ${i+1}`}
              sx={{ flex: 1, bgcolor: '#fff' }}
            />
            <span>評価:</span>
            {renderStars(t.score, v => setThemeList(themeList.map((tt, idx) => idx === i ? { ...tt, score: v } : tt)))}
          </Box>
        ))}
      </Box>
      {/* 試合結果 */}
      <Box mb={2} p={2} bgcolor="#fafbfc" borderRadius={2} boxShadow={1}>
        <Typography variant="subtitle1" fontWeight="bold">試合結果</Typography>
        {records.map((r, i) => (
          <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
            <span>vs</span>
            <TextField
              value={r.opponent}
              onChange={e => setRecords(records.map((rec, idx) => idx === i ? { ...rec, opponent: e.target.value } : rec))}
              placeholder="相手チーム"
              sx={{ width: 120, bgcolor: '#fff' }}
            />
            <TextField
              value={r.score1}
              onChange={e => setRecords(records.map((rec, idx) => idx === i ? { ...rec, score1: e.target.value.replace(/[^0-9]/g, '') } : rec))}
              placeholder="得点(自)"
              sx={{ width: 50, bgcolor: '#fff' }}
            />
            <span style={{ fontWeight: 'bold', fontSize: 18 }}>-</span>
            <TextField
              value={r.score2}
              onChange={e => setRecords(records.map((rec, idx) => idx === i ? { ...rec, score2: e.target.value.replace(/[^0-9]/g, '') } : rec))}
              placeholder="得点(相手)"
              sx={{ width: 50, bgcolor: '#fff' }}
            />
            <span
              style={{ color: '#1976d2', cursor: 'pointer', marginLeft: 8 }}
              onClick={() => setRecords(records.filter((_, idx) => idx !== i))}
            >削除</span>
          </Box>
        ))}
        <span
          style={{ color: '#1976d2', cursor: 'pointer' }}
          onClick={() => setRecords([...records, {opponent: '', score1: '', score2: ''}])}
        >追加</span>
      </Box>
      {/* ふりかえり */}
      <Box mb={2} p={2} bgcolor="#fafbfc" borderRadius={2} boxShadow={1}>
        <Typography variant="subtitle1" fontWeight="bold">ふりかえり</Typography>
        <Box mb={1}>
          <Typography fontWeight="bold" fontSize={14}>やったこと</Typography>
          {didList.map((v, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <TextField
                value={v}
                onChange={e => setDidList(didList.map((d, idx) => idx === i ? e.target.value : d))}
                sx={{ flex: 1, bgcolor: '#fff' }}
              />
              <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setDidList(didList.filter((_, idx) => idx !== i))}>削除</span>
            </Box>
          ))}
          <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setDidList([...didList, ''])}>追加</span>
        </Box>
        <Box mb={1}>
          <Typography fontWeight="bold" fontSize={14}>わかったこと</Typography>
          {learnedList.map((v, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <TextField
                value={v}
                onChange={e => setLearnedList(learnedList.map((d, idx) => idx === i ? e.target.value : d))}
                sx={{ flex: 1, bgcolor: '#fff' }}
              />
              <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setLearnedList(learnedList.filter((_, idx) => idx !== i))}>削除</span>
            </Box>
          ))}
          <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setLearnedList([...learnedList, ''])}>追加</span>
        </Box>
        <Box mb={1}>
          <Typography fontWeight="bold" fontSize={14}>次にやること</Typography>
          {nextList.map((v, i) => (
            <Box key={i} display="flex" alignItems="center" gap={1} mb={1}>
              <TextField
                value={v}
                onChange={e => setNextList(nextList.map((d, idx) => idx === i ? e.target.value : d))}
                sx={{ flex: 1, bgcolor: '#fff' }}
              />
              <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setNextList(nextList.filter((_, idx) => idx !== i))}>削除</span>
            </Box>
          ))}
          <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => setNextList([...nextList, ''])}>追加</span>
        </Box>
      </Box>
      {/* 記憶に残ったプレー */}
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold">記憶に残ったプレー</Typography>
        <SoccerFieldCanvas />
      </Box>
      {/* フッター部 */}
      <Box position="fixed" left={0} bottom={0} width="100%" bgcolor="#fff" py={2} borderTop="1px solid #eee" display="flex" justifyContent="center" gap={2} zIndex={100}>
        <Button variant="contained" color="primary">{noteId ? '更新' : '保存'}</Button>
        <Button variant="outlined" color="secondary">クリア</Button>
        <Button variant="text" color="error">削除</Button>
      </Box>
    </Container>
  );
};

export default NoteEdit; 