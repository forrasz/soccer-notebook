import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { updateListItem, removeListItem, addListItem } from '../utils';

interface TextFieldListProps {
  label: string;
  list: string[];
  onChange: (newList: string[]) => void;
  placeholder?: string;
  maxItems?: number;
}

const TextFieldList: React.FC<TextFieldListProps> = ({ 
  label, 
  list, 
  onChange, 
  placeholder = '',
  maxItems
}) => {
  return (
    <Box mb={1}>
      <Typography fontWeight="bold" fontSize={14}>{label}</Typography>
      {list.map((value, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1} mb={1}>
          <TextField
            value={value}
            onChange={(e) => onChange(updateListItem(list, index, e.target.value))}
            placeholder={placeholder}
            sx={{ flex: 1, bgcolor: '#fff' }}
            size="small"
          />
          <Button
            size="small"
            color="error"
            onClick={() => onChange(removeListItem(list, index))}
            disabled={list.length <= 1}
          >
            削除
          </Button>
        </Box>
      ))}
      <Button
        size="small"
        onClick={() => onChange(addListItem(list, ''))}
        disabled={maxItems ? list.length >= maxItems : false}
      >
        追加
      </Button>
    </Box>
  );
};

export default TextFieldList; 