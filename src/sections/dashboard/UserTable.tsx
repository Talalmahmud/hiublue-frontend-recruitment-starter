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
  TablePagination,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";

type Props = {
  rows: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  page: any;
  setPage: any;
  total: number | 0;
  search: any;
  setSearch: any;
  searchType: any;
  setSearchType: any;
  status: any;
  setStatus: any;
};

const OfferList = ({
  rows,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  total,
  search,
  setSearch,
  searchType,
  setSearchType,
  status,
  setStatus,
}: Props) => {
  const [tabValue, setTabValue] = useState("all"); // State for tab value

  // Handle pagination change

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setStatus(newValue === "all" ? "" : newValue);
    setPage(1);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(page);
  };
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
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
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyItems={"center"}
        gap={4}
      >
        <TextField
          label="Search..."
          variant="outlined"
          sx={{ width: "505px", marginBottom: "20px" }}
          value={search}
          onChange={handleSearchChange}
        />
        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="age-label">Age</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            size="medium"
            labelId="age-label"
            label="Age"
            sx={{ height: "56px" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ paddingY: "10px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="body1" fontWeight={600}>
                    {row.user_name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.company}</TableCell>
                <TableCell>{row.jobTitle}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        row.status === "accepted"
                          ? "#118D57"
                          : row.status === "rejected"
                          ? "#842029"
                          : "#B76E00",
                      backgroundColor:
                        row.status === "accepted"
                          ? "#D1E7DD" // Light green
                          : row.status === "rejected"
                          ? "#F8D7DA" // Light red
                          : "#FFF3CD", // Light orange
                      padding: "4px 12px",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      display: "inline-block",
                      textAlign: "center",
                      minWidth: "80px",
                      textTransform: "capitalize",
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Stack direction="row" gap={2}>
                    {" "}
                    {/* Use "row" as a string */}
                    <Image src={"/pen.svg"} height={20} width={20} alt="Edit" />
                    <Image
                      src={"/dot.svg"}
                      height={20}
                      width={20}
                      alt="Options"
                    />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default OfferList;
