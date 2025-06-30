import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import SoccerFieldCanvas from '../components/SoccerFieldCanvas';
import ThemeSection from '../components/ThemeSection';
import RecordSection from '../components/RecordSection';
import TextFieldList from '../components/TextFieldList';
import { useNoteForm } from '../hooks/useNoteForm';

const NoteEdit: React.FC = () => {
  const { noteId } = useParams();
  const isEditing = Boolean(noteId);

  const {
    date,
    setDate,
    location,
    setLocation,
    themeList,
    setThemeList,
    records,
    setRecords,
    didList,
    setDidList,
    learnedList,
    setLearnedList,
    nextList,
    setNextList,
    getFormData,
  } = useNoteForm();

  const handleSave = () => {
    const formData = getFormData();
    console.log('保存するデータ:', formData);
    // TODO: API呼び出しを実装
  };

  return (
    <Container maxWidth="sm" sx={{ pb: 8 }}>
      {/* ヘッダー */}
      <Box display="flex" alignItems="center" mb={2} mt={2}>
        <Button
          component={Link}
          to="/notes"
          startIcon={<ArrowBackIcon />}
          sx={{ mr: 2 }}
        >
          戻る
        </Button>
        <Typography variant="h6">
          {isEditing ? 'ノート編集' : 'ノート作成'}
        </Typography>
      </Box>

      {/* 日付・場所 */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="日付"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ flex: 1 }}
        />
        <TextField
          label="場所"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ flex: 2 }}
        />
      </Box>

      {/* 今日のテーマ */}
      <ThemeSection themeList={themeList} onChange={setThemeList} />

      {/* 試合結果 */}
      <RecordSection records={records} onChange={setRecords} />

      {/* サッカーフィールド */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          フィールド図
        </Typography>
        <SoccerFieldCanvas />
      </Paper>

      {/* その他のセクション */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
        <TextFieldList
          label="やったこと"
          list={didList}
          onChange={setDidList}
          placeholder="今日やったことを入力"
        />
        
        <TextFieldList
          label="学んだこと"
          list={learnedList}
          onChange={setLearnedList}
          placeholder="学んだことを入力"
        />
        
        <TextFieldList
          label="次回やること"
          list={nextList}
          onChange={setNextList}
          placeholder="次回やることを入力"
        />
      </Paper>

      {/* 保存ボタン */}
      <Box textAlign="center">
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          sx={{ minWidth: 200 }}
        >
          {isEditing ? '更新' : '保存'}
        </Button>
      </Box>
    </Container>
  );
};

export default NoteEdit; 