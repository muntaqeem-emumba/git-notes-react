// import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LoginButton from "./LoginButton";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchComponents";
import { useAuthData } from "../stores/AuthStore";
import useSearchStore from "../stores/SearchStore";
function HeaderBar() {
  const { isLoggedIn } = useAuthData();
  const { setSearchTerm } = useSearchStore();
  const [debouncedValue, setDebouncedValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000); // debounce delay in ms

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    console.log('Searching for:', debouncedValue);
    // call API or query here
    setSearchTerm(debouncedValue);
  }, [debouncedValue]);
  const navigate = useNavigate();
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
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
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
