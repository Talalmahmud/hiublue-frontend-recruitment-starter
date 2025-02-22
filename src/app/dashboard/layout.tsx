"use client";

import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/sections/dashboard/NavBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack direction="row" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}

      <Navbar />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Take up remaining space
          overflowY: "auto", // Enable scrolling in the main content
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default DashboardLayout;
