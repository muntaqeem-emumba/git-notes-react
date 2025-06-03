import { Button, Box, Typography } from '@mui/material';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

interface ForkButtonProps {
  count: number;
  name: string;
}

const ForkButton: React.FC<ForkButtonProps> = ({ name, count }) => {
  return (
    <Box display="flex" border="1px solid #1f2d30" borderRadius={1} overflow="hidden">
      <Button
        variant="contained"
        sx={{
          borderRadius: 0,
          backgroundColor: '#1f2d30',
          color: '#fff',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#2c3e44',
          },
          gap: 1,
          px: 2
        }}
        startIcon={name === 'fork' ? <ForkRightIcon /> : <StarOutlineIcon />}
      >
        {name === 'fork' ? 'Fork' : 'Star'}
      </Button>
      <Box
        px={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#fff"
        color="#1f2d30"
        fontWeight="bold"
      >
        <Typography>{count}</Typography>
      </Box>
    </Box>
  );
};

export default ForkButton;