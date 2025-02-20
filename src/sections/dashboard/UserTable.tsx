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
} from "@mui/material";
import Image from "next/image";

// Sample data for the table
// const rows = [
//   {
//     name: "Jayvion Simon",
//     email: "namie.abernathy70@yahoo.com",
//     phone: "365-374-4961",
//     company: "Lueliwitz and Sons",
//     jobTitle: "CEO",
//     type: "Monthly",
//     status: "Accepted",
//   },
//   {
//     name: "Jayvion Simon",
//     email: "namie.abernathy70@yahoo.com",
//     phone: "365-374-4961",
//     company: "Lueliwitz and Sons",
//     jobTitle: "CEO",
//     type: "Yearly",
//     status: "Rejected",
//   },
//   {
//     name: "Jayvion Simon",
//     email: "namie.abernathy70@yahoo.com",
//     phone: "365-374-4961",
//     company: "Lueliwitz and Sons",
//     jobTitle: "CEO",
//     type: "Monthly",
//     status: "Pending",
//   },
//   {
//     name: "Jayvion Simon",
//     email: "namie.abernathy70@yahoo.com",
//     phone: "365-374-4961",
//     company: "Lueliwitz and Sons",
//     jobTitle: "CEO",
//     type: "Pay As You Go",
//     status: "Accepted",
//   },
//   {
//     name: "Jayvion Simon",
//     email: "namie.abernathy70@yahoo.com",
//     phone: "365-374-4961",
//     company: "Lueliwitz and Sons",
//     jobTitle: "CEO",
//     type: "Monthly",
//     status: "Accepted",
//   },
// ];
type Props = {
  rows: any;
  rowsPerPage: any;
  setRowsPerPage: any;
  page: any;
  setPage: any;
  total: number | 0;
};

const OfferList = ({
  rows,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  total,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tabValue, setTabValue] = useState("all"); // State for tab value

  // Handle pagination change

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
    ?.filter((row: any) =>
      row?.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((row: any) => tabValue === "all" || row.status === "Accepted");

  // Paginate rows
  //   const rows = filteredRows?.slice(
  //     (page) * rowsPerPage,
  //     page * rowsPerPage
  //   );

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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{row.user_name}</TableCell>
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
