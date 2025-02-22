"use client";

import React from "react";
import { Box, Stack } from "@mui/material";
import Navbar from "@/sections/dashboard/Navbar";

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
