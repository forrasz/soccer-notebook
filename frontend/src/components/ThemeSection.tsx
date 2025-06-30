import React from 'react';
import { Paper, Typography, Box, TextField } from '@mui/material';
import { Theme } from '../types';
import { updateListItem } from '../utils';
import StarRating from './StarRating';

interface ThemeSectionProps {
  themeList: Theme[];
  onChange: (newThemeList: Theme[]) => void;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({ themeList, onChange }) => {
  const handleThemeTextChange = (index: number, text: string) => {
    onChange(updateListItem(themeList, index, { ...themeList[index], text }));
  };

  const handleThemeScoreChange = (index: number, score: number | null) => {
    onChange(updateListItem(themeList, index, { ...themeList[index], score }));
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        今日のテーマ
      </Typography>
      {themeList.map((theme, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
          <TextField
            value={theme.text}
            onChange={(e) => handleThemeTextChange(index, e.target.value)}
            placeholder={`テーマ${index + 1}`}
            sx={{ flex: 1 }}
            size="small"
          />
          <Typography variant="body2">評価:</Typography>
          <StarRating
            score={theme.score}
            onChange={(score) => handleThemeScoreChange(index, score)}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default ThemeSection; 