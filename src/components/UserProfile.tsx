import { Box, Divider, Menu, MenuItem, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { logout, userData } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <>
      <Avatar
        component="button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        src={userData?.avatar_url}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              width: "auto",
              padding: 1,
              color: "#003B44"
            }
          }
        }}
      >
        <Box px={2} py={1}>
          <Typography variant="body2">Signed in as</Typography>
          <Typography fontWeight="bold" sx={{ color: "#003B44" }}>{userData?.login}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => handleNavigate('/profile')}>Your github profile</MenuItem>
        <MenuItem onClick={() => handleNavigate('/create-gist')}>Create gist</MenuItem>
        <MenuItem onClick={() => handleNavigate('/')}>Public gists</MenuItem>


        <Divider sx={{ my: 1 }} />

        <MenuItem onClick={() => handleNavigate('/help')}>Help</MenuItem>
        <MenuItem onClick={() => {handleLogout(); handleClose()}}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
