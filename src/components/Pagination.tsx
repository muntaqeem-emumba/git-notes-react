import React from 'react';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface CustomPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ page, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
      sx={{
        padding: '4px 8px',
        borderRadius: 4,
        fontSize: 14,
      }}
    >
      <IconButton size="small" onClick={handlePrev} disabled={page === 1}>
        <ChevronLeft fontSize="small" sx={{ color: '#1e3a3a' }} />
      </IconButton>

      <Typography>Page</Typography>

      <InputBase
        value={page}
        onChange={handleInputChange}
        inputProps={{
          style: {
            textAlign: 'center',
            width: 32,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: 4,
          },
        }}
      />

      <Typography>of {totalPages}</Typography>

      <IconButton size="small" onClick={handleNext} disabled={page === totalPages}>
        <ChevronRight fontSize="small" sx={{ color: '#1e3a3a' }} />
      </IconButton>
    </Box>
  );
};

export default CustomPagination;
