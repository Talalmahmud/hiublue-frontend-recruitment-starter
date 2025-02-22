"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for dropdown menu

  // Open dropdown menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
    handleMenuClose();
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffff",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        {/* Logo or App Name */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>

        {/* User Profile and Dropdown Menu */}
        <Box>
          <IconButton onClick={handleMenuOpen} sx={{ padding: 0 }}>
            <Avatar
              alt="User Profile"
              src="/path/to/user-profile-image.jpg" // Replace with the actual image path
              sx={{ width: 40, height: 40 }}
            />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
