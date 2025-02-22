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

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  return (
    <Stack direction="row" sx={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: isMobile ? 80 : 280, // Collapse sidebar on small screens
          bgcolor: "background.paper",
          height: "100vh",
          borderRight: "1px solid #919EAB1F",
          transition: "width 0.3s ease", // Smooth transition
          overflowY: "hidden", // Disable scrolling in the sidebar
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton component="a">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={48}
                  height={48}
                  style={{ marginRight: isMobile ? "0" : "16px" }}
                  className=" w-8 h-8"
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component="a">
                <ListItemText
                  sx={{
                    color: "#919EAB",
                    fontWeight: "600",
                    display: isMobile ? "none" : "block", // Hide text on small screens
                  }}
                  primary="Overview"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <Link href="/dashboard" passHref legacyBehavior>
                <ListItemButton component="a">
                  <Image
                    src="/cart.svg"
                    alt="cart"
                    width={24}
                    height={24}
                    style={{ marginRight: isMobile ? "0" : "16px" }}
                    className=" w-6 h-6"
                  />
                  {!isMobile && <ListItemText primary="Dashboard" />}
                </ListItemButton>
              </Link>
            </ListItem>

            <ListItem disablePadding>
              <Link href="/dashboard/onboarding" passHref legacyBehavior>
                <ListItemButton component="a">
                  <Image
                    src="/range.svg"
                    alt="range"
                    width={24}
                    height={24}
                    style={{ marginRight: isMobile ? "0" : "16px" }}
                    className=" w-6 h-6"
                  />
                  {!isMobile && <ListItemText primary="Onboarding" />}
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // Take up remaining space
          overflowY: "auto", // Enable scrolling in the main content
          height: "100vh",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default DashboardLayout;
