import React from 'react';
import { Box } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import { MAX_STAR_RATING } from '../constants';

interface StarRatingProps {
  score: number | null;
  onChange: (score: number | null) => void;
  disabled?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ score, onChange, disabled = false }) => {
  return (
    <Box>
      {Array.from({ length: MAX_STAR_RATING + 1 }, (_, i) => i).map(i => (
        <StarIcon
          key={i}
          onClick={() => !disabled && onChange(i === score ? null : i)}
          sx={{
            color: i <= (score ?? -1) ? '#FFD600' : '#CCC',
            cursor: disabled ? 'default' : 'pointer',
            fontSize: 24,
            '&:hover': disabled ? {} : { color: '#FFB300' }
          }}
        />
      ))}
    </Box>
  );
};

export default StarRating; 