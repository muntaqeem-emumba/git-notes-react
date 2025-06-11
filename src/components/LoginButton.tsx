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
    login(import.meta.env.GITHUB_ACCESS_TOKEN as string);
  }

  return (
    <ColorButton variant="contained" onClick={handleLogin}>Login</ColorButton>
  );
}