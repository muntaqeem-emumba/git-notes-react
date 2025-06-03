// import { useState } from 'react';
import {
  alpha,
  AppBar,
  Box,
  InputBase,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";
function HeaderBar() {
  const { isLoggedIn } = useAuth();
  const { setSearchTerm, searchTerm } = useSearch();
  const navigate = useNavigate();
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 50,
    width: 300,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "20ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
  }));
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="header-bar">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')}>
              <img src="header-logo.png" alt="" />
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Gists"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </Search>
            {isLoggedIn && <UserProfile />}
            {!isLoggedIn && <LoginButton />}
            
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default HeaderBar;
