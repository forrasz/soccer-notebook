import React from 'react';
import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { Record } from '../types';
import { updateListItem, removeListItem, addListItem, sanitizeScore } from '../utils';

interface RecordSectionProps {
  records: Record[];
  onChange: (newRecords: Record[]) => void;
}

const RecordSection: React.FC<RecordSectionProps> = ({ records, onChange }) => {
  const handleRecordChange = (index: number, field: keyof Record, value: string) => {
    const sanitizedValue = field === 'score1' || field === 'score2' 
      ? sanitizeScore(value) 
      : value;
    
    onChange(updateListItem(records, index, {
      ...records[index],
      [field]: sanitizedValue
    }));
  };

  const handleAddRecord = () => {
    onChange(addListItem(records, { opponent: '', score1: '', score2: '' }));
  };

  const handleRemoveRecord = (index: number) => {
    onChange(removeListItem(records, index));
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" mb={2}>
        試合結果
      </Typography>
      {records.map((record, index) => (
        <Box key={index} mb={1}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="body2">vs</Typography>
            <TextField
              value={record.opponent}
              onChange={(e) => handleRecordChange(index, 'opponent', e.target.value)}
              placeholder="相手チーム"
              sx={{ width: 120 }}
              size="small"
            />
            <TextField
              value={record.score1}
              onChange={(e) => handleRecordChange(index, 'score1', e.target.value)}
              placeholder="得点(自)"
              sx={{ width: 50 }}
              size="small"
            />
            <Typography variant="h6">-</Typography>
            <TextField
              value={record.score2}
              onChange={(e) => handleRecordChange(index, 'score2', e.target.value)}
              placeholder="得点(相手)"
              sx={{ width: 50 }}
              size="small"
            />
            {records.length > 1 && (
              <Button
                size="small"
                color="error"
                onClick={() => handleRemoveRecord(index)}
              >
                削除
              </Button>
            )}
          </Box>
        </Box>
      ))}
      <Button size="small" onClick={handleAddRecord}>
        試合追加
      </Button>
    </Paper>
  );
};

export default RecordSection; 