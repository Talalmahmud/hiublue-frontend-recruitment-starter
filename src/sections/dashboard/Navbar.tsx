"use client";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minWidth: isMobile ? 80 : 280, // Collapse sidebar on small screens
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
                style={{
                  marginRight: isMobile ? "0" : "16px",
                  width: 48,
                  height: 48,
                }}
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
                  style={{
                    marginRight: isMobile ? "0" : "16px",
                    width: 24,
                    height: 24,
                  }}
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
                  style={{
                    marginRight: isMobile ? "0" : "16px",
                    width: 24,
                    height: 24,
                  }}
                />
                {!isMobile && <ListItemText primary="Onboarding" />}
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
};

export default Navbar;
