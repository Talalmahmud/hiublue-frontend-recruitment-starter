"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { useAuth } from "@/components/context/ContextProvider";
import { useRouter } from "next/navigation";

const CreateOfferForm = () => {
  const auth = useAuth();
  const router = useRouter();

  // State for form fields
  const [planType, setPlanType] = useState("monthly");
  const [additions, setAdditions] = useState(["refundable"]);
  const [userList, setUserList] = useState<any>([]); // Default to empty

  const [user, setUser] = useState(""); // Default to empty
  const [expired, setExpired] = useState("2023-05-03");
  const [price, setPrice] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({
    planType: false,
    additions: false,
    user: false,
    expired: false,
    price: false,
  });

  // Sample list of users

  const getUsers = async () => {
    if (auth.token !== "") {
      try {
        const res = await fetch(
          "https://dummy-1.hiublue.com/api/users?page=1&per_page=200",

          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`, // Pass token in headers
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch summary data");
        }

        const data = await res.json();
        // console.log(data);
        setUserList(data.data);
        return data;
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form fields
    const newErrors = {
      planType: !planType,
      additions: additions.length === 0,
      user: !user.trim(),
      expired: !expired.trim(),
      price: !price.trim() || isNaN(Number(price)),
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (!Object.values(newErrors).some((error) => error)) {
      alert("Offer submitted successfully!");
      // You can add your form submission logic here
    }
  };

  // Handle plan type change
  const handlePlanTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanType(event.target.value);
    setErrors((prev) => ({ ...prev, planType: false }));
  };

  // Handle additions change
  const handleAdditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAdditions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, additions: false }));
  };

  // Handle user change
  const handleUserChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setUser(event.target.value as string);
    setErrors((prev) => ({ ...prev, user: false }));
  };

  useEffect(() => {
    getUsers();
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth, router]);

  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Offer
      </Typography>
      <Typography variant="body1" gutterBottom>
        Send onboarding offer to new user
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Plan Type */}
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Plan Type</FormLabel>
          <RadioGroup row value={planType} onChange={handlePlanTypeChange}>
            <FormControlLabel
              value="pay-as-you-go"
              control={
                <Radio
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="Pay As You Go"
            />
            <FormControlLabel
              value="monthly"
              control={
                <Radio
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="Monthly"
            />
            <FormControlLabel
              value="yearly"
              control={
                <Radio
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="Yearly"
            />
          </RadioGroup>
          {errors.planType && (
            <FormHelperText error>Please select a plan type.</FormHelperText>
          )}
        </FormControl>

        {/* Additions */}
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Additions</FormLabel>
          <RadioGroup row value={additions} onChange={handleAdditionsChange}>
            <FormControlLabel
              value="refundable"
              control={
                <Checkbox
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="Refundable"
            />
            <FormControlLabel
              value="on-demand"
              control={
                <Checkbox
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="On Demand"
            />
            <FormControlLabel
              value="negotiable"
              control={
                <Checkbox
                  sx={{
                    color: "green",
                    "&.Mui-checked": {
                      color: "green", // Checked color
                    },
                  }}
                />
              }
              label="Negotiable"
            />
          </RadioGroup>
          {errors.additions && (
            <FormHelperText error>
              Please select at least one addition.
            </FormHelperText>
          )}
        </FormControl>

        {/* User (Select Component) */}
        <FormControl
          fullWidth
          sx={{ marginBottom: "20px" }}
          error={errors.user}
        >
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={user}
            label="User"
            onChange={(e) => setUser(e.target.value)}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200, // Set the maximum height of the dropdown
                  overflow: "auto", // Enable scrolling
                },
              },
            }}
          >
            {userList?.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
          {errors.user && (
            <FormHelperText>Please select a user.</FormHelperText>
          )}
        </FormControl>

        {/* Expired */}
        <TextField
          label="Expired"
          type="date"
          variant="outlined"
          fullWidth
          value={expired}
          onChange={(e) => {
            setExpired(e.target.value);
            setErrors((prev) => ({ ...prev, expired: false }));
          }}
          sx={{ marginBottom: "20px" }}
          error={errors.expired}
          helperText={errors.expired ? "Expired date is required." : ""}
        />

        {/* Price */}
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors((prev) => ({ ...prev, price: false }));
          }}
          sx={{ marginBottom: "20px" }}
          error={errors.price}
          helperText={
            errors.price ? "Price is required and must be a number." : ""
          }
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="secondary">
          Send Offer
        </Button>
      </form>
    </Box>
  );
};

export default CreateOfferForm;
