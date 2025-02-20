"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";

// Sample data for the table
const rows = [
  {
    name: "Jayvion Simon",
    email: "namie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueliwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Accepted",
  },
  {
    name: "Jayvion Simon",
    email: "namie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueliwitz and Sons",
    jobTitle: "CEO",
    type: "Yearly",
    status: "Rejected",
  },
  {
    name: "Jayvion Simon",
    email: "namie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueliwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Pending",
  },
  {
    name: "Jayvion Simon",
    email: "namie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueliwitz and Sons",
    jobTitle: "CEO",
    type: "Pay As You Go",
    status: "Accepted",
  },
  {
    name: "Jayvion Simon",
    email: "namie.abernathy70@yahoo.com",
    phone: "365-374-4961",
    company: "Lueliwitz and Sons",
    jobTitle: "CEO",
    type: "Monthly",
    status: "Accepted",
  },
];

const OfferList = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState("all"); // State for tab value

  // Handle pagination change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPage(1); // Reset to the first page when switching tabs
  };

  // Filter rows based on search term and tab value
  const filteredRows = rows
    .filter((row) => row.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((row) => tabValue === "all" || row.status === "Accepted");

  // Paginate rows
  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Offer List
      </Typography>

      {/* Tabs for All and Accepted */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="All" value="all" />
        <Tab label="Accepted" value="accepted" />
      </Tabs>

      {/* Search Input */}
      <TextField
        label="Search..."
        variant="outlined"
        fullWidth
        sx={{ marginBottom: "20px" }}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        row.status === "Accepted"
                          ? "green"
                          : row.status === "Rejected"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Typography variant="body2">Rows per page: {rowsPerPage}</Typography>
        <Pagination
          count={Math.ceil(filteredRows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
        <Typography variant="body2">
          {`${(page - 1) * rowsPerPage + 1}-${Math.min(
            page * rowsPerPage,
            filteredRows.length
          )} of ${filteredRows.length}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default OfferList;
