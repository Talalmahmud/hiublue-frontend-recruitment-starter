"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import Image from "next/image";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
      <Toolbar>
        {/* Logo or Brand Name */}
        <Image src={"/logo.svg"} height={24} width={24} alt="logo" />

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: "20px" }}>
          <Button color="inherit">OVERVIEW</Button>
          <Button color="inherit">4Dashboard</Button>
          <Button color="inherit">Onboarding</Button>
        </Box>

        {/* Mobile Menu Button (Optional) */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
