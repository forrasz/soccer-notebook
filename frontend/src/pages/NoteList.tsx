import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Paper, Button, Box, TextField, Pagination, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

// ダミーデータ（APIからの取得を想定）
const allDummyNotes = [
  { id: 1, date: '2024-06-01', goal: '1点取る', place: 'Aグラウンド' },
  { id: 2, date: '2024-06-02', goal: '守備を頑張る', place: 'Bグラウンド' },
  { id: 3, date: '2024-06-03', goal: 'パス精度を上げる', place: 'Cグラウンド' },
  { id: 4, date: '2024-06-04', goal: '切り替えを早く', place: 'Aグラウンド' },
  { id: 5, date: '2024-06-05', goal: 'シュート練習', place: 'Bグラウンド' },
  { id: 6, date: '2024-06-06', goal: 'ポジショニング意識', place: 'Cグラウンド' },
  { id: 7, date: '2024-06-07', goal: 'コーチングの声出し', place: 'Aグラウンド' },
  { id: 8, date: '2024-06-08', goal: 'トラップを正確に', place: 'Bグラウンド' },
  { id: 9, date: '2024-06-09', goal: 'ドリブル突破', place: 'Cグラウンド' },
  { id: 10, date: '2024-06-10', goal: 'ヘディング練習', place: 'Aグラウンド' },
  { id: 11, date: '2024-06-11', goal: '集中力を保つ', place: 'Bグラウンド' },
  { id: 12, date: '2024-06-12', goal: '体力強化', place: 'Cグラウンド' },
  { id: 13, date: '2024-06-13', goal: '判断力を磨く', place: 'Aグラウンド' },
  { id: 14, date: '2024-06-14', goal: '連携プレー', place: 'Bグラウンド' },
  { id: 15, date: '2024-06-15', goal: 'セットプレー対策', place: 'Cグラウンド' },
  { id: 16, date: '2024-06-16', goal: '声出しでチームを鼓舞', place: 'Aグラウンド' },
  { id: 17, date: '2024-06-17', goal: '予測を早く', place: 'Bグラウンド' },
  { id: 18, date: '2024-06-18', goal: '状況判断能力向上', place: 'Cグラウンド' },
  { id: 19, date: '2024-06-19', goal: 'フリーランニング', place: 'Aグラウンド' },
  { id: 20, date: '2024-06-20', goal: 'ワンタッチパス', place: 'Bグラウンド' },
  { id: 21, date: '2024-06-21', goal: 'ポジティブトランジション', place: 'Cグラウンド' },
  { id: 22, date: '2024-06-22', goal: 'ネガティブトランジション', place: 'Aグラウンド' },
  { id: 23, date: '2024-06-23', goal: '攻守の切り替え', place: 'Bグラウンド' },
  { id: 24, date: '2024-06-24', goal: 'ラインコントロール', place: 'Cグラウンド' },
  { id: 25, date: '2024-06-25', goal: '裏への抜け出し', place: 'Aグラウンド' },
  { id: 26, date: '2024-06-26', goal: 'クロス精度', place: 'Bグラウンド' },
  { id: 27, date: '2024-06-27', goal: 'マーカーを外す', place: 'Cグラウンド' },
  { id: 28, date: '2024-06-28', goal: 'オフサイドラインを理解', place: 'Aグラウンド' },
  { id: 29, date: '2024-06-29', goal: 'ビルドアップ参加', place: 'Bグラウンド' },
  { id: 30, date: '2024-06-30', goal: 'ミドルシュート', place: 'Cグラウンド' },
  { id: 31, date: '2024-07-01', goal: 'ボレーシュート', place: 'Aグラウンド' },
  { id: 32, date: '2024-07-02', goal: 'ロングパス精度', place: 'Bグラウンド' },
  { id: 33, date: '2024-07-03', goal: 'スルーパス', place: 'Cグラウンド' },
];

const ITEMS_PER_PAGE_OPTIONS = [10, 30, 50];

const NoteList: React.FC = () => {
  const [filterDate, setFilterDate] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(ITEMS_PER_PAGE_OPTIONS[1]); // デフォルト30件

  const filteredNotes = allDummyNotes.filter(note =>
    filterDate ? note.date === filterDate : true
  );

  const pageCount = Math.ceil(filteredNotes.length / itemsPerPage);
  const displayedNotes = filteredNotes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setPage(1); // 表示件数変更時に1ページ目に戻る
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" gutterBottom>
            サッカーノート一覧
          </Typography>
          <Button component={Link} to="/notes/new" variant="contained">
            新規登録
          </Button>
        </Box>
        {/* 絞り込み・表示件数選択 */}
        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="日付で絞り込む"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            sx={{ flex: 1 }}
          />
          <FormControl sx={{ width: 120 }}>
            <InputLabel size="small">表示件数</InputLabel>
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              label="表示件数"
              size="small"
            >
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <MenuItem key={option} value={option}>{option}件</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <List>
          {displayedNotes.map(note => (
            <ListItem key={note.id} divider>
              <ListItemText
                primary={`${note.date} @ ${note.place}`}
                secondary={`目標: ${note.goal}`}
              />
              <ListItemSecondaryAction>
                <Button
                  component={Link}
                  to={`/notes/${note.id}`}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  詳細
                </Button>
                <IconButton
                  component={Link}
                  to={`/notes/${note.id}/edit`}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {/* ページャー */}
        {pageCount > 1 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default NoteList; 