import { styled } from '@mui/material/styles';
import Button, { type ButtonProps } from '@mui/material/Button';
import { useAuthActions } from '../stores/AuthStore';
// import { purple } from '@mui/material/colors';

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: "#003B44",
  backgroundColor: "#fff"
}));

export default function CustomizedButtons() {
  const { login } = useAuthActions();

  function handleLogin() {
    console.log('Logging in...');
    login('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');
  }

  return (
    <ColorButton variant="contained" onClick={handleLogin}>Login</ColorButton>
  );
}