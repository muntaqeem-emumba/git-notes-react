import { styled } from '@mui/material/styles';
import Button, { type ButtonProps } from '@mui/material/Button';
import { useAuth } from '../contexts/AuthContext';
// import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#003B44",
  backgroundColor: "#fff"
}));

export default function CustomizedButtons() {
  const { login } = useAuth();

  function handleLogin() {
    login('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');
  }

  return (
    <ColorButton variant="contained" onClick={handleLogin}>Login</ColorButton>
  );
}